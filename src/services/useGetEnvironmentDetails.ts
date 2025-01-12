import useSWR, { SWRConfiguration } from "swr";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";

import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useEnvironmentDetailsWebSocketHandlers } from "../handlers/useEnvironmentDetailsWebSocketHandlers.ts";
import { EnvironmentApiService, type EnvironmentDetailsResponse } from "../api";

export const useSwrGetEnvironmentDetails = (id?: string, options: SWRConfiguration<EnvironmentDetailsResponse> = {}) =>
    useSWR<EnvironmentDetailsResponse>(id ? ["useSwrGetEnvironmentDetails", id] : null, {
        ...options,
        fetcher: id ? () => EnvironmentApiService.get(id) : undefined,
        revalidateOnFocus: false,
    });

export const useGetEnvironmentDetails = () => {
    const { environment } = useEnvironmentContext();
    const { data, error, mutate, isLoading } = useSwrGetEnvironmentDetails(environment?.id);

    const { handleSyncEnvironmentInProgressEvent, handleSyncEnvironmentCompletedEvent } =
        useEnvironmentDetailsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.SYNCHRONIZATION_IS_IN_PROGRESS_EVENT, handleSyncEnvironmentInProgressEvent);
    useWebSocketEvent(EEventType.SYNCHRONIZATION_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    return { data, isLoading, error };
};
