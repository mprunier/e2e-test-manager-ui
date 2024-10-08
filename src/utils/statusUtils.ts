import { EConfigurationStatus } from "../constants.ts";

export const classNameBg = (status: EConfigurationStatus): string => {
    if (status === EConfigurationStatus.SUCCESS) {
        return "bg-green-50";
    }
    if (status === EConfigurationStatus.CANCELED) {
        return "bg-yellow-50";
    }
    if (status === EConfigurationStatus.SKIPPED) {
        return "bg-blue-100";
    }
    if (status === EConfigurationStatus.PARTIAL_SKIPPED) {
        return "bg-violet-100";
    }
    return "bg-red-50";
};

export const classNameStatus = (status: EConfigurationStatus): string => {
    if (status === EConfigurationStatus.SUCCESS) {
        return "bg-green-300";
    }
    if (status === EConfigurationStatus.CANCELED) {
        return "bg-yellow-300";
    }
    if (status === EConfigurationStatus.SKIPPED) {
        return "bg-blue-400";
    }
    if (status === EConfigurationStatus.PARTIAL_SKIPPED) {
        return "bg-violet-400";
    }
    if (status === EConfigurationStatus.NEW) {
        return "bg-gray-300";
    }
    return "bg-red-300";
};

export const getStatusViewer = (status: EConfigurationStatus): string => {
    if (status === EConfigurationStatus.IN_PROGRESS) {
        return "In Progress";
    }
    if (status === EConfigurationStatus.SUCCESS) {
        return "Success";
    }
    if (status === EConfigurationStatus.CANCELED) {
        return "Canceled";
    }
    if (status === EConfigurationStatus.SYSTEM_ERROR) {
        return "System Error";
    }
    if (status === EConfigurationStatus.NO_CORRESPONDING_TEST) {
        return "No Test";
    }
    if (status === EConfigurationStatus.NO_REPORT_ERROR) {
        return "No Report";
    }
    if (status === EConfigurationStatus.UNKNOWN) {
        return "Unknown";
    }
    if (status === EConfigurationStatus.NEW) {
        return "New";
    }
    if (status === EConfigurationStatus.SKIPPED) {
        return "Skipped";
    }
    if (status === EConfigurationStatus.PARTIAL_SKIPPED) {
        return "Partially Skipped";
    }
    return "Failed";
};
