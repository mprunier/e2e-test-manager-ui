import { EConfigurationStatus } from "../../constants.ts";

export interface IEnvironmentVariable {
    id: number;
    name: string;
    defaultValue: string;
    description?: string;
    isHidden: boolean;
}

export interface IEnvironment {
    id: number;
    description: string;
    branch?: string;
    token?: string;
    projectId?: string;
    variables?: IEnvironmentVariable[];
    createdBy?: string;
    isEnabled?: boolean;
    isLocked?: boolean;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    schedulerStatus: EConfigurationStatus;
    isRunningAllTests: boolean;
    lastAllTestsError?: string;
    maxParallelTestNumber: number;
}

export function isIEnvironmentStored(object: unknown): object is IEnvironment {
    return Object.prototype.hasOwnProperty.call(object, "id");
}
