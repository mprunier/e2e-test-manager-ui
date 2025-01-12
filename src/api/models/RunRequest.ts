/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RunVariableRequest } from './RunVariableRequest';
import type { UUID } from './UUID';
export type RunRequest = {
    fileName?: string;
    configurationSuiteId?: UUID;
    configurationTestId?: UUID;
    tag?: string;
    groupName?: string;
    variables?: Array<RunVariableRequest>;
};

