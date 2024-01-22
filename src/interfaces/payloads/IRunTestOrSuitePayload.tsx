interface IRunVariablePayload {
    name: string;
    value: string;
}

export interface IRunTestOrSuitePayload {
    configurationTestId?: number;
    configurationSuiteId?: number;
    variables?: IRunVariablePayload[];
}
