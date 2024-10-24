import { IEnvironment } from "../domain/IEnvironment.ts";
import { IError } from "../domain/IError.tsx";
import { IMetrics } from "../domain/IMetrics.tsx";
import { IConfigurationSuite } from "../domain/IConfigurationSuite.tsx";
import { IPipeline } from "../domain/IPipeline.tsx";

export enum EEventType {
    SYNC_ENVIRONMENT_COMPLETED_EVENT = "SYNC_ENVIRONMENT_COMPLETED_EVENT",
    UPDATE_FINAL_METRICS_EVENT = "UPDATE_FINAL_METRICS_EVENT",

    UPDATE_ALL_TESTS_PIPELINES_COMPLETED = "UPDATE_ALL_TESTS_PIPELINES_COMPLETED",

    RUN_COMPLETED_EVENT = "RUN_COMPLETED_EVENT",
    RUN_IN_PROGRESS_EVENT = "RUN_IN_PROGRESS_EVENT",
}

export interface IEvent {
    eventType: EEventType;
}

export interface ISyncEnvironmentCompletedEvent extends IEvent {
    syncErrors: IError[];
    environment: IEnvironment;
}

export interface IUpdateFinalMetricsEvent extends IEvent {
    metrics: IMetrics;
}

export interface IRunInProgressEvent extends IEvent {
    isAllTests?: boolean;
    configurationSuite?: IConfigurationSuite;
}

export interface IRunCompletedEvent extends IEvent {
    isAllTests?: boolean;
    configurationSuite?: IConfigurationSuite;
}

export interface IUpdateAllTestsPipelinesEvent extends IEvent {
    pipelines: IPipeline[];
}
