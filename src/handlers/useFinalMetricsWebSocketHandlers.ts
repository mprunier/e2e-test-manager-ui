import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, IUpdateFinalMetricsEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { IMetrics } from "../interfaces/domain/IMetrics.tsx";

export const useFinalMetricsWebSocketHandlers = (mutate: KeyedMutator<IMetrics>) => {
    const handleNewFinalMetricsEvent = useCallback(
        async (data: IEvent) => {
            console.log("New Final Metrics Event", new Date().toLocaleString());
            const event = data as IUpdateFinalMetricsEvent;
            await mutate(event.metrics, false);
        },
        [mutate],
    );

    return {
        handleNewFinalMetricsEvent,
    };
};
