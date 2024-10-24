import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getAllTestsPipelinesApiRoute } from "../endpoints/publicEndpoints.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { IPipeline } from "../interfaces/domain/IPipeline.tsx";
import { useUpdateAllTestsPipelinesWebSocketHandlers } from "../handlers/useUpdateAllTestsPipelinesWebSocketHandlers.ts";

const useSwrGetAllTestsPipelines = (environmentId?: number, options: SWRConfiguration<IPipeline[]> = {}) =>
    useSWR<IPipeline[]>(environmentId ? ["useSwrGetAllTestsPipelines", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getAllTestsPipelinesApiRoute(environmentId as number),
    });

export const useGetAllTestsPipelines = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetAllTestsPipelines(environment?.id);

    const { handleUpdateAllTestsPipelinesEvent } = useUpdateAllTestsPipelinesWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.UPDATE_ALL_TESTS_PIPELINES_COMPLETED, handleUpdateAllTestsPipelinesEvent);

    return { getAllTestsPipelinesState: { isLoading, error }, allTestsPipelines: data };
};
