import { useCallback } from "react";
import { KeyedMutator } from "swr";
import {
    IEvent,
    ITypeAllWorkerUnitsUpdatedEvent,
    IWorkerUpdatedEvent,
} from "../interfaces/websockets/IWebSocketEvents.ts";
import type { WorkerUnitResponse } from "../api";

export const useTypeAllWorkerUnitsUpdatedWebSocketHandlers = (mutate: KeyedMutator<WorkerUnitResponse[]>) => {
    const handleAllTestsPipelinesUpdatedEvent = useCallback(
        async (data: IEvent) => {
            console.log("Type All Worker units Updated Event");
            const event = data as ITypeAllWorkerUnitsUpdatedEvent;
            await mutate(event.workerUnits, false);
        },
        [mutate],
    );

    const handleWorkerCompletedEvent = useCallback(
        async (data: IEvent) => {
            const event = data as IWorkerUpdatedEvent;
            if (event.status === "COMPLETED") {
                await mutate([], false);
            }
        },
        [mutate],
    );

    return {
        handleAllTestsPipelinesUpdatedEvent,
        handleWorkerCompletedEvent,
    };
};
