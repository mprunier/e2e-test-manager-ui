/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnvironmentVariableResponse } from './EnvironmentVariableResponse';
import type { UUID } from './UUID';
import type { ZonedDateTime } from './ZonedDateTime';
export type EnvironmentDetailsResponse = {
    id: UUID;
    description?: string;
    projectId: string;
    branch: string;
    token: string;
    isEnabled: boolean;
    maxParallelWorkers: number;
    synchronizationInProgress: boolean;
    variables?: Array<EnvironmentVariableResponse>;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: ZonedDateTime;
    updatedAt?: ZonedDateTime;
};

