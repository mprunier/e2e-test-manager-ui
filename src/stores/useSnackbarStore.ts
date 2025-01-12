import { create } from "zustand";

export type SnackbarMessageType = "success" | "error" | "info" | "warning" | undefined;

export interface ISetSnackbarMessage {
    (setSnackbarMessage: string | undefined, snackbarMessageType: SnackbarMessageType | undefined): void;
}

interface SnackbarState {
    snackbarMessage: string | undefined;
    snackbarMessageType: SnackbarMessageType;
    setSnackbarMessage: ISetSnackbarMessage;
    clearSnackbarMessage: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
    snackbarMessage: undefined,
    snackbarMessageType: undefined,
    setSnackbarMessage: (snackbarMessage: string | undefined, snackbarMessageType: SnackbarMessageType | undefined) =>
        set({ snackbarMessage, snackbarMessageType }),
    clearSnackbarMessage: () => set({ snackbarMessage: undefined }),
}));
