/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResponseConfigurationSuiteWithWorkerResponse } from "../models/PaginatedResponseConfigurationSuiteWithWorkerResponse";
import type { SearchCriteriaResponse } from "../models/SearchCriteriaResponse";
import type { UUID } from "../models/UUID";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class SuiteApiService {
    /**
     * @returns PaginatedResponseConfigurationSuiteWithWorkerResponse OK
     * @throws ApiError
     * @param query
     */
    public static searchSuites(
        query: string,
    ): CancelablePromise<PaginatedResponseConfigurationSuiteWithWorkerResponse> {
        return __request(OpenAPI, {
            method: "GET",
            url: `/auth/suites/search?${query}`,
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param environmentId
     * @returns SearchCriteriaResponse OK
     * @throws ApiError
     */
    public static getSearchCriteria(environmentId: UUID): CancelablePromise<SearchCriteriaResponse> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/auth/suites/search/criteria",
            query: {
                environmentId: environmentId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
}
