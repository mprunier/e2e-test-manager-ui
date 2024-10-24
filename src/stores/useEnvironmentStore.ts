import { create } from "zustand";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { IError } from "../utils/fetcherUtils.ts";

interface IEnvironmentStore {
    isLoading: boolean;
    setLoading: (value: boolean) => void;
    error: IError | undefined;
    setError: (value: IError | undefined) => void;
    environmentData: IEnvironment | undefined;
    setEnvironmentData: (environmentData: IEnvironment | undefined) => void;
}

// TODO virer ce store qui ne fait plus sens, on en a plus besoin dans la partie search
export const useEnvironmentStore = create<IEnvironmentStore>((set) => ({
    isLoading: false,
    setLoading: (value) => set(() => ({ isLoading: value })),
    error: undefined,
    setError: (value) => set(() => ({ error: value })),
    environmentData: undefined,
    setEnvironmentData: (value) => set(() => ({ environmentData: value })),
}));
