import { useFetchState } from "../hooks/useFetchState.ts";
import { WorkerApiService } from "../api";

export const useCancelWorker = () => {
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const cancel = async (workerId: string) => {
        startFetching();
        try {
            await WorkerApiService.cancel(workerId);
            endFetchingSuccess("The worker has been canceled");
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        cancel,
        cancelIsLoading: isLoading,
    };
};
