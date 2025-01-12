/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GitlabWebHookRequest } from '../models/GitlabWebHookRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GitlabWebHookResourceService {
    /**
     * @param xGitlabEvent
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postGitlabWebhook(
        xGitlabEvent?: string,
        requestBody?: GitlabWebHookRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gitlab-webhook',
            headers: {
                'X-Gitlab-Event': xGitlabEvent,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
