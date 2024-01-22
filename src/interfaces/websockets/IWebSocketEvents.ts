import { IEnvironment } from "../domain/IEnvironment.ts";
import { IError } from "../domain/IError.tsx";
import { IMetrics } from "../domain/IMetrics.tsx";

export enum EEventType {
    SYNC_ENVIRONMENT_COMPLETED_EVENT = "SYNC_ENVIRONMENT_COMPLETED_EVENT",
    ALL_TESTS_RUN_IN_PROGRESS_EVENT = "ALL_TESTS_RUN_IN_PROGRESS_EVENT",
    ALL_TESTS_RUN_COMPLETED_EVENT = "ALL_TESTS_RUN_COMPLETED_EVENT",
    TEST_RUN_IN_PROGRESS_EVENT = "TEST_RUN_IN_PROGRESS_EVENT",
    TEST_RUN_COMPLETED_EVENT = "TEST_RUN_COMPLETED_EVENT",
    UPDATE_FINAL_METRICS_EVENT = "UPDATE_FINAL_METRICS_EVENT",
}

export interface IEvent {
    eventType: EEventType;
}

export interface ISyncEnvironmentCompletedEvent extends IEvent {
    syncErrors: IError[];
    environment: IEnvironment;
}

export interface IAllTestsRunInProgressEvent extends IEvent {}

export interface IAllTestsRunCompletedEvent extends IEvent {
    lastAllTestsError?: string;
}

export interface ITestRunInProgressEvent extends IEvent {
    suiteId?: number;
    testId?: number;
}

export interface ITestRunCompletedEvent extends IEvent {}

export interface IUpdateFinalMetricsEvent extends IEvent {
    metrics: IMetrics;
}
