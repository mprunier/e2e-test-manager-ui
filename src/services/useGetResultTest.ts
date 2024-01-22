import { useCallback } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { getResultTestApiRoute } from "../endpoints/publicEndpoints.ts";
import { EEventType, IEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useWebSocketEvent } from "../hooks/useWebSocketEvent.tsx";
import { ITest } from "../interfaces/domain/ITest.tsx";

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

    const handleCompleteRefreshEvent = useCallback(
        async (event: IEvent) => {
            console.log(`${event.eventType} Event - Complete Refresh`);
            await mutate();
        },
        [mutate],
    );
    useWebSocketEvent(EEventType.ALL_TESTS_RUN_IN_PROGRESS_EVENT, handleCompleteRefreshEvent);
    useWebSocketEvent(EEventType.ALL_TESTS_RUN_COMPLETED_EVENT, handleCompleteRefreshEvent);
    useWebSocketEvent(EEventType.TEST_RUN_IN_PROGRESS_EVENT, handleCompleteRefreshEvent);
    useWebSocketEvent(EEventType.TEST_RUN_COMPLETED_EVENT, handleCompleteRefreshEvent);

    return { getResultTestState: { isLoading, error }, resultTestData: data, mutateResultTest: mutate };
};
