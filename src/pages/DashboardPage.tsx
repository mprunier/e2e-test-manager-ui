import { SuiteSearch } from "../components/Dashboard/SuiteSearch/SuiteSearch.tsx";
import { FinalMetrics } from "../components/Dashboard/FinalMetrics/FinalMetrics.tsx";

export const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-4 shadow">
                <FinalMetrics />
            </div>
            <div className="rounded-2xl bg-white p-4 shadow">
                <SuiteSearch />
            </div>
        </div>
    );
};
