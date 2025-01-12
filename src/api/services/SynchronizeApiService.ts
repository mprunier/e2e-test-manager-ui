/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SynchronizationErrorResponse } from '../models/SynchronizationErrorResponse';
import type { UUID } from '../models/UUID';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SynchronizeApiService {
    /**
     * @param environmentId
     * @returns any Created
     * @throws ApiError
     */
    public static synchronize(
        environmentId: UUID,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/synchronize',
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
     * @returns SynchronizationErrorResponse OK
     * @throws ApiError
     */
    public static getErrors(
        environmentId: UUID,
    ): CancelablePromise<Array<SynchronizationErrorResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/synchronize/errors',
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
