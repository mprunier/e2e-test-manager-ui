import useSWR, { SWRConfiguration } from "swr";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { getEnvironmentApiRoute } from "../endpoints/publicEndpoints.ts";
import { useEnvironmentStore } from "../stores/useEnvironmentStore.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";

import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useEffect } from "react";
import { useEnvironmentDetailsWebSocketHandlers } from "../handlers/useEnvironmentDetailsWebSocketHandlers.ts";

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

    const { handleSyncEnvironmentCompletedEvent } = useEnvironmentDetailsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.SYNC_ENVIRONMENT_COMPLETED_EVENT, handleSyncEnvironmentCompletedEvent);

    return {};
};
