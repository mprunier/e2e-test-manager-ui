import { EConfigurationStatus } from "../../constants.ts";
import { IConfigurationTest } from "./IConfigurationTest.tsx";

export interface IConfigurationSuite {
    id: number;
    title: string;
    file: string;
    status: EConfigurationStatus;
    tests: IConfigurationTest[];
    variables?: string[];
    lastPlayedAt?: Date;
    hasNewTest: boolean;
}

export enum EConfigurationSuiteSortField {
    TITLE = "title",
    FILE = "file",
    LAST_PLAYED_AT = "lastPlayedAt",
}

export enum EConfigurationSuiteSortOrder {
    ASC = "asc",
    DESC = "desc",
}
