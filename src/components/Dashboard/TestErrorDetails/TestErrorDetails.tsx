import React from "react";
import { useGetTestErrorDetails } from "../../../services/useGetTestErrorDetails.ts";
import CodeBlock from "../../Common/CodeBlock/CodeBlock.tsx";

interface CodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    testId: string;
}

const TestErrorDetails: React.FC<CodeModalProps> = ({ isOpen, onClose, testId }) => {
    const { testDetailsData } = useGetTestErrorDetails({ testId });

    if (!isOpen) return null;

    return (
        <div
            className="fixed left-0 top-0 z-10 flex h-full w-full justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="mx-auto mt-[5vh] flex h-[90vh] w-[1200px] flex-col items-stretch justify-between rounded-2xl bg-white p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {testDetailsData && (
                    <div className="flex flex-col gap-4 overflow-y-auto">
                        {testDetailsData.errorMessage && (
                            <div className="flex flex-col items-start">
                                <h3 className="mb-2 text-sm font-semibold">Error Message</h3>
                                <CodeBlock code={testDetailsData.errorMessage} />
                            </div>
                        )}

                        {testDetailsData.errorStacktrace && (
                            <div className="flex flex-col items-start">
                                <h3 className="mb-2 text-sm font-semibold">Error Stacktrace</h3>
                                <CodeBlock code={testDetailsData.errorStacktrace} />
                            </div>
                        )}

                        <div className="flex flex-col items-start">
                            <h3 className="mb-2 text-sm font-semibold">Code</h3>
                            <CodeBlock code={testDetailsData.code} />
                        </div>
                    </div>
                )}

                <button onClick={onClose} className="mt-2 self-center rounded bg-red-500 px-4 py-2 text-white">
                    Close
                </button>
            </div>
        </div>
    );
};

export default TestErrorDetails;
