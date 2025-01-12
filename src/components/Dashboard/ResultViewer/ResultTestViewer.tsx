import { Fragment, useState } from "react";
import { useGetResultTest } from "../../../services/useGetResultTest";
import { LoadingSkeleton } from "../../Common/LoadingSkeleton/LoadingSkeleton";
import { classNames } from "../../../utils/classNameUtils";
import { classNameBg, classNameStatus, getStatusViewer } from "../../../utils/statusUtils";
import { formatDateTime } from "../../../utils/dateUtils";
import { Tooltip } from "../../Common/Tooltip/Tooltip";
import TestErrorDetails from "../TestErrorDetails/TestErrorDetails";
import { Error } from "../../Common/Error/Error";
import type { TestResultResponse, TestResultScreenshotResponse } from "../../../api";
import { TestResultStatus } from "../../../api";
import { VideoModal } from "../../Modal/VideoModal";
import { ImageModal } from "../../Modal/ImageModal";
import { Eye, Image as ImageIcon, Info, Link, Variable, Video } from "lucide-react";

interface IParams {
    configurationTestId: string;
}

export const ResultTestViewer = (props: IParams) => {
    const { configurationTestId } = props;

    const [images, setImages] = useState<TestResultScreenshotResponse[]>([]);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const [testVideoId, setTestVideoId] = useState<string | undefined>();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const [testSelected, setTestSelected] = useState<string>();
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

    const { resultTestData, getResultTestState } = useGetResultTest({
        configurationTestId,
    });

    if (getResultTestState.error)
        return <Error status={getResultTestState.error.status} errorMessage={getResultTestState.error.detail} />;
    if (getResultTestState.isLoading) return <LoadingSkeleton />;

    const informationTitle = (response: TestResultResponse): JSX.Element => {
        return (
            <>
                <div>{`Run by : ${response.createdBy}`}</div>
                <div>{`Duration (in ms): ${response.duration}`}</div>
            </>
        );
    };

    const variableTitle = (response: TestResultResponse): JSX.Element => {
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
                <div className="m-2 mx-auto mb-4 w-[800px] rounded-xl border p-2 shadow">
                    <div className="space-y-2">
                        {resultTestData.length === 0 && (
                            <p className="text-center text-gray-400">It seems there is no history for this test.</p>
                        )}
                        {resultTestData.length > 0 &&
                            resultTestData.map((result) => {
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
                                            <div className="mr-2 w-1/6 flex-none">
                                                <Tooltip
                                                    content={informationTitle(result)}
                                                    position="bottom"
                                                    size="w-max"
                                                >
                                                    <Info size={22} />
                                                </Tooltip>
                                            </div>

                                            <div className="mr-1 w-1/6 flex-none">
                                                {result.status === TestResultStatus.FAILED && (
                                                    <Eye
                                                        size={22}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setIsCodeModalOpen(true);
                                                            setTestSelected(result.id);
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div className="mr-1 w-1/6 flex-none">
                                                {result.status === TestResultStatus.FAILED && result.errorUrl && (
                                                    <a href={result.errorUrl} target="_blank" rel="noopener noreferrer">
                                                        <Link size={22} className="cursor-pointer" />
                                                    </a>
                                                )}
                                            </div>

                                            <div className="mr-1 w-1/6 flex-none">
                                                {result.screenshots &&
                                                    Array.isArray(result.screenshots) &&
                                                    result.screenshots.length > 0 && (
                                                        <ImageIcon
                                                            size={22}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setIsImageModalOpen(true);
                                                                setImages(result.screenshots ?? []);
                                                            }}
                                                        />
                                                    )}
                                            </div>

                                            <div className="mr-1 w-1/6 flex-none">
                                                {result.videoId && (
                                                    <Video
                                                        size={22}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setIsVideoModalOpen(true);
                                                            setTestVideoId(result.videoId);
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div className="mr-1 w-1/6 flex-none">
                                                {Array.isArray(result.variables) && result.variables.length > 0 && (
                                                    <Tooltip content={variableTitle(result)}>
                                                        <Variable size={22} />
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
