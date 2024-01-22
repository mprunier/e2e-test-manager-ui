import { SWRConfiguration } from "swr";

export interface IConfigSwr extends SWRConfiguration {
    provider?: () => Map<any, any>;
}
