import {
    ConfigurationSuiteWithWorkerResponse,
    MetricsResponse,
    SynchronizationErrorResponse,
    WorkerType,
    type WorkerUnitResponse,
} from "../../api";

export enum EEventType {
    SYNCHRONIZATION_IS_IN_PROGRESS_EVENT = "SYNCHRONIZATION_IS_IN_PROGRESS_EVENT",
    SYNCHRONIZATION_COMPLETED_EVENT = "SYNCHRONIZATION_COMPLETED_EVENT",

    UPDATE_FINAL_METRICS_EVENT = "UPDATE_FINAL_METRICS_EVENT",

    TYPE_ALL_WORKER_UNITS_UPDATED_EVENT = "TYPE_ALL_WORKER_UNITS_UPDATED_EVENT",
    WORKER_UPDATED_EVENT = "WORKER_UPDATED_EVENT",
}

export interface IEvent {
    eventType: EEventType;
    environmentId: string;
}

export interface ISynchronizationInProgressEvent extends IEvent {}

export interface ISynchronizationCompletedEvent extends IEvent {
    syncErrors: SynchronizationErrorResponse[];
}

export interface IUpdateFinalMetricsEvent extends IEvent {
    metrics: MetricsResponse;
}

export interface IWorkerUpdatedEvent extends IEvent {
    status: "IN_PROGRESS" | "COMPLETED";
    workerType: WorkerType;
    configurationSuiteWithWorker: ConfigurationSuiteWithWorkerResponse;
    groupName: string;
}

export interface ITypeAllWorkerUnitsUpdatedEvent extends IEvent {
    workerUnits: WorkerUnitResponse[];
}
