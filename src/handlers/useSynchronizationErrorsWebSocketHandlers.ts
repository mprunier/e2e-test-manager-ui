import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, ISynchronizationCompletedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { SynchronizationErrorResponse } from "../api";

export const useSynchronizationErrorsWebSocketHandlers = (mutate: KeyedMutator<SynchronizationErrorResponse[]>) => {
    const handleSyncEnvironmentCompletedEvent = useCallback(
        async (data: IEvent) => {
            console.log("Synchronization Completed Event - Update Sync Errors");
            const event = data as ISynchronizationCompletedEvent;
            await mutate(event.syncErrors, false);
        },
        [mutate],
    );

    return {
        handleSyncEnvironmentCompletedEvent,
    };
};
