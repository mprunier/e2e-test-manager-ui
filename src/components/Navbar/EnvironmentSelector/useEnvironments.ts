import { useCallback, useState } from "react";
import { IEnvironment } from "../../../interfaces/domain/IEnvironment.ts";
import { useEnvironmentContext } from "../../../hooks/useEnvironmentContext";
import { useGetEnvironments } from "../../../services/useGetAllEnvironments.ts";
import { useNavigate } from "react-router-dom";

interface IParams {
    all?: boolean;
}

export const useEnvironments = ({ all }: IParams) => {
    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { environment, setEnvironment } = useEnvironmentContext();
    const { environmentsData, getEnvironmentsState, mutateEnvironments } = useGetEnvironments(all);

    const handleChangeEnvironment = useCallback(
        (environmentSelected: IEnvironment) => {
            setEnvironment(environmentSelected);
            navigate(`/env/${environmentSelected.id}`);
        },
        [setEnvironment, navigate],
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
