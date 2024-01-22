import { fetcher, IFetchOptions } from "../utils/fetcherUtils.ts";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { IRunTestOrSuitePayload } from "../interfaces/payloads/IRunTestOrSuitePayload.tsx";
import { ICreateUpdateEnvironmentPayload } from "../interfaces/payloads/ICreateUpdateEnvironmentPayload.ts";
import { IUpdateConfigurationSchedulerPayload } from "../interfaces/payloads/IUpdateConfigurationSchedulerPayload.tsx";

const api = `${process.env.API_URL}`;

// Enviros
export const createEnvironmentApiRoute = (payload: ICreateUpdateEnvironmentPayload, options: IFetchOptions = {}) =>
    fetcher<IEnvironment>(`${api}/auth/environments`, {
        method: "POST",
        body: payload,
        ...options,
        isSecured: true,
    });

export const putEnvironmentApiRoute = (
    id: number,
    payload: ICreateUpdateEnvironmentPayload,
    options: IFetchOptions = {},
) =>
    fetcher<void>(`${api}/auth/environments/${id}`, {
        method: "PUT",
        body: payload,
        ...options,
        isSecured: true,
    });

// Configs
export const postSynchronizeApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<void>(`${api}/auth/configurations/synchronizations?environmentId=${environmentId}`, {
        method: "POST",
        ...options,
        isSecured: true,
    });

// Tests
export const postRunApiRoute = (environmentId: number, payload: IRunTestOrSuitePayload, options: IFetchOptions = {}) =>
    fetcher<void>(`${api}/auth/tests?environmentId=${environmentId}`, {
        method: "POST",
        body: payload,
        ...options,
        isSecured: true,
    });

// Scheduler
export const postRunSchedulerApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<void>(`${api}/auth/scheduler?environmentId=${environmentId}`, {
        method: "POST",
        ...options,
        isSecured: true,
    });

export const putUpdateSchedulerApiRoute = (
    environmentId: number,
    payload: IUpdateConfigurationSchedulerPayload,
    options: IFetchOptions = {},
) =>
    fetcher<void>(`${api}/auth/configurations/schedulers?environmentId=${environmentId}`, {
        method: "PUT",
        body: payload,
        ...options,
        isSecured: true,
    });
