import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getAllTestsPipelinesApiRoute } from "../endpoints/publicEndpoints.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IPipeline } from "../interfaces/domain/IPipeline.tsx";
import { useAllTestsPipelinesUpdatedWebSocketHandlers } from "../handlers/useAllTestsPipelinesUpdatedWebSocketHandlers.ts";

const useSwrGetAllTestsPipelines = (environmentId?: number, options: SWRConfiguration<IPipeline[]> = {}) =>
    useSWR<IPipeline[]>(environmentId ? ["useSwrGetAllTestsPipelines", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getAllTestsPipelinesApiRoute(environmentId as number),
    });

export const useGetAllTestsPipelines = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetAllTestsPipelines(environment?.id);

    const { handleAllTestsPipelinesUpdatedEvent } = useAllTestsPipelinesUpdatedWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.ALL_TESTS_PIPELINES_UPDATED, handleAllTestsPipelinesUpdatedEvent);

    return { getAllTestsPipelinesState: { isLoading, error }, allTestsPipelines: data };
};
