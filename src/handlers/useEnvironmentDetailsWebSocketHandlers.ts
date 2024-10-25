import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, ISyncEnvironmentCompletedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";

export const useEnvironmentDetailsWebSocketHandlers = (mutate: KeyedMutator<IEnvironment>) => {
    const handleSyncEnvironmentCompletedEvent = useCallback(
        async (data: IEvent) => {
            console.log("Sync Environment Completed Event - Update Environment", new Date().toLocaleString(), data);
            const event = data as ISyncEnvironmentCompletedEvent;
            await mutate(event.environment, false);
        },
        [mutate],
    );

    return {
        handleSyncEnvironmentCompletedEvent,
    };
};
