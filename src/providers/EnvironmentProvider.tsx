import { FC, ReactNode, useCallback } from "react";
import { useStorage } from "../hooks/useStorage.ts";
import { IEnvironment, isIEnvironmentStored } from "../interfaces/domain/IEnvironment.ts";
import { EnvironmentContext } from "../contexts/EnvironmentContext.tsx";
import { STORAGE_KEY_SELECTED_ENVIRONMENT } from "../constants.ts";

interface IParams {
    children: ReactNode;
}

export const EnvironmentProvider: FC<IParams> = ({ children }) => {
    const {
        data: environment,
        saveInStorage,
        clearStorage: clearEnvironment,
    } = useStorage<IEnvironment>(STORAGE_KEY_SELECTED_ENVIRONMENT);

    const setEnvironment = useCallback(
        (newEnvironment: IEnvironment) => {
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
