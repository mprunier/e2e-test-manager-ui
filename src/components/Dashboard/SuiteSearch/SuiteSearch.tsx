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
import { EConfigurationStatus } from "../../../constants.ts";
import { IConfigurationTest } from "../../../interfaces/domain/IConfigurationTest.tsx";
import { useGetSuitesAndTests } from "../../../services/useGetSuitesAndTests.ts";
import { IConfigurationSuite } from "../../../interfaces/domain/IConfigurationSuite.tsx";

export const SuiteSearch = () => {
    const { getSuitesAndTestsState, suitesAndTestsData, formValues, setFormValues } = useGetSuitesAndTests();
    const [selectedTest, setSelectedTest] = useState<IConfigurationTest | null>(null);
    const [selectedSuite, setSelectedSuite] = useState<IConfigurationSuite | null>(null);

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

    const renderTests = (tests: IConfigurationTest[]) => (
        <>
            {tests.map((test) => (
                <Fragment key={test.id}>
                    <div
                        className={`m-1 flex h-9 cursor-pointer items-center rounded-xl bg-cyan-50 p-2`}
                        onClick={() => setSelectedTest(selectedTest?.id === test.id ? null : test)}
                    >
                        <Tooltip
                            disabled={!test.tags || test.tags.length === 0}
                            content={test.tags ? getTagsContent(test.tags) : undefined}
                            position="right"
                            size={"w-80"}
                        >
                            <div className="text-cyan-600">
                                {test.tags && test.tags.length > 0 && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.8"
                                        stroke="currentColor"
                                        className="mr-1 h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                        />
                                    </svg>
                                )}
                            </div>
                        </Tooltip>
                        <div
                            className={`mr-4 flex w-8/12 flex-none items-start text-sm font-medium text-cyan-600 ${
                                !test.tags || test.tags.length === 0 ? "ml-5" : ""
                            }`}
                        >
                            <div className="w-full truncate">{test.title}</div>
                        </div>

                        <div className="ml-0.5 flex w-2/12 flex-none items-start">
                            <Tooltip
                                disabled={!test.lastPlayedAt}
                                content={`${test.lastPlayedAt ? formatDateTime(new Date(test.lastPlayedAt)) : ``}`}
                                position="bottom"
                            >
                                <span
                                    className={classNames(
                                        classNameStatus(test.status),
                                        "inline-block w-[140px] rounded-full px-3 py-1 text-center text-sm",
                                    )}
                                >
                                    {getStatusViewer(test.status)}
                                </span>
                            </Tooltip>
                            {test.status === EConfigurationStatus.NEW && (
                                <div className={"pl-2"}>
                                    <NewSVG />
                                </div>
                            )}
                        </div>
                        <div className="flex w-2/12 flex-none items-start">
                            <RunActionButton
                                configurationTestId={test.id}
                                disabled={!isConnected || test.status === EConfigurationStatus.IN_PROGRESS}
                                isConnected={isConnected}
                                variables={test.variables}
                                isTestLoading={test.status === EConfigurationStatus.IN_PROGRESS}
                            />
                            {selectedTest?.id !== test.id && (
                                <div className="ml-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                            {selectedTest?.id === test.id && selectedTest !== null && (
                                <div className="ml-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 15l7-7 7 7"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                    {selectedTest?.id === test.id && <ResultTestViewer configurationTestId={test.id} />}
                </Fragment>
            ))}
        </>
    );

    const renderSuites = (suites: IConfigurationSuite[]) => (
        <>
            {suites.map((suite) => (
                <Fragment key={suite.id}>
                    <div
                        onClick={() => setSelectedSuite(selectedSuite?.id === suite.id ? null : suite)}
                        className={`mt-4 flex h-12 items-center rounded-b-md rounded-t-xl bg-indigo-50 p-2`}
                        style={{ cursor: "pointer" }}
                    >
                        <div className={"mr-4 flex w-8/12 flex-none flex-col items-start"}>
                            <div className="m-1 w-full truncate text-sm font-medium text-cyan-800">{suite.title}</div>
                            <div className="mb-1 w-full truncate pl-1 pr-3 text-xs text-amber-800">{suite.file}</div>
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
                                        "ml-5 inline-block w-[140px] rounded-full px-3 py-1 text-center text-sm",
                                    )}
                                >
                                    {getStatusViewer(suite.status)}
                                </span>
                            </Tooltip>
                            {suite.hasNewTest && (
                                <div className={"pl-2"}>
                                    <NewSVG />
                                </div>
                            )}
                        </div>
                        <div className="flex w-2/12 flex-none items-start">
                            <div className={"ml-5"} />
                            <RunActionButton
                                configurationSuiteId={suite.id}
                                disabled={!isConnected || suite.status === EConfigurationStatus.IN_PROGRESS}
                                isConnected={isConnected}
                                variables={suite.variables}
                                isTestLoading={suite.status === EConfigurationStatus.IN_PROGRESS}
                            />
                            {selectedSuite?.id !== suite.id && (
                                <div className="ml-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                            {selectedSuite?.id === suite.id && selectedSuite !== null && (
                                <div className="ml-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 15l7-7 7 7"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                    {selectedSuite?.id === suite.id && renderTests(suite.tests)}
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
