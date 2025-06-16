import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { IEvent, IWorkerUpdatedEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { PaginatedResponseConfigurationSuiteWithWorkerResponse, type WorkerResponse, WorkerType } from "../api";
import { formatInTimeZone } from "date-fns-tz";

export const useSearchConfigurationSuiteWebSocketHandlers = (
    mutate: KeyedMutator<PaginatedResponseConfigurationSuiteWithWorkerResponse>,
) => {
    const handleWorkerUpdatedEvent = useCallback(
        async (data: IEvent) => {
            const event = data as IWorkerUpdatedEvent;
            if (event.status === "IN_PROGRESS") {
                console.log("Worker In Progress Event - Update Suites and Tests");
                await mutate((currentData) => {
                    if (!currentData) return;
                    const updatedData: PaginatedResponseConfigurationSuiteWithWorkerResponse = JSON.parse(
                        JSON.stringify(currentData),
                    );
                    if (event.workerType === WorkerType.ALL) {
                        const newWorker: WorkerResponse = {
                            id: "unknown",
                            createdAt: formatInTimeZone(
                                new Date(),
                                Intl.DateTimeFormat().resolvedOptions().timeZone,
                                "yyyy-MM-dd'T'HH:mm:ssXXX",
                            ),
                            createdBy: "You",
                            type: WorkerType.ALL,
                        };
                        updatedData.content = updatedData.content.map((suite) => ({
                            ...suite,
                            workers: [...(suite.workers || []), newWorker],
                            tests: suite.tests.map((test) => ({
                                ...test,
                                workers: [...(test.workers || []), newWorker],
                            })),
                        }));
                    } else if (event.workerType === WorkerType.GROUP) {
                        const newWorker: WorkerResponse = {
                            id: "unknown",
                            createdAt: formatInTimeZone(
                                new Date(),
                                Intl.DateTimeFormat().resolvedOptions().timeZone,
                                "yyyy-MM-dd'T'HH:mm:ssXXX",
                            ),
                            createdBy: "You",
                            type: WorkerType.GROUP,
                        };
                        updatedData.content = updatedData.content.map((suite) => {
                            if (suite.group === event.configurationSuiteWithWorker?.group) {
                                return {
                                    ...suite,
                                    workers: [...(suite.workers || []), newWorker],
                                    tests: suite.tests.map((test) => ({
                                        ...test,
                                        workers: [...(test.workers || []), newWorker],
                                    })),
                                };
                            }
                            return suite;
                        });
                    } else if (event.workerType === WorkerType.SUITE || event.workerType === WorkerType.TEST) {
                        const index = updatedData.content.findIndex(
                            (suite) => suite.id === event.configurationSuiteWithWorker?.id,
                        );
                        if (index !== -1) {
                            updatedData.content[index] = event.configurationSuiteWithWorker;
                        }
                    } else {
                        mutate();
                        return;
                    }

                    return updatedData;
                }, false);
            }

            if (event.status === "COMPLETED") {
                console.log("Worker Completed Event - Update Suites and Tests");
                if (event.workerType === WorkerType.SUITE || event.workerType === WorkerType.TEST) {
                    await mutate((currentData) => {
                        if (!currentData) return;
                        const updatedData: PaginatedResponseConfigurationSuiteWithWorkerResponse = JSON.parse(
                            JSON.stringify(currentData),
                        );
                        const index = updatedData.content.findIndex(
                            (suite) => suite.id === event.configurationSuiteWithWorker?.id,
                        );
                        if (index !== -1) {
                            if (event.configurationSuiteWithWorker) {
                                updatedData.content[index] = event.configurationSuiteWithWorker;
                            }
                        }
                        return updatedData;
                    }, false);
                } else if (event.workerType === WorkerType.GROUP) {
                    await mutate((currentData) => {
                        if (!currentData) return;
                        const updatedData: PaginatedResponseConfigurationSuiteWithWorkerResponse = JSON.parse(
                            JSON.stringify(currentData),
                        );
                        updatedData.content = updatedData.content.map((suite) => {
                            if (suite.group === event.configurationSuiteWithWorker?.group) {
                                return {
                                    ...suite,
                                    workers: event.configurationSuiteWithWorker?.workers || suite.workers,
                                };
                            }
                            return suite;
                        });
                        return updatedData;
                    }, false);
                } else {
                    await mutate();
                }
            }
        },
        [mutate],
    );

    const handleSynchronizationCompletedEvent = useCallback(async () => {
        console.log("Synchronization Completed Event - Update Suites and Tests");
        await mutate();
    }, [mutate]);

    return {
        handleWorkerUpdatedEvent,
        handleSynchronizationCompletedEvent,
    };
};
