import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, IUpdateFinalMetricsEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import type { MetricsResponse } from "../api";

export const useFinalMetricsWebSocketHandlers = (mutate: KeyedMutator<MetricsResponse>) => {
    const handleNewFinalMetricsEvent = useCallback(
        async (data: IEvent) => {
            console.log("New Final Metrics Event");
            const event = data as IUpdateFinalMetricsEvent;
            await mutate(event.metrics, false);
        },
        [mutate],
    );

    return {
        handleNewFinalMetricsEvent,
    };
};
