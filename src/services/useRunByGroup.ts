import { useFetchState } from "../hooks/useFetchState.ts";
import { useEffect, useRef, useState } from "react";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { WorkerApiService } from "../api";

export const useRunByGroup = () => {
    const { environment } = useEnvironmentContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isModalOpen]);

    const runByGroup = async (groupName: string) => {
        startFetching();
        try {
            await WorkerApiService.run(environment?.id as string, { groupName });
            setIsModalOpen(false);
            endFetchingSuccess("Tests are running for group: " + groupName);
        } catch (error) {
            endFetchingError(error);
        }
    };

    return {
        runByGroup,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        modalRef,
    };
};
