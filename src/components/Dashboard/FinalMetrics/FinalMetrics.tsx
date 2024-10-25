import { useGetFinalMetrics } from "../../../services/useGetFinalMetrics.tsx";
import { classNames } from "../../../utils/classNameUtils.ts";
import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";
import { Error } from "../../Common/Error/Error.tsx";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";
import { ChartSVG } from "../../../assets/images/ChartSVG.tsx";
import { FC, Fragment, useState } from "react";
import { ChartMetricsHistory } from "../ChartMetrics/ChartMetricsHistory.tsx";
import { useRunAllTests } from "../../../services/useRunAllTests.tsx";
import { formatDateTime } from "../../../utils/dateUtils.ts";
import { useGetAllTestsPipelines } from "../../../services/useGetAllTestsPipelines.tsx";
import { EPipelineStatus } from "../../../constants.ts";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { IPipeline } from "../../../interfaces/domain/IPipeline.tsx";
import { Popover, Transition } from "@headlessui/react";

const PipelineStatusIcon = ({ status }: { status: EPipelineStatus }) => {
    switch (status) {
        case EPipelineStatus.IN_PROGRESS:
            return <Clock className="h-5 w-5 text-blue-500" />;
        case EPipelineStatus.CANCELED:
            return <AlertCircle className="h-5 w-5 text-yellow-500" />;
        case EPipelineStatus.FINISH:
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        default:
            return <XCircle className="h-5 w-5 text-red-500" />;
    }
};

const PipelineInfo: FC<{ pipeline: IPipeline }> = ({ pipeline }) => {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`flex items-center focus:outline-none ${
                            open ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                        }`}
                    >
                        <PipelineStatusIcon status={pipeline.status!} />
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
                                <div className="space-y-2">
                                    {pipeline.statusDescription && (
                                        <p className="text-sm font-medium text-gray-600">
                                            {pipeline.statusDescription}
                                        </p>
                                    )}
                                    {pipeline.filesFilter && pipeline.filesFilter.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium">Files:</p>
                                            <ul className="mt-1 list-inside list-disc">
                                                {pipeline.filesFilter.map((file, index) => (
                                                    <li key={index} className="text-sm text-gray-500">
                                                        {file}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export const FinalMetrics = () => {
    const [isChartModalOpen, setIsChartModalOpen] = useState(false);
    const toggleChartModal = () => setIsChartModalOpen(!isChartModalOpen);

    const isConnected = keycloakUtils.isAuthenticated();

    const { finalMetricsData, getFinalMetricsState } = useGetFinalMetrics();
    const { run, runIsLoading } = useRunAllTests();
    const { getAllTestsPipelinesState, allTestsPipelines } = useGetAllTestsPipelines();

    const isRunningAllTests =
        allTestsPipelines !== undefined &&
        allTestsPipelines.length > 0 &&
        allTestsPipelines.some((pipeline) => pipeline.status === EPipelineStatus.IN_PROGRESS);

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
                                    disabled={
                                        getFinalMetricsState.isLoading ||
                                        runIsLoading ||
                                        !isConnected ||
                                        isRunningAllTests
                                    }
                                    className={`mb-2 ml-8 mt-2 inline-flex h-7 w-[110px] items-center justify-center rounded text-center text-sm font-medium text-white focus:outline-none focus:ring-1 ${
                                        getFinalMetricsState.isLoading ||
                                        runIsLoading ||
                                        !isConnected ||
                                        isRunningAllTests
                                            ? "cursor-not-allowed bg-gray-300"
                                            : "bg-cyan-900 hover:bg-cyan-800 focus:ring-cyan-800"
                                    }`}
                                >
                                    {getFinalMetricsState.isLoading || runIsLoading || isRunningAllTests ? (
                                        <LoadingSVG />
                                    ) : (
                                        <>
                                            {getFinalMetricsState.isLoading || runIsLoading || isRunningAllTests
                                                ? "Running..."
                                                : "Run All-Tests"}
                                        </>
                                    )}
                                </button>
                            </Tooltip>
                        </div>
                    </>
                )}

                {getAllTestsPipelinesState.isLoading && (
                    <div className="mt-4 flex w-3/4 justify-center rounded-md bg-blue-50 p-4">
                        <LoadingSVG />
                    </div>
                )}

                {getAllTestsPipelinesState.error && (
                    <Error
                        status={getAllTestsPipelinesState.error.status}
                        errorMessage={getAllTestsPipelinesState.error.detail}
                    />
                )}

                {!getAllTestsPipelinesState.isLoading && !getAllTestsPipelinesState.error && allTestsPipelines && (
                    <>
                        {isRunningAllTests && allTestsPipelines.length === 1 && (
                            <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 p-3">
                                <div className="relative text-blue-600" role="alert">
                                    <strong className="animate-pulse text-sm text-gray-600">
                                        All tests are currently being executed on a single pipeline !
                                    </strong>
                                </div>
                            </div>
                        )}
                        {isRunningAllTests && allTestsPipelines.length > 1 && (
                            <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-blue-50 p-3">
                                <strong className="animate-pulse text-sm text-gray-600">
                                    All tests are currently being executed on {allTestsPipelines.length} pipelines !
                                </strong>
                                <div className="flex gap-2">
                                    {allTestsPipelines.map((pipeline, index) => (
                                        <PipelineInfo key={index} pipeline={pipeline} />
                                    ))}
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
