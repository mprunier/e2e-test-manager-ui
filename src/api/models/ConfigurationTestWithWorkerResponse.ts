/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigurationStatus } from './ConfigurationStatus';
import type { UUID } from './UUID';
import type { WorkerResponse } from './WorkerResponse';
import type { ZonedDateTime } from './ZonedDateTime';
export type ConfigurationTestWithWorkerResponse = {
    id: UUID;
    title: string;
    status: ConfigurationStatus;
    variables?: Array<string>;
    tags?: Array<string>;
    lastPlayedAt?: ZonedDateTime;
    workers?: Array<WorkerResponse>;
};

