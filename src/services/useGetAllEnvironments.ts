import useSWR, { SWRConfiguration } from "swr";
import { EnvironmentApiService, type EnvironmentResponse } from "../api";

export const useSwrGetEnvironments = (all?: boolean, options: SWRConfiguration<EnvironmentResponse[]> = {}) =>
    useSWR<EnvironmentResponse[]>(["useSwrGetEnvironments", all], {
        ...options,
        fetcher: () => EnvironmentApiService.listAll(),
        revalidateOnFocus: false,
    });

export const useGetEnvironments = (all?: boolean) => {
    const { data, error, mutate, isLoading } = useSwrGetEnvironments(all);

    return { getEnvironmentsState: { isLoading, error }, environmentsData: data, mutateEnvironments: mutate };
};
