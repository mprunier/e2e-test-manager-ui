import { useCallback, useEffect, useState } from "react";
import { IEnvironment } from "../../../interfaces/domain/IEnvironment.ts";
import { useEnvironmentContext } from "../../../hooks/useEnvironmentContext";
import { useGetEnvironments } from "../../../services/useGetAllEnvironments.ts";

interface IParams {
    all?: boolean;
}

export const useEnvironments = ({ all }: IParams) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { environment, shouldInitializeStorage, clearEnvironment, setEnvironment } = useEnvironmentContext();
    const { environmentsData, getEnvironmentsState, mutateEnvironments } = useGetEnvironments(all);

    useEffect(() => {
        if (shouldInitializeStorage && environmentsData && environmentsData.length > 0) {
            clearEnvironment();
            setEnvironment(environmentsData[0]);
        }
    }, [clearEnvironment, setEnvironment, shouldInitializeStorage, environmentsData]);

    const handleChangeEnvironment = useCallback(
        (environmentSelected: IEnvironment) => {
            setEnvironment(environmentSelected);
        },
        [setEnvironment],
    );

    return {
        environment,
        environmentsData,
        getEnvironmentsState,
        handleChangeEnvironment,
        mutateEnvironments,
        isCreateModalOpen,
        setIsCreateModalOpen,
    };
};
