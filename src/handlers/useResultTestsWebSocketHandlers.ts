import { useCallback } from "react";
import { KeyedMutator } from "swr";
import type { TestResultResponse } from "../api";
import { IEvent, IWorkerUpdatedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";

export const useResultTestsWebSocketHandlers = (mutate: KeyedMutator<TestResultResponse[]>) => {
    const handleWorkerCompletedEvent = useCallback(
        async (data: IEvent) => {
            const event = data as IWorkerUpdatedEvent;
            if (event.status === "COMPLETED") {
                console.log("Worker Completed Event - Update Test Result");
                await mutate();
            }
        },
        [mutate],
    );

    return {
        handleWorkerCompletedEvent,
    };
};
