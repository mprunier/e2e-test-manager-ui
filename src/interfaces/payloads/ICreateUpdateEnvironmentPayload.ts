export interface ICreateUpdateEnvironmentVariablePayload {
    name: string;
    defaultValue: string;
    description?: string;
    isHidden: boolean;
}

export interface ICreateUpdateEnvironmentPayload {
    description: string;
    projectId: string;
    token: string;
    branch: string;
    maxParallelTestNumber: number;
    variables: ICreateUpdateEnvironmentVariablePayload[];
}
