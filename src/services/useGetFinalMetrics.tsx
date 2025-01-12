import useSWR, { SWRConfiguration } from "swr";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useFinalMetricsWebSocketHandlers } from "../handlers/useFinalMetricsWebSocketHandlers.ts";
import { MetricsApiService, type MetricsResponse } from "../api";

const useGetSwrFinalMetrics = (environmentId?: string, options: SWRConfiguration<MetricsResponse> = {}) =>
    useSWR<MetricsResponse>(environmentId ? ["useGetSwrFinalMetrics", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: environmentId ? () => MetricsApiService.getLast(environmentId) : undefined,
    });

export const useGetFinalMetrics = () => {
    const { environment } = useEnvironmentContext();
    const { data, error, mutate, isLoading } = useGetSwrFinalMetrics(environment?.id);

    const { handleNewFinalMetricsEvent } = useFinalMetricsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.UPDATE_FINAL_METRICS_EVENT, handleNewFinalMetricsEvent);

    return { getFinalMetricsState: { isLoading, error }, finalMetricsData: data, mutateFinalMetrics: mutate };
};
