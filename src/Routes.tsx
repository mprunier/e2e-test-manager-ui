import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GlobalLoader } from "./components/Common/Loader/GlobalLoader.tsx";
import { useEnvironmentContext } from "./hooks/useEnvironmentContext.ts";

const OutcomeDashboard = lazy(() =>
    import("./pages/DashboardPage.tsx").then((module) => ({ default: module.DashboardPage })),
);

// const HelperDashboard = lazy(() => import("./pages/HelperPage.tsx").then((module) => ({ default: module.HelperPage })));

const ConfigurationDashboard = lazy(() =>
    import("./pages/ConfigurationPage.tsx").then((module) => ({ default: module.ConfigurationPage })),
);

export const AppRoutes = () => {
    const { environment } = useEnvironmentContext();

    return (
        <Suspense fallback={<GlobalLoader />}>
            <Routes>
                {environment && (
                    <>
                        <Route path="/" element={<OutcomeDashboard />} />
                        <Route path="/configuration" element={<ConfigurationDashboard />} />
                    </>
                )}
                {/*<Route path="/helper" element={<HelperDashboard />} />*/}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};
