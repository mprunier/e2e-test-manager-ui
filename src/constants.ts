export const STORAGE_KEY_SELECTED_ENVIRONMENT = "ENVIRONMENT_SELECTED";

export const DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
export const DATE_FORMAT = "dd/MM/yyyy";
export const TIME_FORMAT = "HH:mm";
export const API_DATE_FORMAT = "yyyy-MM-dd";

export enum EConfigurationStatus {
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    SKIPPED = "SKIPPED",
    PARTIAL_SKIPPED = "PARTIAL_SKIPPED",
    CANCELED = "CANCELED",
    SYSTEM_ERROR = "SYSTEM_ERROR",
    NO_CORRESPONDING_TEST = "NO_CORRESPONDING_TEST",
    NO_REPORT_ERROR = "NO_REPORT_ERROR",
    UNKNOWN = "UNKNOWN",
}

export enum EConfigurationSynchronizationStatus {
    NEVER_SYNC = "NEVER_SYNC",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

export enum EDayOfWeek {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}
