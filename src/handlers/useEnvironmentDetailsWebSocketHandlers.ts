import { useCallback } from "react";
import { KeyedMutator } from "swr";
import type { EnvironmentDetailsResponse } from "../api";

export const useEnvironmentDetailsWebSocketHandlers = (mutate: KeyedMutator<EnvironmentDetailsResponse>) => {
    const handleSyncEnvironmentInProgressEvent = useCallback(async () => {
        console.log("Synchronization In Progress Event - Update Environment");
        await mutate(
            (currentData) => (currentData ? { ...currentData, synchronizationInProgress: true } : currentData),
            false,
        );
    }, [mutate]);

    const handleSyncEnvironmentCompletedEvent = useCallback(async () => {
        console.log("Synchronization Event - Update Environment");
        await mutate(
            (currentData) => (currentData ? { ...currentData, synchronizationInProgress: false } : currentData),
            false,
        );
    }, [mutate]);

    return {
        handleSyncEnvironmentInProgressEvent,
        handleSyncEnvironmentCompletedEvent,
    };
};
