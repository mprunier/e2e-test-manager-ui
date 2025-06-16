import { useGetFinalMetrics } from "../../../services/useGetFinalMetrics.tsx";
import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";
import { Error } from "../../Common/Error/Error.tsx";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";
import { ChartSVG } from "../../../assets/images/ChartSVG.tsx";
import { FC, Fragment, useState } from "react";
import { ChartMetricsHistory } from "../ChartMetrics/ChartMetricsHistory.tsx";
import { useRunAllTests } from "../../../services/useRunAllTests.tsx";
import { formatDateTime } from "../../../utils/dateUtils.ts";
import { useGetTypeAllWorkerUnits } from "../../../services/useGetTypeAllWorkerUnits.tsx";
import { AlertCircle, CheckCircle, RefreshCcw, XCircle } from "lucide-react";
import { Popover, Transition } from "@headlessui/react";
import { MetricsResponse, type WorkerUnitResponse, WorkerUnitStatus } from "../../../api";
import { RunAllByGroupButton } from "../RunAllByGroupButton/RunAllByGroupButton.tsx";

const StatusIcon: FC<{ status: WorkerUnitStatus }> = ({ status }) => {
    switch (status) {
        case WorkerUnitStatus.IN_PROGRESS:
            return <RefreshCcw className="h-5 w-5 animate-spin text-blue-500" />;
        case WorkerUnitStatus.CANCELED:
            return <AlertCircle className="h-5 w-5 text-yellow-500" />;
        case WorkerUnitStatus.SUCCESS:
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case WorkerUnitStatus.FAILED:
        case WorkerUnitStatus.SYSTEM_ERROR:
        case WorkerUnitStatus.NO_REPORT_ERROR:
        default:
            return <XCircle className="h-5 w-5 text-red-500" />;
    }
};

