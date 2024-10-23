import useSWR, { SWRConfiguration } from "swr";
import { getFinalMetricsApiRoute } from "../endpoints/publicEndpoints.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IMetrics } from "../interfaces/domain/IMetrics.tsx";
import { useFinalMetricsWebSocketHandlers } from "../handlers/useFinalMetricsWebSocketHandlers.ts";

const useGetSwrFinalMetrics = (environmentId?: number, options: SWRConfiguration<IMetrics> = {}) =>
    useSWR<IMetrics>(environmentId ? ["useGetSwrFinalMetrics", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getFinalMetricsApiRoute(environmentId as number),
    });

export const useGetFinalMetrics = () => {
    const { environment } = useEnvironmentContext();
    const { data, error, mutate, isLoading } = useGetSwrFinalMetrics(environment?.id);

    const { handleNewFinalMetricsEvent } = useFinalMetricsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.UPDATE_FINAL_METRICS_EVENT, handleNewFinalMetricsEvent);

    return { getFinalMetricsState: { isLoading, error }, finalMetricsData: data, mutateFinalMetrics: mutate };
};
