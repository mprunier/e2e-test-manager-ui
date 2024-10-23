import { useGetFinalMetrics } from "../../../services/useGetFinalMetrics.tsx";
import { classNames } from "../../../utils/classNameUtils.ts";
import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";
import { Error } from "../../Common/Error/Error.tsx";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";
import { useIsRunningAllTests, useLastAllTestsError } from "../../../stores/useEnvironmentStore.ts";
import { ChartSVG } from "../../../assets/images/ChartSVG.tsx";
import { useState } from "react";
import { ChartMetricsHistory } from "../ChartMetrics/ChartMetricsHistory.tsx";
import { useRunAllTests } from "../../../services/useRunAllTests.tsx";
import { formatDateTime } from "../../../utils/dateUtils.ts";

export const FinalMetrics = () => {
    const [isChartModalOpen, setIsChartModalOpen] = useState(false);
    const toggleChartModal = () => setIsChartModalOpen(!isChartModalOpen);

    const isConnected = keycloakUtils.isAuthenticated();

    const { finalMetricsData, getFinalMetricsState } = useGetFinalMetrics();
    const { run, runIsLoading } = useRunAllTests();

    const isRunningAllTests = useIsRunningAllTests();
    const isLastAllTestsError = useLastAllTestsError();

    return (
        <>
            <div className="flex flex-col items-center">
                {getFinalMetricsState.isLoading && (
                    <div className="mt-4 flex w-3/4 justify-center rounded-md bg-blue-50 p-4">
                        <LoadingSVG />
                    </div>
                )}

                {getFinalMetricsState.error && (
                    <Error
                        status={getFinalMetricsState.error.status}
                        errorMessage={getFinalMetricsState.error.detail}
                    />
                )}

                {!getFinalMetricsState.isLoading && !getFinalMetricsState.error && finalMetricsData && (
                    <>
                        <div className="flex  items-center justify-between space-y-2">
                            <ChartSVG toggleChartModal={toggleChartModal} />
                            <span
                                onClick={toggleChartModal}
                                className={classNames(
                                    finalMetricsData.passPercent === 100
                                        ? "bg-green-100"
                                        : finalMetricsData.failures && finalMetricsData.failures > 0
                                        ? "bg-red-100"
                                        : "bg-violet-100",
                                    "cursor-pointer rounded-full px-8 py-2 text-center text-sm",
                                )}
                            >
                                <div className="flex items-center justify-start">
                                    <div className="flex flex-col">
                                        {finalMetricsData.at && (
                                            <span className="text-xs font-bold text-gray-400">
                                                {finalMetricsData.lastAllTestsRunAt &&
                                                finalMetricsData.at !== finalMetricsData.lastAllTestsRunAt
                                                    ? "Last Test Run At: "
                                                    : ""}
                                                {formatDateTime(new Date(finalMetricsData.at))}
                                            </span>
                                        )}
                                        {finalMetricsData.at &&
                                            finalMetricsData.lastAllTestsRunAt &&
                                            finalMetricsData.at !== finalMetricsData.lastAllTestsRunAt && (
                                                <span className="text-xs font-bold text-gray-400">
                                                    Last All-Tests Run At:{" "}
                                                    {formatDateTime(new Date(finalMetricsData.lastAllTestsRunAt))}
                                                </span>
                                            )}
                                    </div>
                                    <div className="ml-8">
                                        <span className="font-bold text-amber-800">
                                            Suites: {finalMetricsData.suites ?? "-"}
                                        </span>
                                        <span className="ml-8 font-bold text-amber-700">
                                            Tests: {finalMetricsData.tests ?? "-"}
                                        </span>
                                        <span className="ml-8 font-bold text-green-500">
                                            Pass Percentage: {finalMetricsData.passPercent ?? "-"}%
                                        </span>
                                        <span className="ml-8 font-bold text-lime-500">
                                            Passes: {finalMetricsData.passes ?? "-"}
                                        </span>
                                        <span className="ml-8 font-bold text-red-500">
                                            Failures: {finalMetricsData.failures ?? "-"}
                                        </span>
                                        <span className="ml-8 font-bold text-blue-500">
                                            Skipped: {finalMetricsData.skipped ?? "-"}
                                        </span>
                                    </div>
                                </div>
                            </span>
                            <Tooltip
                                content="You must be logged in to perform this action."
                                position="bottom"
                                disabled={isConnected}
                            >
                                <button
                                    type="button"
                                    onClick={run}
                                    disabled={getFinalMetricsState.isLoading || runIsLoading || !isConnected}
                                    className={`mb-2 ml-8 mt-2 inline-flex h-7 w-[110px] items-center justify-center rounded text-center text-sm font-medium text-white focus:outline-none focus:ring-1 ${
                                        getFinalMetricsState.isLoading || runIsLoading || !isConnected
                                            ? "cursor-not-allowed bg-gray-300"
                                            : "bg-cyan-900 hover:bg-cyan-800 focus:ring-cyan-800"
                                    }`}
                                >
                                    {getFinalMetricsState.isLoading || runIsLoading ? (
                                        <LoadingSVG />
                                    ) : (
                                        <>
                                            {getFinalMetricsState.isLoading || runIsLoading
                                                ? "Running..."
                                                : "Run All-Tests"}
                                        </>
                                    )}
                                </button>
                            </Tooltip>
                        </div>
                        {isRunningAllTests && (
                            <div className="flex  items-center justify-between space-y-2">
                                <div
                                    className="relative mt-3 animate-pulse rounded-md border border-blue-200 bg-blue-50 px-4 py-1 text-blue-400"
                                    role="alert"
                                >
                                    <strong className="font-light">All tests are currently being executed!</strong>
                                </div>
                            </div>
                        )}
                        {isLastAllTestsError && !isRunningAllTests && (
                            <div className="flex  items-center justify-between space-y-2">
                                <div
                                    className="relative mt-3 rounded-md border border-red-400 bg-red-50 px-4 py-1 text-red-800"
                                    role="alert"
                                >
                                    <strong className="font-normal">{isLastAllTestsError}</strong>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {isChartModalOpen && <ChartMetricsHistory closeModal={toggleChartModal} />}
        </>
    );
};