const PipelineInfo: FC<{ pipeline: WorkerUnitResponse }> = ({ pipeline }) => (
    <Popover className="relative">
        {({ open }) => (
            <>
                <Popover.Button
                    className={`flex items-center focus:outline-none ${
                        open ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                    }`}
                >
                    <StatusIcon status={pipeline.status!} />
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute z-10 mt-2 w-max -translate-x-1/2 transform px-2">
                        <div className="overflow-hidden rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
                            {pipeline.statusDescription && (
                                <p className="text-sm font-medium text-gray-600">{pipeline.statusDescription}</p>
                            )}
                            {pipeline.fileNames && pipeline.fileNames.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm font-medium">Files:</p>
                                    <ul className="mt-1 list-inside list-disc">
                                        {pipeline.fileNames.map((file, index) => (
                                            <li key={index} className="text-sm text-gray-500">
                                                {file}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Popover.Panel>
                </Transition>
            </>
        )}
    </Popover>
);

const MetricsDisplay: FC<{ data: MetricsResponse; onClick: () => void }> = ({ data, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer rounded-full px-8 py-2 text-sm ${
            data.passPercent === 100
                ? "bg-green-100"
                : data.failures && data.failures > 0
                ? "bg-red-100"
                : "bg-violet-100"
        }`}
    >
        <div className="flex items-center justify-start">
            <div className="flex flex-col">
                {data.at && (
                    <span className="text-xs font-bold text-gray-400">
                        {data.lastAllTestsRunAt && data.at !== data.lastAllTestsRunAt ? "Last Test Run At: " : ""}
                        {formatDateTime(new Date(data.at))}
                    </span>
                )}
                {data.at && data.lastAllTestsRunAt && data.at !== data.lastAllTestsRunAt && (
                    <span className="text-xs font-bold text-gray-400">
                        Last All-Tests Run At: {formatDateTime(new Date(data.lastAllTestsRunAt))}
                    </span>
                )}
            </div>

            <div className="ml-8">
                <span className="font-bold text-amber-800">Suites: {data.suites ?? "-"}</span>
                <span className="ml-8 font-bold text-amber-700">Tests: {data.tests ?? "-"}</span>
                <span className="ml-8 font-bold text-green-500">Success: {data.passes ?? "-"}</span>
                <span className="ml-1 font-bold text-green-500">({data.passPercent ?? "-"}%)</span>
                <span className="ml-8 font-bold text-red-500">Failed: {data.failures ?? "-"}</span>
                <span className="ml-8 font-bold text-blue-500">Skipped: {data.skipped ?? "-"}</span>
            </div>
        </div>
    </div>
);

export const FinalMetrics: FC = () => {
    const [isChartModalOpen, setIsChartModalOpen] = useState(false);
    const isConnected = keycloakUtils.isAuthenticated();

    const { finalMetricsData, getFinalMetricsState } = useGetFinalMetrics();
    const { run, runIsLoading } = useRunAllTests();
    const { getTypeAllWorkerUnitsState, typeAllWorkerUnits } = useGetTypeAllWorkerUnits();

    const isRunningAllTests = typeAllWorkerUnits?.some((pipeline) => pipeline.status === WorkerUnitStatus.IN_PROGRESS);

    return (
        <div className="flex flex-col items-center">
            {getFinalMetricsState.isLoading && (
                <div className="mt-4 flex w-3/4 justify-center rounded-md bg-blue-50 p-4">
                    <LoadingSVG />
                </div>
            )}

            {getFinalMetricsState.error && (
                <Error status={getFinalMetricsState.error.status} errorMessage={getFinalMetricsState.error.detail} />
            )}

            {!getFinalMetricsState.isLoading && !getFinalMetricsState.error && finalMetricsData && (
                <div
                    className={`flex items-center justify-between space-y-2 ${
                        isRunningAllTests ? "animate-pulse" : ""
                    }`}
                >
                    <ChartSVG toggleChartModal={() => setIsChartModalOpen(true)} />

                    <MetricsDisplay data={finalMetricsData} onClick={() => setIsChartModalOpen(true)} />

                    <Tooltip
                        content="You must be logged in to perform this action."
                        position="bottom"
                        disabled={isConnected}
                    >
                        <button
                            type="button"
                            onClick={run}
                            disabled={!isConnected || runIsLoading || isRunningAllTests}
                            className={`mb-2 ml-8 mt-2 inline-flex h-7 w-[110px] items-center justify-center rounded text-center text-sm font-medium text-white focus:outline-none focus:ring-1 ${
                                !isConnected || runIsLoading || isRunningAllTests
                                    ? "cursor-not-allowed bg-gray-300"
                                    : "bg-cyan-900 hover:bg-cyan-800 focus:ring-cyan-800"
                            }`}
                        >
                            {runIsLoading || isRunningAllTests ? <LoadingSVG /> : "Run All-Tests"}
                        </button>
                    </Tooltip>
                    <RunAllByGroupButton
                        disabled={!isConnected || runIsLoading || isRunningAllTests}
                        isConnected={isConnected}
                    />
                </div>
            )}

            {getTypeAllWorkerUnitsState.isLoading && (
                <div className="mt-4 flex w-3/4 justify-center rounded-md bg-blue-50 p-4">
                    <LoadingSVG />
                </div>
            )}

            {getTypeAllWorkerUnitsState.error && (
                <Error
                    status={getTypeAllWorkerUnitsState.error.status}
                    errorMessage={getTypeAllWorkerUnitsState.error.detail}
                />
            )}

            {!getTypeAllWorkerUnitsState.isLoading &&
                !getTypeAllWorkerUnitsState.error &&
                typeAllWorkerUnits &&
                isRunningAllTests && (
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 p-3">
                        <strong className="text-sm text-gray-600">
                            All tests are currently being executed on {typeAllWorkerUnits.length} pipeline
                            {typeAllWorkerUnits.length > 1 ? "s" : ""} !
                        </strong>
                        <div className="flex gap-2 pl-2">
                            {typeAllWorkerUnits.length > 1 &&
                                typeAllWorkerUnits.map((pipeline, index) => (
                                    <PipelineInfo key={index} pipeline={pipeline} />
                                ))}
                        </div>
                    </div>
                )}

            {isChartModalOpen && <ChartMetricsHistory closeModal={() => setIsChartModalOpen(false)} />}
        </div>
    );
};
