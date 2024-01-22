import useSWR, { SWRConfiguration } from "swr";
import { getConfigurationSchedulerApiRoute } from "../endpoints/publicEndpoints.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { IConfigurationScheduler } from "../interfaces/domain/IConfigurationScheduler.tsx";

const useSwrGetConfigurationScheduler = (
    environmentId: number,
    options: SWRConfiguration<IConfigurationScheduler> = {},
) =>
    useSWR<IConfigurationScheduler>(["useSwrGetConfigurationScheduler", environmentId], {
        ...options,
        fetcher: () => getConfigurationSchedulerApiRoute(environmentId),
        revalidateOnFocus: false,
    });

export const useGetConfigurationScheduler = () => {
    const { environment } = useEnvironmentContext();
    const { data, mutate, isLoading, error } = useSwrGetConfigurationScheduler(environment?.id as number);

    return {
        getConfigurationSchedulerState: { isLoading, error },
        configurationSchedulerData: data,
        mutateConfigurationScheduler: mutate,
    };
};
