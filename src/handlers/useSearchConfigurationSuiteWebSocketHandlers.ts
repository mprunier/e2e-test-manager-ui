import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { ISearchConfigurationSuite } from "../interfaces/domain/ISearch.tsx";
import { IEvent, IRunCompletedEvent, IRunInProgressEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { IConfigurationSuiteOrTestPipelineDetails } from "../interfaces/domain/IConfigurationSuiteOrTestPipelineDetails.tsx";

export const useSearchConfigurationSuiteWebSocketHandlers = (mutate: KeyedMutator<ISearchConfigurationSuite>) => {
    const handleRunCompletedEvent = useCallback(
        async (data: IEvent) => {
            console.log("Run Completed Event - Update Suites and Tests", new Date().toLocaleString());
            const event = data as IRunCompletedEvent;
            if (event.isAllTests) {
                await mutate();
            } else if (event.configurationSuite) {
                await mutate((currentData) => {
                    if (!currentData) return;
                    const updatedData: ISearchConfigurationSuite = JSON.parse(JSON.stringify(currentData));
                    const index = updatedData.content.findIndex((suite) => suite.id === event.configurationSuite?.id);
                    if (index !== -1) {
                        if (event.configurationSuite) {
                            updatedData.content[index] = event.configurationSuite;
                        }
                    }
                    return updatedData;
                }, false);
            }
        },
        [mutate],
    );

    const handleRunInProgressEvent = useCallback(
        async (data: IEvent) => {
            const event = data as IRunInProgressEvent;

            console.log("Run In Progress Event - Update Suites and Tests", new Date().toLocaleString());

            await mutate((currentData) => {
                if (!currentData) return;
                const updatedData: ISearchConfigurationSuite = JSON.parse(JSON.stringify(currentData));

                if (event.isAllTests) {
                    const newPipeline: IConfigurationSuiteOrTestPipelineDetails = { isAllTests: true };
                    updatedData.content = updatedData.content.map((suite) => ({
                        ...suite,
                        pipelinesInProgress: [...suite.pipelinesInProgress, newPipeline],
                        tests: suite.tests.map((test) => ({
                            ...test,
                            pipelinesInProgress: [...test.pipelinesInProgress, newPipeline],
                        })),
                    }));
                } else if (event.configurationSuite) {
                    const index = updatedData.content.findIndex((suite) => suite.id === event.configurationSuite?.id);
                    if (index !== -1) {
                        updatedData.content[index] = event.configurationSuite;
                    }
                }

                return updatedData;
            }, false);
        },
        [mutate],
    );

    const handleSyncEnvironmentCompletedEvent = useCallback(async () => {
        console.log("Sync Environment Completed Event - Update Suites and Tests", new Date().toLocaleString());
        await mutate();
    }, [mutate]);

    return {
        handleCompleteRefreshEvent: handleRunCompletedEvent,
        handleRunInProgressEvent,
        handleSyncEnvironmentCompletedEvent,
    };
};
