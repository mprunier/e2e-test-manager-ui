import useSWR, { SWRConfiguration } from "swr";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { getEnvironmentsApiRoute } from "../endpoints/publicEndpoints.ts";

export const useSwrGetEnvironments = (all?: boolean, options: SWRConfiguration<IEnvironment[]> = {}) =>
    useSWR<IEnvironment[]>(["useSwrGetEnvironments", all], {
        ...options,
        fetcher: () => getEnvironmentsApiRoute(all),
        revalidateOnFocus: false,
    });

export const useGetEnvironments = (all?: boolean) => {
    const { data, error, mutate, isLoading } = useSwrGetEnvironments(all);

    return { getEnvironmentsState: { isLoading, error }, environmentsData: data, mutateEnvironments: mutate };
};
