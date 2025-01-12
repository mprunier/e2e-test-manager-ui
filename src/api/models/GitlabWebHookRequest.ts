/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GitlabWebHookCommitRequest } from './GitlabWebHookCommitRequest';
export type GitlabWebHookRequest = {
    ref?: string;
    project_id?: string;
    pipeline_id?: string;
    build_id?: string;
    build_finished_at?: string;
    build_status?: string;
    commits?: Array<GitlabWebHookCommitRequest>;
};

