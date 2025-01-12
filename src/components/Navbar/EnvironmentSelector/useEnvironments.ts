import { useCallback, useState } from "react";
import { useEnvironmentContext } from "../../../hooks/useEnvironmentContext";
import { useGetEnvironments } from "../../../services/useGetAllEnvironments.ts";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import type { EnvironmentResponse } from "../../../api";

interface IParams {
    all?: boolean;
}

export const useEnvironments = ({ all }: IParams) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { environment, setEnvironment } = useEnvironmentContext();
    const { environmentsData, getEnvironmentsState, mutateEnvironments } = useGetEnvironments(all);

    const handleChangeEnvironment = useCallback(
        (environmentSelected: EnvironmentResponse | undefined) => {
            let targetEnvironment: EnvironmentResponse | undefined = environmentSelected;

            if (!targetEnvironment && Array.isArray(environmentsData) && environmentsData.length > 0) {
                targetEnvironment = environmentsData[0];
            }

            if (!targetEnvironment) {
                return;
            }

            setEnvironment(targetEnvironment);

            const match = matchPath({ path: "/env/:envId/*" }, location.pathname);
            const subPath = match?.params["*"] || "";
            const newPath = `/env/${targetEnvironment.id}${subPath ? `/${subPath}` : ""}`;

            navigate(newPath);
        },
        [setEnvironment, navigate, location.pathname, environmentsData],
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
