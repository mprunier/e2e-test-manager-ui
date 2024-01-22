import { EConfigurationStatus } from "../../constants.ts";

import { IScreenshot } from "./IScreenshot.tsx";

interface ITestVariable {
    name: string;
    value: string;
}

export interface ITest {
    id: number;
    configurationFileTitle: string;
    configurationSuiteTitle: string;
    configurationTestTitle: string;
    status: EConfigurationStatus;
    reference: string;
    createdAt: string;
    errorUrl?: string;
    createdBy: string;
    variables?: ITestVariable[];
    duration?: number;
    screenshots?: IScreenshot[];
    hasVideo?: boolean;
    code?: string;
    errorStacktrace?: string;
    errorMessage?: string;
}
