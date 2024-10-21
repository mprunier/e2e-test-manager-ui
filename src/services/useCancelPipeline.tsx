import { useFetchState } from "../hooks/useFetchState.ts";
import { deleteCancelPipelineApiRoute } from "../endpoints/privateEndpoints.ts";

export const useCancelPipeline = () => {
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const cancel = async (pipelineId: string) => {
        startFetching();
        try {
            await deleteCancelPipelineApiRoute(pipelineId);
            endFetchingSuccess("The pipeline has been canceled");
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        cancel,
        cancelIsLoading: isLoading,
    };
};
