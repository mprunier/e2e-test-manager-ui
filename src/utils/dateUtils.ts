import { format } from "date-fns/fp";
import { API_DATE_FORMAT, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "../constants.ts";

export const formatDate = format(DATE_FORMAT);

export const formatDateTime = format(DATE_TIME_FORMAT);

export const formatApiDate = format(API_DATE_FORMAT);

export const formatTime = format(TIME_FORMAT);

export const convertToISOString = (time: string): string => {
    const currentDate = new Date();
    const [hours, minutes] = time.split(":");
    currentDate.setHours(parseInt(hours), parseInt(minutes));
    return currentDate.toISOString();
};
