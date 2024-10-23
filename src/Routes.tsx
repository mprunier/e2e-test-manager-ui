import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { GlobalLoader } from "./components/Common/Loader/GlobalLoader.tsx";
import { useEnvironmentContext } from "./hooks/useEnvironmentContext.ts";
import { useGetEnvironments } from "./services/useGetAllEnvironments.ts";

const OutcomeDashboard = lazy(() =>
    import("./pages/DashboardPage.tsx").then((module) => ({ default: module.DashboardPage })),
);

// const HelperDashboard = lazy(() => import("./pages/HelperPage.tsx").then((module) => ({ default: module.HelperPage })));

const ConfigurationDashboard = lazy(() =>
    import("./pages/ConfigurationPage.tsx").then((module) => ({ default: module.ConfigurationPage })),
);

const EnvironmentRouteGuard = () => {
    const { envId } = useParams();
    const { environment, setEnvironment } = useEnvironmentContext();

    const { environmentsData } = useGetEnvironments(false);

    useEffect(() => {
        if (envId && environmentsData) {
            const envFromUrl = environmentsData.find((env) => env.id.toString() === envId);
            if (envFromUrl && (!environment || environment.id.toString() !== envId)) {
                setEnvironment(envFromUrl);
            }
        }
    }, [envId, environment, environmentsData, setEnvironment]);

    if (!environment) return <GlobalLoader />;

    return (
        <Routes>
            <Route index element={<OutcomeDashboard />} />
            <Route path="configuration" element={<ConfigurationDashboard />} />
        </Routes>
    );
};

export const AppRoutes = () => {
    const { environment } = useEnvironmentContext();

    return (
        <Suspense fallback={<GlobalLoader />}>
            <Routes>
                <Route
                    path="/"
                    element={environment ? <Navigate to={`/env/${environment.id}`} replace /> : <GlobalLoader />}
                />
                <Route path="/env/:envId/*" element={<EnvironmentRouteGuard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};
