import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { GlobalLoader } from "./components/Common/Loader/GlobalLoader.tsx";
import { useEnvironmentContext } from "./hooks/useEnvironmentContext.ts";
import { useGetEnvironments } from "./services/useGetAllEnvironments.ts";
import type { EnvironmentResponse } from "./api";

const OutcomeDashboard = lazy(() =>
    import("./pages/DashboardPage.tsx").then((module) => ({ default: module.DashboardPage })),
);

const ConfigurationDashboard = lazy(() =>
    import("./pages/ConfigurationPage.tsx").then((module) => ({ default: module.ConfigurationPage })),
);

interface EnvironmentRouteGuardProps {
    environmentsData: EnvironmentResponse[];
}

const EnvironmentRouteGuard = ({ environmentsData }: EnvironmentRouteGuardProps) => {
    const { envId } = useParams();
    const navigate = useNavigate();
    const { environment, setEnvironment } = useEnvironmentContext();

    useEffect(() => {
        if (envId) {
            const envFromUrl = environmentsData.find((env) => env.id === envId);
            if (envFromUrl && (!environment || environment.id !== envId)) {
                setEnvironment(envFromUrl);
                return;
            }
        }

        if (!environment?.id && environmentsData.length > 0) {
            const firstEnv = environmentsData[0];
            setEnvironment(firstEnv);
            navigate(`/env/${firstEnv.id}`, { replace: true });
            return;
        }
    }, [envId, environment, environmentsData, setEnvironment]);

    if (!environment?.id) return <GlobalLoader />;

    return (
        <Routes>
            <Route index element={<OutcomeDashboard />} />
            <Route path="configuration" element={<ConfigurationDashboard />} />
        </Routes>
    );
};

export const AppRoutes = () => {
    const { environment } = useEnvironmentContext();
    const { environmentsData, getEnvironmentsState } = useGetEnvironments(false);

    if (getEnvironmentsState.isLoading || !environmentsData) {
        return <GlobalLoader />;
    }

    return (
        <Suspense fallback={<GlobalLoader />}>
            <Routes>
                <Route
                    path="/"
                    element={environment ? <Navigate to={`/env/${environment.id}`} replace /> : <GlobalLoader />}
                />
                <Route path="/env/:envId/*" element={<EnvironmentRouteGuard environmentsData={environmentsData} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};
