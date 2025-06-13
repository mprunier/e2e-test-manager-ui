import { useState } from "react";
import { useWebSocketEvent } from "./useWebSocketEvent";
import { EEventType, IEvent, IWorkerUpdatedEvent } from "../interfaces/websockets/IWebSocketEvents";
import { WorkerType } from "../api";

export const useIsRunningByGroup = () => {
    const [runningGroup, setRunningGroup] = useState<string | null>(null);

    const handleWorkerUpdatedEvent = (data: IEvent) => {
        const event = data as IWorkerUpdatedEvent;
        if (event.workerType === WorkerType.GROUP) {
            if (event.status === "IN_PROGRESS") {
                setRunningGroup(event.groupName || null);
            } else if (event.status === "COMPLETED") {
                setRunningGroup(null);
            }
        }
    };

    useWebSocketEvent(EEventType.WORKER_UPDATED_EVENT, handleWorkerUpdatedEvent);

    return { isRunningByGroup: runningGroup!==null, runningGroup };
};
