import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getErrorsApiRoutes } from "../endpoints/publicEndpoints.ts";
import { useCallback } from "react";
import { EEventType, IEvent, ISyncEnvironmentCompletedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IError } from "../interfaces/domain/IError.tsx";

const useSwrGetSyncErrors = (environmentId?: number, options: SWRConfiguration<IError[]> = {}) =>
    useSWR<IError[]>(environmentId ? ["useSwrGetSyncErrors", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getErrorsApiRoutes(environmentId as number),
    });

export const useGetSyncErrors = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetSyncErrors(environment?.id);

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
