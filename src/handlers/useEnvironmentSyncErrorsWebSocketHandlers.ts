import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, ISyncEnvironmentCompletedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { IError } from "../interfaces/domain/IError.tsx";

export const useEnvironmentSyncErrorsWebSocketHandlers = (mutate: KeyedMutator<IError[]>) => {
    const handleSyncEnvironmentCompletedEvent = useCallback(
        async (data: IEvent) => {
            console.log("Sync Environment Completed Event - Update Sync Errors", new Date().toLocaleString());
            const event = data as ISyncEnvironmentCompletedEvent;
            await mutate(event.syncErrors, false);
        },
        [mutate],
    );

    return {
        handleSyncEnvironmentCompletedEvent,
    };
};
