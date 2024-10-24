import { fetcher, IFetchOptions } from "../utils/fetcherUtils.ts";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { ISearchConfigurationSuite } from "../interfaces/domain/ISearch.tsx";
import { IError } from "../interfaces/domain/IError.tsx";
import { IConfigurationTest } from "../interfaces/domain/IConfigurationTest.tsx";
import { IConfigurationSuite } from "../interfaces/domain/IConfigurationSuite.tsx";
import { IConfigurationScheduler } from "../interfaces/domain/IConfigurationScheduler.tsx";
import { IMetrics } from "../interfaces/domain/IMetrics.tsx";
import { ITest } from "../interfaces/domain/ITest.tsx";
import { IPipeline } from "../interfaces/domain/IPipeline.tsx";

const api = `${process.env.API_URL}`;

// Enviros
export const getEnvironmentApiRoute = (id: number, options: IFetchOptions = {}) =>
    fetcher<IEnvironment>(`${api}/environments/${id}`, {
        ...options,
    });

export const getEnvironmentsApiRoute = (all?: boolean, options: IFetchOptions = {}) =>
    fetcher<IEnvironment[]>(`${api}/environments${all ? `?all=${all}` : ``}`, {
        ...options,
    });

export const getEnvironmentErrorsApiRoutes = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<IError[]>(`${api}/environments/${environmentId}/errors`, {
        ...options,
    });

// Configs
export const getSuiteSearchApiRoute = (query: string, options: IFetchOptions = {}) =>
    fetcher<ISearchConfigurationSuite>(`${api}/configurations/search/suites?${query}`, {
        ...options,
    });

export const getSuitesApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<IConfigurationSuite[]>(`${api}/configurations/suites?environmentId=${environmentId}`, {
        ...options,
    });

export const getTestsApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<IConfigurationTest[]>(`${api}/configurations/tests?environmentId=${environmentId}`, {
        ...options,
    });

export const getFilesApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<string[]>(`${api}/configurations/files?environmentId=${environmentId}`, {
        ...options,
    });

export const getTagsApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<string[]>(`${api}/configurations/tags?environmentId=${environmentId}`, {
        ...options,
    });

// Tests
export const getResultTestApiRoute = (configurationTestId: number, options: IFetchOptions = {}) =>
    fetcher<ITest[]>(`${api}/tests?configurationTestId=${configurationTestId}`, {
        ...options,
    });

export const getTestDetailsApiRoute = (testId: number, options: IFetchOptions = {}) =>
    fetcher<ITest>(`${api}/tests/${testId}`, {
        ...options,
    });

// Medias
export const getScreenshotsApiRoute = (id: number) => `${api}/medias/screenshots/${id}`;

export const getVideosApiRoute = (id: number) => `${api}/medias/videos/${id}`;

// Scheduler
export const getConfigurationSchedulerApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<IConfigurationScheduler>(`${api}/configurations/schedulers?environmentId=${environmentId}`, {
        ...options,
    });

// Metrics
export const getFinalMetricsApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<IMetrics>(`${api}/metrics?environmentId=${environmentId}`, {
        ...options,
    });

export const getMetricsHistoryApiRoute = (environmentId: number, periodDate: string, options: IFetchOptions = {}) =>
    fetcher<IMetrics[]>(`${api}/metrics/history?environmentId=${environmentId}&=since=${periodDate}`, {
        ...options,
    });

// Pipelines
export const getAllTestsPipelinesApiRoute = (environmentId: number, options: IFetchOptions = {}) =>
    fetcher<IPipeline[]>(`${api}/pipelines/all-tests?environmentId=${environmentId}`, {
        ...options,
    });
