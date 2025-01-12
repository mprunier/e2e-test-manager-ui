import { useForm } from "react-hook-form";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext";
import useSWR, { SWRConfiguration } from "swr";
import { type SearchCriteriaResponse, SuiteApiService } from "../api";

export interface ISearchConfigurationForm {
    configurationTestId: string;
    configurationSuiteId: string;
    status: string;
    tag: string;
    file: string;
    allNotSuccess: boolean;
    page: number;
    size: number;
    sortField: string;
    sortOrder: string;
}

export const defaultSearchValues: ISearchConfigurationForm = {
    configurationTestId: "",
    configurationSuiteId: "",
    status: "",
    tag: "",
    file: "",
    allNotSuccess: false,
    page: 0,
    size: 10,
    sortField: "file",
    sortOrder: "desc",
};

const useSwrGetSearchCriteria = (environmentId?: string, options: SWRConfiguration<SearchCriteriaResponse> = {}) =>
    useSWR<SearchCriteriaResponse>(environmentId ? ["useSwrGetSearchCriteria", environmentId] : null, {
        ...options,
        fetcher: () => SuiteApiService.getSearchCriteria(environmentId as string),
        revalidateOnFocus: false,
    });

export const useGetSearchSelects = () => {
    const { environment } = useEnvironmentContext();
    const formMethods = useForm<ISearchConfigurationForm>({
        defaultValues: defaultSearchValues,
    });

    const {
        data: criteriaData,
        error: criteriaError,
        isLoading: criteriaLoading,
    } = useSwrGetSearchCriteria(environment?.id);

    return {
        criteriaData,
        criteriaError,
        criteriaLoading,
        formMethods,
    };
};
