/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DayOfWeek } from './DayOfWeek';
export type UpdateSchedulerRequest = {
    isEnabled: boolean;
    hour: number;
    minute: number;
    daysOfWeek?: Array<DayOfWeek>;
};

