import { EDayOfWeek } from "../../constants.ts";

export interface IConfigurationScheduler {
    isEnabled: boolean;
    scheduledTime: string;
    daysOfWeek: EDayOfWeek[];
}
