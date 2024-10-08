import { EConfigurationSuiteSortField, EConfigurationSuiteSortOrder } from "../domain/IConfigurationSuite.tsx";

export interface StoredPaginationSettings {
    page: number;
    size: number;
    sortField: EConfigurationSuiteSortField;
    sortOrder: EConfigurationSuiteSortOrder;
}

export interface FormValues extends StoredPaginationSettings {
    file: string;
    configurationSuiteId: string;
    configurationTestId: string;
    tag: string;
    status: string;
    allNotSuccess: boolean;
}

export const STORAGE_KEY_PAGINATION = "paginationSettings";

export function formValuesToRecord(formValues: FormValues): Record<string, unknown> {
    return Object.keys(formValues).reduce(
        (acc, key) => {
            acc[key] = formValues[key as keyof FormValues];
            return acc;
        },
        {} as Record<string, unknown>,
    );
}
