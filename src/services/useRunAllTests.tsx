import { useFetchState } from "../hooks/useFetchState.ts";
import { postRunSchedulerApiRoute } from "../endpoints/privateEndpoints.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";

export const useRunAllTests = () => {
    const { environment } = useEnvironmentContext();
    const { isLoading: isRunLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const isRunningAllTests = false; // TODO = useIsRunningAllTests();

    const run = async () => {
        startFetching();
        try {
            await postRunSchedulerApiRoute(environment?.id as number);
            endFetchingSuccess("The complete set of tests has just been initiated.");
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        run,
        runIsLoading: isRunLoading || isRunningAllTests,
    };
};
