import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, IUpdateAllTestsPipelinesEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { IPipeline } from "../interfaces/domain/IPipeline.tsx";

export const useAllTestsPipelinesUpdatedWebSocketHandlers = (mutate: KeyedMutator<IPipeline[]>) => {
    const handleAllTestsPipelinesUpdatedEvent = useCallback(
        async (data: IEvent) => {
            console.log("All Tests Pipelines Updated Event", new Date().toLocaleString());
            const event = data as IUpdateAllTestsPipelinesEvent;
            await mutate(event.pipelines, false);
        },
        [mutate],
    );

    return {
        handleAllTestsPipelinesUpdatedEvent,
    };
};
