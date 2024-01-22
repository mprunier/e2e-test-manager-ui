import { FC, ReactNode, useCallback, useEffect } from "react";
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
            saveInStorage(newEnvironment);
        },
        [saveInStorage],
    );

    const handleEnvironmentChange = useCallback(
        (storageEvent: StorageEvent) => {
            if (storageEvent.key === STORAGE_KEY_SELECTED_ENVIRONMENT && storageEvent.newValue !== null) {
                try {
                    const newEnvironment = JSON.parse(storageEvent.newValue);
                    setEnvironment(newEnvironment);
                } catch (error) {
                    console.error("Error parsing environment:", error);
                }
            }
        },
        [setEnvironment],
    );

    useEffect(() => {
        window.addEventListener("storage", handleEnvironmentChange);
        return () => window.removeEventListener("storage", handleEnvironmentChange);
    }, [handleEnvironmentChange]);

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
