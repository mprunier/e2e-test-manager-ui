/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestResultScreenshotResponse } from './TestResultScreenshotResponse';
import type { TestResultStatus } from './TestResultStatus';
import type { TestResultVariableResponse } from './TestResultVariableResponse';
import type { UUID } from './UUID';
import type { ZonedDateTime } from './ZonedDateTime';
export type TestResultResponse = {
    id: UUID;
    status: TestResultStatus;
    reference?: string;
    createdAt: ZonedDateTime;
    errorUrl?: string;
    duration: number;
    createdBy: string;
    screenshots?: Array<TestResultScreenshotResponse>;
    videoId?: UUID;
    variables?: Array<TestResultVariableResponse>;
};

