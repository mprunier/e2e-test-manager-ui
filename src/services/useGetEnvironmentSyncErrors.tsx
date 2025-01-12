import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useSynchronizationErrorsWebSocketHandlers } from "../handlers/useSynchronizationErrorsWebSocketHandlers.ts";
import { type SynchronizationErrorResponse, SynchronizeApiService } from "../api";

const useSwrGetEnvironmentSyncErrors = (
    environmentId?: string,
    options: SWRConfiguration<SynchronizationErrorResponse[]> = {},
) =>
    useSWR<SynchronizationErrorResponse[]>(environmentId ? ["useSwrGetEnvironmentSyncErrors", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: environmentId ? () => SynchronizeApiService.getErrors(environmentId) : undefined,
    });

export const useGetEnvironmentSyncErrors = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetEnvironmentSyncErrors(environment?.id);

    const { handleSyncEnvironmentCompletedEvent } = useSynchronizationErrorsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.SYNCHRONIZATION_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    return { getSyncErrorsState: { isLoading, error }, errorsData: data, mutateSyncErrors: mutate };
};
