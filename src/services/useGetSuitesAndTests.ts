import { useCallback, useEffect, useRef } from "react";
import { objectToQuery } from "../utils/urlUtils.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getSuiteSearchApiRoute } from "../endpoints/publicEndpoints.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { ISearchConfigurationSuite } from "../interfaces/domain/ISearch.tsx";
import { useStorage } from "../hooks/useStorage.ts";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import {
    FormValues,
    formValuesToRecord,
    STORAGE_KEY_PAGINATION,
    StoredPaginationSettings,
} from "../interfaces/technical/SearchSuite.ts";
import { useSearchConfigurationSuiteWebSocketHandlers } from "../handlers/useSearchConfigurationSuiteWebSocketHandlers.ts";
import {
    EConfigurationSuiteSortField,
    EConfigurationSuiteSortOrder,
} from "../interfaces/domain/IConfigurationSuite.tsx";

export const useSwrGetSuitesAndTests = (query: string, options: SWRConfiguration<ISearchConfigurationSuite> = {}) =>
    useSWR<ISearchConfigurationSuite>(["useSwrGetSuitesAndTests", query], {
        ...options,
        fetcher: () => getSuiteSearchApiRoute(query),
        revalidateOnFocus: false,
    });

export const useInitialFormValues = (
    searchParams: URLSearchParams,
    storedPaginationSettings?: StoredPaginationSettings,
): FormValues => {
    return {
        file: searchParams.get("file") || "",
        configurationSuiteId: searchParams.get("suiteId") || "",
        configurationTestId: searchParams.get("testId") || "",
        configurationTestTag: searchParams.get("tag") || "",
        status: searchParams.get("status") || "",
        allNotSuccess: searchParams.get("unsuccessful") === "true",
        page: parseInt(searchParams.get("page") || "0"),
        size: parseInt(searchParams.get("size") || storedPaginationSettings?.size?.toString() || "10"),
        sortField:
            (searchParams.get("sortField") as EConfigurationSuiteSortField) ||
            storedPaginationSettings?.sortField ||
            EConfigurationSuiteSortField.FILE,
        sortOrder:
            (searchParams.get("sortOrder") as EConfigurationSuiteSortOrder) ||
            storedPaginationSettings?.sortOrder ||
            EConfigurationSuiteSortOrder.DESC,
    };
};

export const useUrlParamsHandler = (
    formValues: FormValues,
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
) => {
    return useCallback(
        (newValues: Partial<FormValues>) => {
            const updatedValues = { ...formValues, ...newValues };
            const newSearchParams = new URLSearchParams(searchParams);

            const paramMapping = {
                configurationSuiteId: "suiteId",
                configurationTestId: "testId",
                configurationTestTag: "tag",
                allNotSuccess: "unsuccessful",
            };

            Object.entries(updatedValues).forEach(([key, value]) => {
                const urlKey = paramMapping[key as keyof typeof paramMapping] || key;

                if (value && value.toString() !== "0" && value.toString() !== "false") {
                    newSearchParams.set(urlKey, value.toString());
                } else {
                    newSearchParams.delete(urlKey);
                }
            });

            setSearchParams(newSearchParams, { replace: true });
        },
        [formValues, searchParams, setSearchParams],
    );
};

const extractPaginationSettings = (formValues: FormValues): StoredPaginationSettings => ({
    page: formValues.page,
    size: formValues.size,
    sortField: formValues.sortField,
    sortOrder: formValues.sortOrder,
});

export const useSavePaginationEffect = (
    formValues: FormValues,
    saveInStorage: (settings: StoredPaginationSettings) => void,
) => {
    const prevPaginationRef = useRef<StoredPaginationSettings>(extractPaginationSettings(formValues));

    useEffect(() => {
        const currentPagination = extractPaginationSettings(formValues);

        if (JSON.stringify(currentPagination) !== JSON.stringify(prevPaginationRef.current)) {
            saveInStorage(currentPagination);
            prevPaginationRef.current = currentPagination;
        }
    }, [formValues.page, formValues.size, formValues.sortField, formValues.sortOrder, saveInStorage]);
};

export const useGetSuitesAndTests = () => {
    const { environment } = useEnvironmentContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: storedPaginationSettings, saveInStorage } =
        useStorage<StoredPaginationSettings>(STORAGE_KEY_PAGINATION);

    useEffect(() => {
        if (storedPaginationSettings && searchParams.toString() === "") {
            const newSearchParams = new URLSearchParams();

            if (storedPaginationSettings.size !== 10) {
                newSearchParams.set("size", storedPaginationSettings.size.toString());
            }
            if (storedPaginationSettings.sortField !== EConfigurationSuiteSortField.FILE) {
                newSearchParams.set("sortField", storedPaginationSettings.sortField);
            }
            if (storedPaginationSettings.sortOrder !== EConfigurationSuiteSortOrder.DESC) {
                newSearchParams.set("sortOrder", storedPaginationSettings.sortOrder);
            }
            if (storedPaginationSettings.page > 0) {
                newSearchParams.set("page", storedPaginationSettings.page.toString());
            }

            if (newSearchParams.toString() !== "") {
                setSearchParams(newSearchParams, { replace: true });
            }
        }
    }, [storedPaginationSettings, searchParams, setSearchParams]);

    const formValues = useInitialFormValues(searchParams, storedPaginationSettings);
    const setFormValues = useUrlParamsHandler(formValues, searchParams, setSearchParams);
    useSavePaginationEffect(formValues, saveInStorage);

    const query = objectToQuery(formValuesToRecord(formValues));
    const queryWithEnv =
        query === "" ? `environmentId=${environment?.id}` : `environmentId=${environment?.id}&${query}`;

    const { data, error, mutate, isLoading } = useSwrGetSuitesAndTests(queryWithEnv);

    const { handleCompleteRefreshEvent, handleRunInProgressEvent, handleSyncEnvironmentCompletedEvent } =
        useSearchConfigurationSuiteWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.RUN_COMPLETED_EVENT, handleCompleteRefreshEvent);
    useWebSocketEvent(EEventType.RUN_IN_PROGRESS_EVENT, handleRunInProgressEvent);
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    return {
        getSuitesAndTestsState: { isLoading, error },
        suitesAndTestsData: data,
        mutateSuitesAndTests: mutate,
        formValues,
        setFormValues,
    };
};
