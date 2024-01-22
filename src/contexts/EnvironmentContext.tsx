import { createContext } from "react";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";

export interface IEnvironmentContext {
    environment?: IEnvironment;
    clearEnvironment(): void;
    setEnvironment(environment: IEnvironment): void;
    shouldInitializeStorage: boolean;
}

export const EnvironmentContext = createContext<IEnvironmentContext>({
    // eslint-disable-next-line no-console
    setEnvironment: (environment: IEnvironment) => console.error(environment),
    // eslint-disable-next-line no-console
    clearEnvironment: () => console.error("Clear environment error"),
    shouldInitializeStorage: false,
});
