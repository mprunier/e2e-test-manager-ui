import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getEnvironmentErrorsApiRoutes } from "../endpoints/publicEndpoints.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IError } from "../interfaces/domain/IError.tsx";
import { useEnvironmentSyncWebSocketHandlers } from "../handlers/useEnvironmentSyncWebSocketHandlers.ts";

const useSwrGetEnvironmentSyncErrors = (environmentId?: number, options: SWRConfiguration<IError[]> = {}) =>
    useSWR<IError[]>(environmentId ? ["useSwrGetEnvironmentSyncErrors", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getEnvironmentErrorsApiRoutes(environmentId as number),
    });

export const useGetEnvironmentSyncErrors = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetEnvironmentSyncErrors(environment?.id);

    const { handleSyncEnvironmentCompletedEvent } = useEnvironmentSyncWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    return { getSyncErrorsState: { isLoading, error }, errorsData: data, mutateSyncErrors: mutate };
};
