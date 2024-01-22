import { IConfigurationSuite } from "./IConfigurationSuite.tsx";

export interface ISearchConfigurationSuite {
    content: IConfigurationSuite[];
    currentPage: number;
    totalPages: number;
    size: number;
    totalElements: number;
}

export interface ISearchConfigurationForm {
    configurationTestId?: string;
    configurationSuiteId?: string;
    status?: string;
}
