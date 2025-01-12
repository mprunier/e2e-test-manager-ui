/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SchedulerResponse } from '../models/SchedulerResponse';
import type { UpdateSchedulerRequest } from '../models/UpdateSchedulerRequest';
import type { UUID } from '../models/UUID';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SchedulerApiService {
    /**
     * @param environmentId
     * @returns SchedulerResponse OK
     * @throws ApiError
     */
    public static get(
        environmentId: UUID,
    ): CancelablePromise<SchedulerResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/schedulers',
            query: {
                'environmentId': environmentId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param environmentId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static update(
        environmentId: UUID,
        requestBody?: UpdateSchedulerRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/schedulers',
            query: {
                'environmentId': environmentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
}
