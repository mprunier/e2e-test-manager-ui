import { EConfigurationStatus } from "../../constants.ts";
import { IPipelineDetails } from "./IPipelineDetails.tsx";

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
    pipelinesInProgress: IPipelineDetails[];
}
