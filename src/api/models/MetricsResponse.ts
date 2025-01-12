/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetricsType } from './MetricsType';
import type { ZonedDateTime } from './ZonedDateTime';
export type MetricsResponse = {
    at: ZonedDateTime;
    type: MetricsType;
    suites: number;
    tests: number;
    passes: number;
    failures: number;
    skipped: number;
    passPercent: number;
    lastAllTestsRunAt: ZonedDateTime;
};

