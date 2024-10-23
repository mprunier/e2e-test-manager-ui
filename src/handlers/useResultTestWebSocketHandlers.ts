import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { ITest } from "../interfaces/domain/ITest.tsx";

export const useResultTestWebSocketHandlers = (mutate: KeyedMutator<ITest[]>) => {
    const handleRunCompletedEvent = useCallback(async () => {
        console.log("Run Completed Event - Update Result Test");
        await mutate();
    }, [mutate]);

    return {
        handleRunCompletedEvent,
    };
};
