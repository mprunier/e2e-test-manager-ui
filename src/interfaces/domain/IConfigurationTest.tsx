import { EConfigurationStatus } from "../../constants.ts";

export interface IConfigurationTest {
    id: number;
    title: string;
    status: EConfigurationStatus;
    suiteId?: number;
    suiteTitle?: string;
    path?: string;
    variables?: string[];
    tags?: string[];
    lastPlayedAt?: Date;
}
