import { EDayOfWeek } from "../../constants.ts";

export interface IUpdateConfigurationSchedulerPayload {
    isEnabled: boolean;
    scheduledTime: string;
    daysOfWeek: EDayOfWeek[];
}
