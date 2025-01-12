import { useFetchState } from "../hooks/useFetchState.ts";
import { useState } from "react";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { type RunRequest, WorkerApiService } from "../api";

export const useRunOneSuiteOrTest = () => {
    const { environment } = useEnvironmentContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const run = async (formData: RunRequest) => {
        startFetching();
        try {
            await WorkerApiService.run(environment?.id as string, formData);
            setIsModalOpen(false);
            endFetchingSuccess("Test is running !");
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        run,
        isLoading,
        isModalOpen,
        setIsModalOpen,
    };
};
