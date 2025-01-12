import useSWR, { SWRConfiguration } from "swr";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { SchedulerApiService, type SchedulerResponse } from "../api";

const useSwrGetConfigurationScheduler = (environmentId?: string, options: SWRConfiguration<SchedulerResponse> = {}) =>
    useSWR<SchedulerResponse>(environmentId ? ["useSwrGetConfigurationScheduler", environmentId] : null, {
        ...options,
        fetcher: environmentId ? () => SchedulerApiService.get(environmentId) : undefined,
        revalidateOnFocus: false,
    });

export const useGetConfigurationScheduler = () => {
    const { environment } = useEnvironmentContext();
    const { data, mutate, isLoading, error } = useSwrGetConfigurationScheduler(environment?.id);

    return {
        getConfigurationSchedulerState: { isLoading, error },
        configurationSchedulerData: data,
        mutateConfigurationScheduler: mutate,
    };
};
