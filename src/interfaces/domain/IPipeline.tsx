import { EPipelineStatus } from "../../constants.ts";

export interface IPipeline {
    id?: string;
    status?: EPipelineStatus;
    statusDescription?: string;
    filesFilter?: string[];
}
