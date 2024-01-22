import { useFetchState } from "../hooks/useFetchState.ts";
import { postRunApiRoute } from "../endpoints/privateEndpoints.ts";
import { useState } from "react";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { IRunTestOrSuitePayload } from "../interfaces/payloads/IRunTestOrSuitePayload.tsx";

export const useRunOneSuiteOrTest = () => {
    const { environment } = useEnvironmentContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const run = async (formData: IRunTestOrSuitePayload) => {
        startFetching();
        try {
            await postRunApiRoute(environment?.id as number, formData);
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
