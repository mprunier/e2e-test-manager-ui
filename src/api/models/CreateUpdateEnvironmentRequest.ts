/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateEnvironmentVariableRequest } from './CreateUpdateEnvironmentVariableRequest';
export type CreateUpdateEnvironmentRequest = {
    description: string;
    projectId: string;
    token: string;
    branch: string;
    maxParallelWorkers: number;
    variables?: Array<CreateUpdateEnvironmentVariableRequest>;
};

