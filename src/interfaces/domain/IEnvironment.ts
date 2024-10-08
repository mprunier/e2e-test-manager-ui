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
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isLocked?: boolean;
    maxParallelTestNumber: number;
}

export function isIEnvironmentStored(object: unknown): object is IEnvironment {
    return Object.prototype.hasOwnProperty.call(object, "id");
}
