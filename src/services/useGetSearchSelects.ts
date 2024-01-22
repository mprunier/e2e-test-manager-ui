import { useForm } from "react-hook-form";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import {
    getFilesApiRoute,
    getSuitesApiRoute,
    getTagsApiRoute,
    getTestsApiRoute,
} from "../endpoints/publicEndpoints.ts";
import { ISearchConfigurationForm } from "../interfaces/domain/ISearch.tsx";
import { IConfigurationTest } from "../interfaces/domain/IConfigurationTest.tsx";
import { IConfigurationSuite } from "../interfaces/domain/IConfigurationSuite.tsx";

const useSwrGetSuites = (environmentId?: number, options: SWRConfiguration<IConfigurationSuite[]> = {}) =>
    useSWR<IConfigurationSuite[]>(environmentId ? ["useSwrGetSuites", environmentId] : null, {
        ...options,
        fetcher: () => getSuitesApiRoute(environmentId as number),
        revalidateOnFocus: false,
    });

const useSwrGetTests = (environmentId?: number, options: SWRConfiguration<IConfigurationTest[]> = {}) =>
    useSWR<IConfigurationTest[]>(environmentId ? ["useSwrGetTests", environmentId] : null, {
        ...options,
        fetcher: () => getTestsApiRoute(environmentId as number),
        revalidateOnFocus: false,
    });

const useSwrGetFiles = (environmentId?: number, options: SWRConfiguration<string[]> = {}) =>
    useSWR<string[]>(environmentId ? ["useSwrGetFiles", environmentId] : null, {
        ...options,
        fetcher: () => getFilesApiRoute(environmentId as number),
        revalidateOnFocus: false,
    });

const useSwrGetTags = (environmentId?: number, options: SWRConfiguration<string[]> = {}) =>
    useSWR<string[]>(environmentId ? ["useSwrGetTags", environmentId] : null, {
        ...options,
        fetcher: () => getTagsApiRoute(environmentId as number),
        revalidateOnFocus: false,
    });

export const defaultSearchValues: ISearchConfigurationForm = {
    configurationTestId: "",
    configurationSuiteId: "",
    status: "",
};

export const useGetSearchSelects = () => {
    const { environment } = useEnvironmentContext();

    const defaultValues: ISearchConfigurationForm = defaultSearchValues;
    const formMethods = useForm<ISearchConfigurationForm>({ defaultValues });

    const { data: suitesData, error: suitesError, isLoading: suitesLoading } = useSwrGetSuites(environment?.id);

    const { data: testsData, error: testsError, isLoading: testsLoading } = useSwrGetTests(environment?.id);

    const { data: filesData, error: filesError, isLoading: filesLoading } = useSwrGetFiles(environment?.id);

    const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useSwrGetTags(environment?.id);

    return {
        tagsData,
        tagsError,
        tagsLoading,
        filesData,
        filesError,
        filesLoading,
        suitesData,
        suitesError,
        suitesLoading,
        testsData,
        testsError,
        testsLoading,
        formMethods: formMethods,
        defaultValues,
    };
};
