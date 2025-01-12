import { useFetchState } from "../hooks/useFetchState.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { WorkerApiService } from "../api";

export const useRunAllTests = () => {
    const { environment } = useEnvironmentContext();
    const { isLoading: runIsLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const run = async () => {
        startFetching();
        try {
            await WorkerApiService.run(environment?.id as string);
            endFetchingSuccess("The complete set of tests has just been initiated.");
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        run,
        runIsLoading: runIsLoading,
    };
};
