import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getEnvironmentErrorsApiRoutes } from "../endpoints/publicEndpoints.ts";
import { useCallback } from "react";
import { EEventType, IEvent, ISyncEnvironmentCompletedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IError } from "../interfaces/domain/IError.tsx";

const useSwrGetEnvironmentSyncErrors = (environmentId?: number, options: SWRConfiguration<IError[]> = {}) =>
    useSWR<IError[]>(environmentId ? ["useSwrGetEnvironmentSyncErrors", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getEnvironmentErrorsApiRoutes(environmentId as number),
    });

export const useGetEnvironmentSyncErrors = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetEnvironmentSyncErrors(environment?.id);

    const handleEvent = useCallback(
        async (data: IEvent) => {
            console.log("Sync Environment Completed Event - Update Sync Errors");
            const event = data as ISyncEnvironmentCompletedEvent;
            await mutate(event.syncErrors, false);
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleEvent);

    return { getSyncErrorsState: { isLoading, error }, errorsData: data, mutateSyncErrors: mutate };
};
