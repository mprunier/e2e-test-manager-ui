import useSWR, { SWRConfiguration } from "swr";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { useResultTestsWebSocketHandlers } from "../handlers/useResultTestsWebSocketHandlers.ts";
import { TestResultApiService, type TestResultResponse } from "../api";

const useSwrGetResultTest = (configurationTestId: string, options: SWRConfiguration<TestResultResponse[]> = {}) =>
    useSWR<TestResultResponse[]>(["useSwrGetResultTest", configurationTestId], {
        ...options,
        fetcher: () => TestResultApiService.getAll(configurationTestId),
        revalidateOnFocus: false,
    });

interface IParams {
    configurationTestId: string;
}

export const useGetResultTest = (props: IParams) => {
    const { configurationTestId } = props;

    const { data, error, mutate, isLoading } = useSwrGetResultTest(configurationTestId);

    const { handleWorkerCompletedEvent } = useResultTestsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.WORKER_UPDATED_EVENT, handleWorkerCompletedEvent);

    return { getResultTestState: { isLoading, error }, resultTestData: data, mutateResultTest: mutate };
};
