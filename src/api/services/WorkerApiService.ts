/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RunRequest } from "../models/RunRequest";
import type { UUID } from "../models/UUID";
import type { WorkerUnitResponse } from "../models/WorkerUnitResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class WorkerApiService {
    /**
     * @param environmentId
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static run(environmentId: UUID, requestBody?: RunRequest): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/auth/workers",
            query: {
                environmentId: environmentId,
            },
            body: requestBody ?? {},
            mediaType: "application/json",
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param environmentId
     * @returns WorkerUnitResponse OK
     * @throws ApiError
     */
    public static getTypeAllWorkerUnits(environmentId: UUID): CancelablePromise<Array<WorkerUnitResponse>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/auth/workers/units/type-all",
            query: {
                environmentId: environmentId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
    /**
     * @param workerId
     * @returns void
     * @throws ApiError
     */
    public static cancel(workerId: UUID): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/auth/workers/{worker_id}/cancel",
            path: {
                worker_id: workerId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }
}
