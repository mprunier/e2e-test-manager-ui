import useSWR, { SWRConfiguration } from "swr";
import { getFinalMetricsApiRoute } from "../endpoints/publicEndpoints.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { useCallback } from "react";
import { EEventType, IEvent, IUpdateFinalMetricsEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IMetrics } from "../interfaces/domain/IMetrics.tsx";

const useGetSwrFinalMetrics = (environmentId?: number, options: SWRConfiguration<IMetrics> = {}) =>
    useSWR<IMetrics>(environmentId ? ["useGetSwrFinalMetrics", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getFinalMetricsApiRoute(environmentId as number),
    });

export const useGetFinalMetrics = () => {
    const { environment } = useEnvironmentContext();
    const { data, error, mutate, isLoading } = useGetSwrFinalMetrics(environment?.id);

    const handleEvent = useCallback(
        async (data: IEvent) => {
            console.log("Update Final Metrics Event");
            const event = data as IUpdateFinalMetricsEvent;
            await mutate(event.metrics, false);
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.UPDATE_FINAL_METRICS_EVENT, handleEvent);

    return { getFinalMetricsState: { isLoading, error }, finalMetricsData: data, mutateFinalMetrics: mutate };
};
