import type {
    CreateUpdateEnvironmentRequest,
    CreateUpdateEnvironmentVariableRequest,
    EnvironmentDetailsResponse,
    EnvironmentVariableResponse,
} from "../../api";

const buildEnvironmentVariablesForm = (
    environmentVariables: EnvironmentVariableResponse[],
): CreateUpdateEnvironmentVariableRequest[] => {
    return environmentVariables.map((environmentVariable) => {
        return {
            name: environmentVariable.name,
            value: environmentVariable.value,
            description: environmentVariable.description ?? "",
            isHidden: environmentVariable.isHidden,
        };
    });
};

export const buildEnvironmentForm = (environment?: EnvironmentDetailsResponse): CreateUpdateEnvironmentRequest => {
    return {
        description: environment?.description ?? "",
        branch: environment?.branch ?? "",
        token: environment?.token ?? "",
        projectId: environment?.projectId ?? "",
        maxParallelWorkers: environment?.maxParallelWorkers ?? 0,
        variables: environment?.variables ? buildEnvironmentVariablesForm(environment?.variables) : [],
    };
};
