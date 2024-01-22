import { IEnvironment, IEnvironmentVariable } from "../../interfaces/domain/IEnvironment.ts";
import {
    ICreateUpdateEnvironmentPayload,
    ICreateUpdateEnvironmentVariablePayload,
} from "../../interfaces/payloads/ICreateUpdateEnvironmentPayload.ts";

const buildEnvironmentVariablesForm = (
    environmentVariables: IEnvironmentVariable[],
): ICreateUpdateEnvironmentVariablePayload[] => {
    return environmentVariables.map((environmentVariable) => {
        return {
            name: environmentVariable.name,
            defaultValue: environmentVariable.defaultValue,
            description: environmentVariable.description ?? "",
            isHidden: environmentVariable.isHidden,
        };
    });
};

export const buildEnvironmentForm = (environment?: IEnvironment): ICreateUpdateEnvironmentPayload => {
    return {
        description: environment?.description ?? "",
        branch: environment?.branch ?? "",
        token: environment?.token ?? "",
        projectId: environment?.projectId ?? "",
        variables: environment?.variables ? buildEnvironmentVariablesForm(environment?.variables) : [],
    };
};
