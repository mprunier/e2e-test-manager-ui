import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useTypeAllWorkerUnitsUpdatedWebSocketHandlers } from "../handlers/useTypeAllWorkerUnitsUpdatedWebSocketHandlers.ts";
import { WorkerApiService, type WorkerUnitResponse } from "../api";

const useSwrGetTypeAllWorkerUnits = (environmentId?: string, options: SWRConfiguration<WorkerUnitResponse[]> = {}) =>
    useSWR<WorkerUnitResponse[]>(environmentId ? ["useSwrGetTypeAllWorkerUnits", environmentId] : null, {
        ...options,
        revalidateOnFocus: false,
        fetcher: environmentId ? () => WorkerApiService.getTypeAllWorkerUnits(environmentId) : undefined,
    });

export const useGetTypeAllWorkerUnits = () => {
    const { environment } = useEnvironmentContext();

    const { data, error, isLoading, mutate } = useSwrGetTypeAllWorkerUnits(environment?.id);

    const { handleAllTestsPipelinesUpdatedEvent, handleWorkerCompletedEvent } =
        useTypeAllWorkerUnitsUpdatedWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.TYPE_ALL_WORKER_UNITS_UPDATED_EVENT, handleAllTestsPipelinesUpdatedEvent);
    useWebSocketEvent(EEventType.WORKER_UPDATED_EVENT, handleWorkerCompletedEvent);

    return { getTypeAllWorkerUnitsState: { isLoading, error }, typeAllWorkerUnits: data };
};
