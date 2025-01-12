/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigurationStatus } from './ConfigurationStatus';
import type { ConfigurationTestWithWorkerResponse } from './ConfigurationTestWithWorkerResponse';
import type { UUID } from './UUID';
import type { WorkerResponse } from './WorkerResponse';
import type { ZonedDateTime } from './ZonedDateTime';
export type ConfigurationSuiteWithWorkerResponse = {
    id: UUID;
    title: string;
    file: string;
    status: ConfigurationStatus;
    variables?: Array<string>;
    tags?: Array<string>;
    tests: Array<ConfigurationTestWithWorkerResponse>;
    lastPlayedAt?: ZonedDateTime;
    hasNewTest: boolean;
    group?: string;
    workers?: Array<WorkerResponse>;
};

