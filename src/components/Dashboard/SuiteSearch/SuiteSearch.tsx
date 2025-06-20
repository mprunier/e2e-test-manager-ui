import { Fragment, useState } from "react";
import { classNameStatus, getStatusViewer } from "../../../utils/statusUtils.ts";
import { classNames } from "../../../utils/classNameUtils.ts";
import RunActionButton from "../RunActionButton/RunActionButton.tsx";
import { ResultTestViewer } from "../ResultViewer/ResultTestViewer.tsx";
import { LoadingSkeleton } from "../../Common/LoadingSkeleton/LoadingSkeleton.tsx";
import { SearchBar } from "../SearchBar/SearchBar.tsx";
import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";
import { SearchPagination } from "../SearchPagination/SearchPagination.tsx";
import { Error } from "../../Common/Error/Error.tsx";
import { NotResults } from "../../Common/NotFound/NotResults.tsx";
import { formatDateTime } from "../../../utils/dateUtils.ts";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { NewSVG } from "../../../assets/images/NewSVG.tsx";
import { useGetSuitesAndTests } from "../../../services/useGetSuitesAndTests.ts";
import TruncatedTextWithTooltip from "../../Common/TruncatedTextWithTooltip/TruncatedTextWithTooltip.tsx";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { PipelineIndicator } from "./PipelineIndicator.tsx";
import { useCancelWorker } from "../../../services/useCancelWorker.tsx";
import type { ConfigurationSuiteWithWorkerResponse, ConfigurationTestWithWorkerResponse } from "../../../api";
import { ConfigurationStatus, WorkerType } from "../../../api";
import { useIsRunningByGroup } from "../../../hooks/useIsRunningByGroup.ts";

