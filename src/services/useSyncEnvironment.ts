import { postSynchronizeApiRoute } from "../endpoints/privateEndpoints.ts";
import { useFetchState } from "../hooks/useFetchState.ts";
import { useSwrGetEnvironmentDetails } from "./useGetEnvironmentDetails.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";

export const useSyncEnvironment = () => {
    const { environment } = useEnvironmentContext();

    const mutateEnvironment = useSwrGetEnvironmentDetails(environment?.id).mutate;

    const { startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const synchronize = async () => {
        startFetching();
        try {
            await postSynchronizeApiRoute(environment?.id as number);
            await mutateEnvironment((currentData) => {
                if (!currentData) return;
                const updatedData = { ...currentData };
                updatedData.isLocked = true;
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
