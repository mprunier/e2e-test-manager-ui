import { createContext } from "react";
import type { EnvironmentResponse } from "../api";

export interface IEnvironmentContext {
    environment?: EnvironmentResponse;
    clearEnvironment(): void;
    setEnvironment(environment: EnvironmentResponse): void;
    shouldInitializeStorage: boolean;
}

export const EnvironmentContext = createContext<IEnvironmentContext>({
    // eslint-disable-next-line no-console
    setEnvironment: (environment: EnvironmentResponse) => console.error(environment),
    // eslint-disable-next-line no-console
    clearEnvironment: () => console.error("Clear environment error"),
    shouldInitializeStorage: false,
});
