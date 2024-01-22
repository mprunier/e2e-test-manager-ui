import { useCallback, useEffect, useState } from "react";
import { objectToQuery } from "../utils/urlUtils.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getSuiteSearchApiRoute } from "../endpoints/publicEndpoints.ts";
import { EEventType, IEvent, ITestRunInProgressEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { EConfigurationStatus } from "../constants.ts";
import { ISearchConfigurationSuite } from "../interfaces/domain/ISearch.tsx";
import {
    EConfigurationSuiteSortField,
    EConfigurationSuiteSortOrder,
} from "../interfaces/domain/IConfigurationSuite.tsx";
import { useStorage } from "../hooks/useStorage.ts";

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

    useEffect(() => {
        saveInStorage({
            page: formValues.page,
            size: formValues.size,
            sortField: formValues.sortField,
            sortOrder: formValues.sortOrder,
        });
    }, [formValues.page, formValues.size, formValues.sortField, formValues.sortOrder, saveInStorage]);

    const setFormValuesAndSave = useCallback(
        (newValues: Partial<FormValues>) => {
            setFormValues((prevValues) => {
                const updatedValues = { ...prevValues, ...newValues };
                saveInStorage({
                    page: updatedValues.page,
                    size: updatedValues.size,
                    sortField: updatedValues.sortField,
                    sortOrder: updatedValues.sortOrder,
                });
                return updatedValues;
            });
        },
        [saveInStorage],
    );

    const query = `${objectToQuery(formValuesToRecord(formValues))}`;
    const queryWithEnv =
        query === "" ? `environmentId=${environment?.id}` : `environmentId=${environment?.id}&${query}`;

    const { data, error, mutate, isLoading } = useSwrGetSuitesAndTests(queryWithEnv);

    const handleCompleteRefreshEvent = useCallback(async () => {
        console.log("Test or All Tests Run Completed Event - Update Suites and Tests");
        await mutate();
    }, [mutate]);
    useWebSocketEvent(EEventType.TEST_RUN_COMPLETED_EVENT, handleCompleteRefreshEvent);
    useWebSocketEvent(EEventType.ALL_TESTS_RUN_COMPLETED_EVENT, handleCompleteRefreshEvent);

    const handleSyncEnvironmentCompletedEvent = useCallback(async () => {
        console.log("Sync Environment Completed Event - Update Suites and Tests");
        await mutate();
    }, [mutate]);
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    const handleTestRunInProgressEvent = useCallback(
        async (data: IEvent) => {
            console.log("Test Run In Progress Event - Update Suites and Tests");
            const event = data as ITestRunInProgressEvent;
            await mutate((currentData) => {
                if (!currentData) return;
                // Create a deep copy of currentData to ensure immutability
                const updatedData: ISearchConfigurationSuite = JSON.parse(JSON.stringify(currentData));
                if (event.testId) {
                    const suite = updatedData.content.find((s) => s.tests.some((t) => t.id === event.testId));
                    if (suite) {
                        suite.status = EConfigurationStatus.IN_PROGRESS;
                        const test = suite.tests.find((t) => t.id === event.testId);
                        if (test) {
                            test.status = EConfigurationStatus.IN_PROGRESS;
                        }
                        const hasNewTest = suite.tests.find((t) => t.status === EConfigurationStatus.NEW);
                        if (!hasNewTest) {
                            suite.hasNewTest = false;
                        }
                    }
                } else if (event.suiteId) {
                    const suite = updatedData.content.find((s) => s.id === event.suiteId);
                    if (suite) {
                        suite.status = EConfigurationStatus.IN_PROGRESS;
                        suite.hasNewTest = false;
                        suite.tests.forEach((t) => {
                            t.status = EConfigurationStatus.IN_PROGRESS;
                        });
                    }
                }
                return updatedData;
            }, false);
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.TEST_RUN_IN_PROGRESS_EVENT, handleTestRunInProgressEvent);

    return {
        getSuitesAndTestsState: { isLoading, error },
        suitesAndTestsData: data,
        mutateSuitesAndTests: mutate,
        formValues,
        setFormValues: setFormValuesAndSave,
    };
};
