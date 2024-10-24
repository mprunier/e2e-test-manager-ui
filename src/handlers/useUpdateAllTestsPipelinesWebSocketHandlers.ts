import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, IUpdateAllTestsPipelinesEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { IPipeline } from "../interfaces/domain/IPipeline.tsx";

export const useUpdateAllTestsPipelinesWebSocketHandlers = (mutate: KeyedMutator<IPipeline[]>) => {
    const handleUpdateAllTestsPipelinesEvent = useCallback(
        async (data: IEvent) => {
            console.log("Update All Tests Pipelines Event");
            const event = data as IUpdateAllTestsPipelinesEvent;
            await mutate(event.pipelines, false);
        },
        [mutate],
    );

    return {
        handleUpdateAllTestsPipelinesEvent,
    };
};
