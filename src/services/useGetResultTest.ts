import useSWR, { SWRConfiguration } from "swr";
import { getResultTestApiRoute } from "../endpoints/publicEndpoints.ts";
import { EEventType } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { ITest } from "../interfaces/domain/ITest.tsx";
import { useResultTestsWebSocketHandlers } from "../handlers/useResultTestsWebSocketHandlers.ts";

const useSwrGetResultTest = (configurationTestId: number, options: SWRConfiguration<ITest[]> = {}) =>
    useSWR<ITest[]>(["useSwrGetResultTest", configurationTestId], {
        ...options,
        fetcher: () => getResultTestApiRoute(configurationTestId),
        revalidateOnFocus: false,
    });

interface IParams {
    configurationTestId: number;
}

export const useGetResultTest = (props: IParams) => {
    const { configurationTestId } = props;

    const { data, error, mutate, isLoading } = useSwrGetResultTest(configurationTestId);

    const { handleRunCompletedEvent } = useResultTestsWebSocketHandlers(mutate);
    useWebSocketEvent(EEventType.RUN_COMPLETED_EVENT, handleRunCompletedEvent);

    return { getResultTestState: { isLoading, error }, resultTestData: data, mutateResultTest: mutate };
};
