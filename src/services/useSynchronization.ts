import { useFetchState } from "../hooks/useFetchState.ts";
import { useSwrGetEnvironmentDetails } from "./useGetEnvironmentDetails.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { SynchronizeApiService } from "../api";

export const useSynchronization = () => {
    const { environment } = useEnvironmentContext();

    const mutateEnvironment = useSwrGetEnvironmentDetails(environment?.id).mutate;

    const { startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const synchronize = async () => {
        startFetching();
        try {
            await SynchronizeApiService.synchronize(environment?.id as string);
            await mutateEnvironment((currentData) => {
                if (!currentData) return;
                const updatedData = { ...currentData };
                updatedData.synchronizationInProgress = true;
                return updatedData;
            }, false);
            endFetchingSuccess("Synchronization is running !");
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        mutateEnvironment,
        synchronize,
    };
};