export const SuiteSearch = () => {
    const { getSuitesAndTestsState, suitesAndTestsData, formValues, setFormValues } = useGetSuitesAndTests();
    const { cancel, cancelIsLoading } = useCancelWorker();
    const [selectedTest, setSelectedTest] = useState<ConfigurationTestWithWorkerResponse | null>(null);
    const [selectedSuite, setSelectedSuite] = useState<ConfigurationSuiteWithWorkerResponse | null>(null);
    const { isRunningByGroup, runningGroup } = useIsRunningByGroup();
    const isConnected = keycloakUtils.isAuthenticated();

    const getTagsContent = (tags: string[]) => (
        <>
            This test applies for the following tags : <br />
            {tags.map((tag, index) => (
                <div key={tag} className={"font-bold"}>
                    {tag}
                    {index < tags.length - 1 ? <br /> : null}
                </div>
            ))}
        </>
    );

    const renderTests = (tests: ConfigurationTestWithWorkerResponse[], suiteGroup?: string) => (
        <>
            {tests.map((test) => (
                <Fragment key={test.id}>
                    <div
                        className={`mt-1 flex h-9 cursor-pointer items-center rounded-xl bg-cyan-50 p-2`}
                        onClick={() => setSelectedTest(selectedTest?.id === test.id ? null : test)}
                    >
                        <div
                            className={`mr-4 flex w-7/12 flex-none items-start text-sm font-medium text-cyan-600 lg:w-8/12`}
                        >
                            <Tooltip
                                disabled={!test.tags || test.tags.length === 0}
                                content={test.tags ? getTagsContent(test.tags) : undefined}
                                position="right"
                                size={"w-80"}
                            >
                                <div className="text-cyan-600">
                                    {test.tags && test.tags.length > 0 && <List className="mr-2 mt-0.5 h-4 w-4" />}
                                </div>
                            </Tooltip>
                            <TruncatedTextWithTooltip text={test.title} className="w-full truncate pr-6" />
                        </div>

                        <div className="ml-0.5 flex w-3/12 flex-none items-start lg:w-2/12">
                            <Tooltip
                                disabled={!test.lastPlayedAt}
                                content={`${test.lastPlayedAt ? formatDateTime(new Date(test.lastPlayedAt)) : ``}`}
                                position="bottom"
                                size={"w-40"}
                            >
                                <span
                                    className={classNames(
                                        classNameStatus(test.status),
                                        `inline-block w-[140px] rounded-full px-3 py-1 text-center text-sm ${
                                            (test.workers && test.workers.length > 0) || 
                                            (isRunningByGroup && !!suiteGroup && suiteGroup === runningGroup)
                                                ? "animate-pulse border-2 border-blue-300"
                                                : ""
                                        }`,
                                    )}
                                >
                                    {getStatusViewer(test.status)}
                                </span>
                            </Tooltip>
                            {(test.workers && test.workers.length > 0) || (isRunningByGroup && !!suiteGroup && suiteGroup === runningGroup) ? (
                                <div className="pl-2 pt-1">
                                    <PipelineIndicator
                                        pipelinesInProgress={test.workers || []}
                                        onCancelPipeline={cancel}
                                        cancelIsLoading={cancelIsLoading}
                                    />
                                </div>
                            ) : null}
                            {test.status === ConfigurationStatus.NEW && (
                                <div className={"pl-2"}>
                                    <NewSVG />
                                </div>
                            )}
                        </div>
                        <div className="flex w-2/12 flex-none items-start justify-between">
                            <RunActionButton
                                configurationTestId={test.id}
                                disabled={
                                    !isConnected ||
                                    (test.workers &&
                                        test.workers.filter((pipeline) => pipeline.type !== WorkerType.ALL).length > 0) ||
                                    (isRunningByGroup && !!suiteGroup && suiteGroup === runningGroup)
                                }
                                isConnected={isConnected}
                                variables={test.variables}
                                isTestLoading={test.status === ConfigurationStatus.IN_PROGRESS || (isRunningByGroup && !!suiteGroup && suiteGroup === runningGroup)}
                            />
                            <div className="m-1 mr-6">
                                {selectedTest?.id === test.id ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>
                    {selectedTest?.id === test.id && <ResultTestViewer configurationTestId={test.id} />}
                </Fragment>
            ))}
        </>
    );

    const renderSuites = (suites: ConfigurationSuiteWithWorkerResponse[]) => (
        <>
            {suites.map((suite) => (
                <Fragment key={suite.id}>
                    <div
                        onClick={() => setSelectedSuite(selectedSuite?.id === suite.id ? null : suite)}
                        className={`mt-4 flex h-12 items-center rounded-xl bg-indigo-50 p-2`}
                        style={{ cursor: "pointer" }}
                    >
                        <div className={"mr-4 flex w-8/12 flex-none flex-col items-start"}>
                            <TruncatedTextWithTooltip
                                text={suite.title}
                                className="m-1 w-full text-sm font-medium text-cyan-800"
                            />
                            <div className="flex items-center gap-1">
                                {suite.group && (
                                    <span className="mb-1 rounded-3xl bg-indigo-200 px-1 text-xs font-medium text-white">
                                        {suite.group}
                                    </span>
                                )}
                                <TruncatedTextWithTooltip
                                    text={suite.file}
                                    className="mb-1 w-full truncate pl-1 pr-3 text-xs text-amber-800"
                                />
                            </div>
                        </div>

                        <div className="flex w-2/12 flex-none items-start">
                            <Tooltip
                                disabled={!suite.lastPlayedAt}
                                content={`${suite.lastPlayedAt ? formatDateTime(new Date(suite.lastPlayedAt)) : ``}`}
                                position="bottom"
                                size={"w-40"}
                            >
                                <span
                                    className={classNames(
                                        classNameStatus(suite.status),
                                        `inline-block w-[140px] rounded-full px-3 py-1 text-center text-sm ${
                                            (suite.workers && suite.workers.length > 0) || 
                                            (isRunningByGroup && suite.group && suite.group === runningGroup)
                                                ? "animate-pulse border-2 border-blue-300"
                                                : ""
                                        }`,
                                    )}
                                >
                                    {getStatusViewer(suite.status)}
                                </span>
                            </Tooltip>
                            {(suite.workers && suite.workers.length > 0) || (isRunningByGroup && !!suite.group && suite.group === runningGroup) ? (
                                <div className="pl-2 pt-1">
                                    <PipelineIndicator
                                        pipelinesInProgress={suite.workers || []}
                                        onCancelPipeline={cancel}
                                        cancelIsLoading={cancelIsLoading}
                                    />
                                </div>
                            ) : null}
                            {suite.hasNewTest && (
                                <div className={"pl-2"}>
                                    <NewSVG />
                                </div>
                            )}
                        </div>

                        <div className="flex w-2/12 flex-none items-start justify-between">
                            <RunActionButton
                                configurationSuiteId={suite.id}
                                disabled={
                                    !isConnected ||
                                    (suite.workers &&
                                        suite.workers.filter((pipeline) => pipeline.type !== WorkerType.ALL).length > 0) ||
                                    (isRunningByGroup && !!suite.group && suite.group === runningGroup)
                                }
                                isConnected={isConnected}
                                variables={suite.variables}
                                isTestLoading={suite.status === ConfigurationStatus.IN_PROGRESS || (isRunningByGroup && !!suite.group && suite.group === runningGroup)}
                            />
                            <div className="mr-6">
                                {selectedSuite?.id === suite.id ? (
                                    <ChevronUp className="mt-1 h-5 w-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="mt-1 h-5 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>
                    {selectedSuite?.id === suite.id && renderTests(suite.tests, suite.group)}
                </Fragment>
            ))}
        </>
    );

    return (
        <div className="mx-8 my-2">
            <SearchBar formValues={formValues} setFormValues={setFormValues} />
            {getSuitesAndTestsState.isLoading && <LoadingSkeleton />}
            {getSuitesAndTestsState.error && (
                <Error
                    status={getSuitesAndTestsState.error.status}
                    errorMessage={getSuitesAndTestsState.error.detail}
                />
            )}
            {!getSuitesAndTestsState.isLoading &&
                !getSuitesAndTestsState.error &&
                suitesAndTestsData &&
                renderSuites(suitesAndTestsData.content)}
            {!getSuitesAndTestsState.isLoading &&
                !getSuitesAndTestsState.error &&
                suitesAndTestsData &&
                suitesAndTestsData.totalPages === 0 && <NotResults />}
            {!getSuitesAndTestsState.isLoading &&
                !getSuitesAndTestsState.error &&
                suitesAndTestsData &&
                suitesAndTestsData.totalPages !== 0 && (
                    <SearchPagination
                        currentPage={suitesAndTestsData.currentPage}
                        totalPages={suitesAndTestsData.totalPages}
                        totalElements={suitesAndTestsData.totalElements}
                        defaultValue={formValues.size}
                        sortField={formValues.sortField}
                        sortOrder={formValues.sortOrder}
                        onPageChange={(page) => {
                            setFormValues({ ...formValues, page });
                        }}
                        onPageSizeChange={(size) => {
                            setFormValues({ ...formValues, size, page: 0 });
                        }}
                        onSortFieldChange={(sortField) => {
                            setFormValues({ ...formValues, sortField, page: 0 });
                        }}
                        onSortOrderChange={(sortOrder) => {
                            setFormValues({ ...formValues, sortOrder, page: 0 });
                        }}
                    />
                )}
        </div>
    );
};
