/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestResultErrorDetailsResponse } from "../models/TestResultErrorDetailsResponse";
import type { TestResultResponse } from "../models/TestResultResponse";
import type { UUID } from "../models/UUID";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TestResultApiService {
    /**
     * @param testConfigurationId
     * @returns TestResultResponse OK
     * @throws ApiError
     */
    public static getAll(testConfigurationId: UUID): CancelablePromise<Array<TestResultResponse>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/auth/test-results",
            query: {
                testConfigurationId: testConfigurationId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param id
     * @returns binary
     * @throws ApiError
     */
    public static downloadScreenshot(id: UUID): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/auth/test-results/medias/screenshots/{id}",
            path: {
                id: id,
            },
            headers: {
                Accept: "image/png",
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param id
     * @returns binary Screenshot trouvé
     * @throws ApiError
     */
    public static downloadVideo(id: UUID): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/auth/test-results/medias/videos/{id}",
            path: {
                id: id,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param id
     * @returns TestResultErrorDetailsResponse OK
     * @throws ApiError
     */
    public static getErrorDetails(id: UUID): CancelablePromise<TestResultErrorDetailsResponse> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/auth/test-results/{id}/error-details",
            path: {
                id: id,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
}
