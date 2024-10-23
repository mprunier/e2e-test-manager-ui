import { useCallback, useState } from "react";
import { IEnvironment } from "../../../interfaces/domain/IEnvironment.ts";
import { useEnvironmentContext } from "../../../hooks/useEnvironmentContext";
import { useGetEnvironments } from "../../../services/useGetAllEnvironments.ts";
import { matchPath, useNavigate } from "react-router-dom";

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

            const match = matchPath({ path: "/env/:envId/*" }, location.pathname);
            const subPath = match?.params["*"] || "";

            const newPath = `/env/${environmentSelected.id}${subPath ? `/${subPath}` : ""}`;

            navigate(newPath);
        },
        [setEnvironment, navigate, location.pathname],
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
