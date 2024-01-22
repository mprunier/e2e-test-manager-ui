import { Fragment, useState } from "react";
import { useGetResultTest } from "../../../services/useGetResultTest.ts";
import { LoadingSkeleton } from "../../Common/LoadingSkeleton/LoadingSkeleton.tsx";
import { classNames } from "../../../utils/classNameUtils.ts";
import { classNameBg, classNameStatus, getStatusViewer } from "../../../utils/statusUtils.ts";
import { formatDateTime } from "../../../utils/dateUtils.ts";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import TestErrorDetails from "../TestErrorDetails/TestErrorDetails.tsx";
import ImageModal from "../../Modal/ImageModal.tsx";
import { Error } from "../../Common/Error/Error.tsx";
import VideoModal from "../../Modal/VideoModal.tsx";
import { EConfigurationStatus } from "../../../constants.ts";
import { ITest } from "../../../interfaces/domain/ITest.tsx";
import { IScreenshot } from "../../../interfaces/domain/IScreenshot.tsx";

interface IParams {
    configurationTestId: number;
}

export const ResultTestViewer = (props: IParams) => {
    const { configurationTestId } = props;

    const [images, setImages] = useState<IScreenshot[]>([]);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const [testVideoId, setTestVideoId] = useState<number | undefined>();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const [testSelected, setTestSelected] = useState<number>();
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

    const { resultTestData, getResultTestState } = useGetResultTest({
        configurationTestId,
    });

    if (getResultTestState.error)
        return <Error status={getResultTestState.error.status} errorMessage={getResultTestState.error.detail} />;
    if (getResultTestState.isLoading) return <LoadingSkeleton />;

    const informationTitle = (response: ITest): JSX.Element => {
        return (
            <>
                <div>{`Run by : ${response.createdBy}`}</div>
                <div>{`Duration (in ms): ${response.duration}`}</div>
            </>
        );
    };

    const variableTitle = (response: ITest): JSX.Element => {
        return (
            <>
                {response.variables &&
                    response.variables.map((variable, index) => (
                        <Fragment key={index}>
                            <div>{`Variable: ${variable.name}`}</div>
                            <div>{`Value: ${variable.value}`}</div>
                            {response.variables && response.variables.length - 1 !== index && <br />}
                        </Fragment>
                    ))}
            </>
        );
    };

    return (
        <>
            {resultTestData && (
                <div className="m-2 mx-auto mb-4  w-[800px] rounded-xl border p-2 shadow">
                    <div className="space-y-2">
                        {resultTestData.map((result) => {
                            return (
                                <div
                                    key={result.id}
                                    className={classNames(
                                        classNameBg(result.status),
                                        "flex h-10 space-x-4 rounded-xl p-2",
                                    )}
                                >
                                    <div className="flex w-1/4 flex-none items-center justify-center">
                                        <span className="w-[170px] rounded-full bg-gray-200 px-3 py-1 text-center text-sm text-gray-600">
                                            {formatDateTime(new Date(result.createdAt.toLocaleString()))}
                                        </span>
                                    </div>

                                    <div className="flex w-1/4 flex-none items-center justify-center">
                                        <span
                                            className={classNames(
                                                classNameStatus(result.status),
                                                "w-[120px] rounded-full px-3 py-1 text-center text-sm",
                                            )}
                                        >
                                            {getStatusViewer(result.status)}
                                        </span>
                                    </div>
                                    <div className="flex w-1/4 flex-none items-center justify-center">
                                        {result.reference && (
                                            <span className="w-[120px] rounded-full bg-amber-200 px-3 py-1 text-center text-sm text-amber-800">
                                                {result.reference}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex w-1/4">
                                        <div className="w-1/6 flex-none">
                                            <Tooltip content={informationTitle(result)} position="bottom" size={"w-60"}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </Tooltip>
                                        </div>

                                        <div className="w-1/6 flex-none">
                                            {result.status !== EConfigurationStatus.SUCCESS &&
                                                result.status !== EConfigurationStatus.IN_PROGRESS && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-5 w-5 cursor-pointer"
                                                        onClick={() => {
                                                            setIsCodeModalOpen(true);
                                                            setTestSelected(result.id);
                                                        }}
                                                    >
                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                        </div>

                                        <div className="w-1/6 flex-none">
                                            {result.status === EConfigurationStatus.FAILED && result.errorUrl && (
                                                <a href={result.errorUrl} target="_blank" rel="noopener noreferrer">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-5 w-5 cursor-pointer"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>

                                        <div className="w-1/6 flex-none">
                                            {result.screenshots &&
                                                Array.isArray(result.screenshots) &&
                                                result.screenshots.length > 0 && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-5 w-5 cursor-pointer"
                                                        onClick={() => {
                                                            setIsImageModalOpen(true);
                                                            setImages(result.screenshots ?? []);
                                                        }}
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                        </div>

                                        <div className="w-1/6 flex-none">
                                            {result.hasVideo && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-5 w-5 cursor-pointer"
                                                    onClick={() => {
                                                        setIsVideoModalOpen(true);
                                                        setTestVideoId(result.id);
                                                    }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                                    />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="w-1/6 flex-none">
                                            {Array.isArray(result.variables) && result.variables.length > 0 && (
                                                <Tooltip content={variableTitle(result)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="#0c4a6e"
                                                        className="h-6 w-6"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M19.253 2.292a.75.75 0 01.955.461A28.123 28.123 0 0121.75 12c0 3.266-.547 6.388-1.542 9.247a.75.75 0 11-1.416-.494c.94-2.7 1.458-5.654 1.458-8.753s-.519-6.054-1.458-8.754a.75.75 0 01.461-.954zm-14.227.013a.75.75 0 01.414.976A23.183 23.183 0 003.75 12c0 3.085.6 6.027 1.69 8.718a.75.75 0 01-1.39.563c-1.161-2.867-1.8-6-1.8-9.281 0-3.28.639-6.414 1.8-9.281a.75.75 0 01.976-.414zm4.275 5.052a1.5 1.5 0 012.21.803l.716 2.148L13.6 8.246a2.438 2.438 0 012.978-.892l.213.09a.75.75 0 11-.584 1.381l-.214-.09a.937.937 0 00-1.145.343l-2.021 3.033 1.084 3.255 1.445-.89a.75.75 0 11.786 1.278l-1.444.889a1.5 1.5 0 01-2.21-.803l-.716-2.148-1.374 2.062a2.437 2.437 0 01-2.978.892l-.213-.09a.75.75 0 01.584-1.381l.214.09a.938.938 0 001.145-.344l2.021-3.032-1.084-3.255-1.445.89a.75.75 0 11-.786-1.278l1.444-.89z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {!resultTestData && <LoadingSkeleton />}
            {isImageModalOpen && images && (
                <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} images={images} />
            )}
            {testVideoId && isVideoModalOpen && (
                <VideoModal
                    onClose={() => {
                        setIsVideoModalOpen(false);
                    }}
                    testId={testVideoId}
                />
            )}
            {testSelected && (
                <TestErrorDetails
                    testId={testSelected}
                    isOpen={isCodeModalOpen}
                    onClose={() => setIsCodeModalOpen(false)}
                />
            )}
        </>
    );
};
