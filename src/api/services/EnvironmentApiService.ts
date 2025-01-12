/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUpdateEnvironmentRequest } from '../models/CreateUpdateEnvironmentRequest';
import type { EnvironmentDetailsResponse } from '../models/EnvironmentDetailsResponse';
import type { EnvironmentResponse } from '../models/EnvironmentResponse';
import type { UUID } from '../models/UUID';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EnvironmentApiService {
    /**
     * @returns EnvironmentResponse OK
     * @throws ApiError
     */
    public static listAll(): CancelablePromise<Array<EnvironmentResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/environments',
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static create(
        requestBody?: CreateUpdateEnvironmentRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/environments',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param id
     * @returns EnvironmentDetailsResponse OK
     * @throws ApiError
     */
    public static get(
        id: UUID,
    ): CancelablePromise<EnvironmentDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/environments/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static update(
        id: UUID,
        requestBody?: CreateUpdateEnvironmentRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/environments/{id}',
            path: {
                'id': id,
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
