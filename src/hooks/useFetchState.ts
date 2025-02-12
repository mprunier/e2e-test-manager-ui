import { useCallback, useMemo, useState } from "react";
import { IError } from "../utils/fetcherUtils.ts";
import { useSnackbarStore } from "../stores/useSnackbarStore.ts";
import { ApiError } from "../api";

export const getErrorToDisplay = (error: unknown): string => {
    if (error instanceof ApiError) {
        return error.body?.description ?? "An error occurred, please try again in a few minutes.";
    }

    return "An error occurred, please try again in a few minutes.";
};

export interface IFetchState {
    error?: IError;
    isLoading: boolean;
}

export const useFetchState = () => {
    const { setSnackbarMessage } = useSnackbarStore();
    const [state, setState] = useState<IFetchState>({ isLoading: false });

    const startFetching = useCallback(() => {
        setState({
            isLoading: true,
            error: undefined,
        });
    }, []);

    const endFetching = useCallback((error?: any) => {
        if (error) {
            setState({
                isLoading: false,
                error,
            });
        } else {
            setState({
                isLoading: false,
            });
        }
    }, []);

    const endFetchingError = useCallback(
        (error: any) => {
            endFetching(error);
            setSnackbarMessage(getErrorToDisplay(error), "error");
        },
        [endFetching, setSnackbarMessage],
    );

    const endFetchingSuccess = useCallback(
        (message: string) => {
            endFetching();
            setSnackbarMessage(message, "success");
        },
        [endFetching, setSnackbarMessage],
    );

    return useMemo(
        () => ({
            isLoading: state.isLoading,
            error: state.error,
            startFetching,
            endFetching,
            endFetchingError,
            endFetchingSuccess,
        }),
        [startFetching, endFetching, state, endFetchingError, endFetchingSuccess],
    );
};
