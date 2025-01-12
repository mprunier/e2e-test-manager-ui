/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetricsResponse } from '../models/MetricsResponse';
import type { UUID } from '../models/UUID';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MetricsApiService {
    /**
     * @param environmentId
     * @param since
     * @returns MetricsResponse OK
     * @throws ApiError
     */
    public static getAll(
        environmentId: UUID,
        since: string,
    ): CancelablePromise<Array<MetricsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/metrics/history',
            query: {
                'environmentId': environmentId,
                'since': since,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param environmentId
     * @returns MetricsResponse OK
     * @throws ApiError
     */
    public static getLast(
        environmentId: UUID,
    ): CancelablePromise<MetricsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/metrics/last',
            query: {
                'environmentId': environmentId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
}
