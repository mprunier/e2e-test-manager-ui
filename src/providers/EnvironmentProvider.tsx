import { FC, ReactNode, useCallback } from "react";
import { useStorage } from "../hooks/useStorage.ts";
import { EnvironmentContext } from "../contexts/EnvironmentContext.tsx";
import { STORAGE_KEY_SELECTED_ENVIRONMENT } from "../constants.ts";
import type { EnvironmentResponse } from "../api";

interface IParams {
    children: ReactNode;
}

function isIEnvironmentStored(object: unknown): object is EnvironmentResponse {
    return Object.prototype.hasOwnProperty.call(object, "id");
}

export const EnvironmentProvider: FC<IParams> = ({ children }) => {
    const {
        data: environment,
        saveInStorage,
        clearStorage: clearEnvironment,
    } = useStorage<EnvironmentResponse>(STORAGE_KEY_SELECTED_ENVIRONMENT);

    const setEnvironment = useCallback(
        (newEnvironment: EnvironmentResponse) => {
            localStorage.setItem(STORAGE_KEY_SELECTED_ENVIRONMENT, JSON.stringify(newEnvironment));
            saveInStorage(newEnvironment);
        },
        [saveInStorage],
    );

    return (
        <EnvironmentContext.Provider
            value={{
                environment,
                clearEnvironment,
                setEnvironment,
                shouldInitializeStorage: !isIEnvironmentStored(environment),
            }}
        >
            {children}
        </EnvironmentContext.Provider>
    );
};
