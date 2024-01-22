import useSWR, { SWRConfiguration } from "swr";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { getEnvironmentApiRoute } from "../endpoints/publicEndpoints.ts";
import { useEnvironmentStore } from "../stores/useEnvironmentStore.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import {
    EEventType,
    IAllTestsRunCompletedEvent,
    IEvent,
    ISyncEnvironmentCompletedEvent,
} from "../interfaces/websockets/IWebSocketEvents.ts";

import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useCallback, useEffect } from "react";

export const useSwrGetEnvironmentDetails = (id?: number, options: SWRConfiguration<IEnvironment> = {}) =>
    useSWR<IEnvironment>(id ? ["useSwrGetEnvironmentDetails", id] : null, {
        ...options,
        fetcher: () => getEnvironmentApiRoute(id as number),
        revalidateOnFocus: false,
    });

export const useGetEnvironmentDetails = () => {
    const { environment } = useEnvironmentContext();
    const { data, error, mutate, isLoading } = useSwrGetEnvironmentDetails(environment?.id);

    useEffect(() => {
        useEnvironmentStore.getState().setEnvironmentData(data);
    }, [data]);

    useEffect(() => {
        useEnvironmentStore.getState().setLoading(isLoading);
    }, [isLoading]);

    useEffect(() => {
        useEnvironmentStore.getState().setError(error);
    }, [error]);

    const handleSyncEnvironmentCompletedEvent = useCallback(
        async (data: IEvent) => {
            console.log("Sync Environment Completed Event - Update Environment");
            const event = data as ISyncEnvironmentCompletedEvent;
            await mutate(event.environment, false);
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    const handleAllTestsRunInProgressEvent = useCallback(async () => {
        console.log("All Tests Run In Progress Event - Update Environment");
        await mutate((currentData) => {
            if (!currentData) return;
            const updatedData = { ...currentData };
            updatedData.isRunningAllTests = true;
            return updatedData;
        }, false);
    }, [mutate]);
    useWebSocketEvent(EEventType.ALL_TESTS_RUN_IN_PROGRESS_EVENT, handleAllTestsRunInProgressEvent);

    const handleAllTestsRunCompletedEvent = useCallback(
        (data: IEvent) => {
            console.log("All Tests Run Completed Event - Update Environment");
            const event = data as IAllTestsRunCompletedEvent;
            mutate((currentData) => {
                if (!currentData) return;
                const updatedData = { ...currentData };
                updatedData.isRunningAllTests = false;
                updatedData.lastAllTestsError = event.lastAllTestsError;
                return updatedData;
            }, false).then();
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.ALL_TESTS_RUN_COMPLETED_EVENT, handleAllTestsRunCompletedEvent);

    return {};
};
