/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UUID } from './UUID';
import type { WorkerType } from './WorkerType';
import type { ZonedDateTime } from './ZonedDateTime';
export type WorkerResponse = {
    id: UUID;
    createdBy: string;
    createdAt: ZonedDateTime;
    type: WorkerType;
};

