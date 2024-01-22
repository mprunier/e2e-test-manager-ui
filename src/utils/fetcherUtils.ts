import { keycloakUtils } from "./Keycloak/keycloakUtils.ts";

export interface IError {
    status: number;
    title: string;
    detail: string;
    description?: string;
}

export enum EContentType {
    JSON = "application/json",
    MERGE_PATCH = "application/merge-patch+json",
    FORM_DATA = "multipart/form-data",
}

export type specialBody = { body?: any };

export type useFetchSpecialType = { isSecured?: boolean; forwardError?: boolean };

export type specialRequestInitCaller = Pick<RequestInit, "method" | "headers"> & specialBody & useFetchSpecialType;

const handleBlob = [
    "image",
    "pdf",
    "msword",
    "officedocument",
    "csv",
    "sheet",
    "excel",
    "powerpoint",
    "html",
    "zip",
    "octet-stream",
];

export const handleResponse = async (response: Response): Promise<any> => {
    let parsedResponse: any;

    try {
        const contentType = response.headers.get("content-type");

        // 201, 204, etc.. is success but no content type
        // Add hardcoded 204 for MNP
        if (response.ok && (contentType === null || response.status === 204)) {
            return true;
        }

        if (contentType === null) {
            throw new Error("Content type is null");
        } else if (handleBlob.some((type) => contentType.includes(type))) {
            parsedResponse = response.blob();
        } else if (contentType.includes("json")) {
            parsedResponse = await response.json();
        } else if (contentType.includes("text")) {
            parsedResponse = await response.text();
        } else {
            throw new Error(`Not handle content type : ${contentType}`);
        }
    } catch {
        // eslint-disable-next-line no-throw-literal
        throw {
            title: "An error occurred, please try again in a few minutes.",
            detail: "An error occurred, please try again in a few minutes.",
            status: response.status,
        };
    }

    if (response.ok) {
        return parsedResponse;
    }

    // If response body was successfully parsed but status is not 2XX
    throw parsedResponse;
};

export const httpRequestInit = async (options: specialRequestInitCaller, isSecured = false): Promise<RequestInit> => {
    const payload: RequestInit = options;
    payload.headers = new Headers(options.headers);
    const contentTypeHeaderName = "Content-Type";

    if (isSecured) {
        try {
            await keycloakUtils.updateToken();
        } catch {
            keycloakUtils.logout({ redirectUri: window.location.origin });
        }

        const token = keycloakUtils.getToken();
        payload.headers.append("Authorization", `Bearer ${token}`);
    }
    if (options.body) {
        if (!payload.headers.get(contentTypeHeaderName)) {
            payload.headers.append(
                contentTypeHeaderName,
                options.method === "PATCH" ? EContentType.MERGE_PATCH : EContentType.JSON,
            );
        }
        if (payload.headers.get(contentTypeHeaderName)?.includes(EContentType.FORM_DATA)) {
            // Remove 'Content-Type' header to allow browser to add along with the correct 'boundary'
            payload.headers.delete("Content-Type");
        }
        if (payload.headers.get(contentTypeHeaderName)?.includes("json")) {
            payload.body = JSON.stringify(options.body);
        }
    }

    return payload;
};

export const getErrorResponseToState = (apiErrorResponse: any): IError => {
    return {
        status: apiErrorResponse.status || 500,
        title: apiErrorResponse.title || "An error occurred, please try again in a few minutes.",
        detail: apiErrorResponse.detail || "An error occurred, please try again in a few minutes.",
        description: apiErrorResponse.description || "",
    };
};

export interface IFetchOptions extends specialRequestInitCaller {
    isSecured?: boolean;
    mapper?(response: any): any;
}

export const initFetcher = () => {
    return async <T = any>(url: string, options?: IFetchOptions): Promise<T> => {
        try {
            const initRequest = { ...options };
            const requestOptions = await httpRequestInit(initRequest, options?.isSecured ?? false);

            const response = await fetch(url, requestOptions);
            const parsedResponse = (await handleResponse(response)) as T;

            return parsedResponse && options?.mapper ? options.mapper(parsedResponse) : parsedResponse;
        } catch (apiErrorResponse) {
            throw getErrorResponseToState(apiErrorResponse);
        }
    };
};

export const fetcher = initFetcher();
