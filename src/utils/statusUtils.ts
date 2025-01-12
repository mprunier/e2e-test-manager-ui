import { ConfigurationStatus, TestResultStatus } from "../api";

export const classNameBg = (status: TestResultStatus): string => {
    if (status === TestResultStatus.SUCCESS) {
        return "bg-green-50";
    }
    if (status === TestResultStatus.CANCELED) {
        return "bg-yellow-50";
    }
    if (status === TestResultStatus.SKIPPED) {
        return "bg-blue-100";
    }
    if (status === TestResultStatus.PARTIAL_SKIPPED) {
        return "bg-violet-100";
    }
    return "bg-red-50";
};

export const classNameStatus = (status: TestResultStatus | ConfigurationStatus): string => {
    if (status === TestResultStatus.SUCCESS) {
        return "bg-green-300";
    }
    if (status === TestResultStatus.CANCELED) {
        return "bg-yellow-300";
    }
    if (status === TestResultStatus.SKIPPED) {
        return "bg-blue-400";
    }
    if (status === TestResultStatus.PARTIAL_SKIPPED) {
        return "bg-violet-400";
    }
    if (status === ConfigurationStatus.NEW) {
        return "bg-gray-300";
    }
    return "bg-red-300";
};

export const getStatusViewer = (status: TestResultStatus | ConfigurationStatus): string => {
    if (status === ConfigurationStatus.NEW) {
        return "New";
    }
    if (status === ConfigurationStatus.IN_PROGRESS) {
        return "In Progress";
    }
    if (status === TestResultStatus.SUCCESS) {
        return "Success";
    }
    if (status === TestResultStatus.CANCELED) {
        return "Canceled";
    }
    if (status === TestResultStatus.SYSTEM_ERROR) {
        return "System Error";
    }
    if (status === TestResultStatus.NO_CORRESPONDING_TEST) {
        return "No Test";
    }
    if (status === TestResultStatus.NO_REPORT_ERROR) {
        return "No Report";
    }
    if (status === TestResultStatus.UNKNOWN) {
        return "Unknown";
    }
    if (status === TestResultStatus.SKIPPED) {
        return "Skipped";
    }
    if (status === TestResultStatus.PARTIAL_SKIPPED) {
        return "Partially Skipped";
    }
    return "Failed";
};
