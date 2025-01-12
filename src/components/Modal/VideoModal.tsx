import React, { useState } from "react";
import { downloadVideosApiRoute } from "../../api/medias/mediaApi.ts";

interface ModalProps {
    onClose: () => void;
    testId: string;
}

export const VideoModal: React.FC<ModalProps> = ({ onClose, testId }) => {
    const [videoError, setVideoError] = useState<boolean>(false);

    return (
        <div
            className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="relative mx-auto flex w-[1300px] flex-col items-center justify-center rounded-lg bg-white p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative mb-2 flex w-full items-center justify-center">
                    {!videoError && (
                        <video controls src={downloadVideosApiRoute(testId)} onError={() => setVideoError(true)} />
                    )}
                    {videoError && <>No video found for this test</>}
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
