import { useCallback, useEffect, useRef, useState } from "react";
import { objectToQuery } from "../utils/urlUtils.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getSuiteSearchApiRoute } from "../endpoints/publicEndpoints.ts";
import {
    EEventType,
    IEvent,
    IRunCompletedEvent,
    IRunInProgressEvent,
} from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { ISearchConfigurationSuite } from "../interfaces/domain/ISearch.tsx";
import {
    EConfigurationSuiteSortField,
    EConfigurationSuiteSortOrder,
} from "../interfaces/domain/IConfigurationSuite.tsx";
import { useStorage } from "../hooks/useStorage.ts";
import { IPipelineDetails } from "../interfaces/domain/IPipelineDetails.tsx";

const STORAGE_KEY_PAGINATION = "paginationSettings";

interface StoredPaginationSettings {
    page: number;
    size: number;
    sortField: EConfigurationSuiteSortField;
    sortOrder: EConfigurationSuiteSortOrder;
}

interface FormValues extends StoredPaginationSettings {
    file: string;
    configurationSuiteId: string;
    configurationTestId: string;
    configurationTestTag: string;
    status: string;
    allNotSuccess: boolean;
}

function formValuesToRecord(formValues: FormValues): Record<string, unknown> {
    return Object.keys(formValues).reduce(
        (acc, key) => {
            acc[key] = formValues[key as keyof FormValues];
            return acc;
        },
        {} as Record<string, unknown>,
    );
}

export const useSwrGetSuitesAndTests = (query: string, options: SWRConfiguration<ISearchConfigurationSuite> = {}) =>
    useSWR<ISearchConfigurationSuite>(["useSwrGetSuitesAndTests", query], {
        ...options,
        fetcher: () => getSuiteSearchApiRoute(query),
        revalidateOnFocus: false,
    });

export const useGetSuitesAndTests = () => {
    const { environment } = useEnvironmentContext();

    const { data: storedPaginationSettings, saveInStorage } =
        useStorage<StoredPaginationSettings>(STORAGE_KEY_PAGINATION);

    const [formValues, setFormValues] = useState<FormValues>(() => ({
        file: "",
        configurationSuiteId: "",
        configurationTestId: "",
        configurationTestTag: "",
        status: "",
        allNotSuccess: false,
        page: storedPaginationSettings?.page ?? 0,
        size: storedPaginationSettings?.size ?? 10,
        sortField: storedPaginationSettings?.sortField ?? EConfigurationSuiteSortField.FILE,
        sortOrder: storedPaginationSettings?.sortOrder ?? EConfigurationSuiteSortOrder.DESC,
    }));

    const prevPaginationRef = useRef<StoredPaginationSettings>({
        page: formValues.page,
        size: formValues.size,
        sortField: formValues.sortField,
        sortOrder: formValues.sortOrder,
    });

    useEffect(() => {
        const currentPagination = {
            page: formValues.page,
            size: formValues.size,
            sortField: formValues.sortField,
            sortOrder: formValues.sortOrder,
        };

        if (JSON.stringify(currentPagination) !== JSON.stringify(prevPaginationRef.current)) {
            saveInStorage(currentPagination);
            prevPaginationRef.current = currentPagination;
        }
    }, [formValues.page, formValues.size, formValues.sortField, formValues.sortOrder, saveInStorage]);

    const setFormValuesAndSave = useCallback((newValues: Partial<FormValues>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            ...newValues,
        }));
    }, []);

    const query = `${objectToQuery(formValuesToRecord(formValues))}`;
    const queryWithEnv =
        query === "" ? `environmentId=${environment?.id}` : `environmentId=${environment?.id}&${query}`;

    const { data, error, mutate, isLoading } = useSwrGetSuitesAndTests(queryWithEnv);

    const handleCompleteRefreshEvent = useCallback(
        async (data: IEvent) => {
            console.log("Run Completed Event - Update Suites and Tests");
            const event = data as IRunCompletedEvent;
            if (event.isAllTests) {
                await mutate();
            } else {
                if (event.configurationSuite) {
                    await mutate((currentData) => {
                        if (!currentData) return;
                        // Create a deep copy of currentData to ensure immutability
                        const updatedData: ISearchConfigurationSuite = JSON.parse(JSON.stringify(currentData));

                        if (event.configurationSuite) {
                            const index = updatedData.content.findIndex(
                                (suite) => suite.id === event.configurationSuite?.id,
                            );
                            if (index !== -1) {
                                updatedData.content[index] = event.configurationSuite;
                            }
                        }

                        return updatedData;
                    }, false);
                }
            }
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.RUN_COMPLETED_EVENT, handleCompleteRefreshEvent);

    const handleSyncEnvironmentCompletedEvent = useCallback(async () => {
        console.log("Sync Environment Completed Event - Update Suites and Tests");
        await mutate();
    }, [mutate]);
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    const handleRunInProgressEvent = useCallback(
        async (data: IEvent) => {
            console.log("Run In Progress Event - Update Suites and Tests");
            const event = data as IRunInProgressEvent;

            await mutate((currentData) => {
                if (!currentData) return;
                // Create a deep copy of currentData to ensure immutability
                const updatedData: ISearchConfigurationSuite = JSON.parse(JSON.stringify(currentData));

                if (event.isAllTests) {
                    const newPipeline: IPipelineDetails = {
                        isAllTests: true,
                    };

                    updatedData.content = updatedData.content.map((suite) => ({
                        ...suite,
                        pipelinesInProgress: [...suite.pipelinesInProgress, newPipeline],
                        tests: suite.tests.map((test) => ({
                            ...test,
                            pipelinesInProgress: [...test.pipelinesInProgress, newPipeline],
                        })),
                    }));
                } else {
                    if (event.configurationSuite) {
                        const index = updatedData.content.findIndex(
                            (suite) => suite.id === event.configurationSuite?.id,
                        );
                        if (index !== -1) {
                            updatedData.content[index] = event.configurationSuite;
                        }
                    }
                }

                return updatedData;
            }, false);
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.RUN_IN_PROGRESS_EVENT, handleRunInProgressEvent);

    return {
        getSuitesAndTestsState: { isLoading, error },
        suitesAndTestsData: data,
        mutateSuitesAndTests: mutate,
        formValues,
        setFormValues: setFormValuesAndSave,
    };
};
