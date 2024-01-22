import React, { useState } from "react";
import { getScreenshotsApiRoute } from "../../endpoints/publicEndpoints.ts";
import { IScreenshot } from "../../interfaces/domain/IScreenshot.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: IScreenshot[];
}

const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => currentIndex > 0 && setCurrentIndex((prev) => prev - 1);
    const goToNext = () => currentIndex < images.length - 1 && setCurrentIndex((prev) => prev + 1);

    if (!isOpen || images.length === 0) return null;

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
                    {images.length > 1 && currentIndex > 0 && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6"
                            onClick={goToPrevious}
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}

                    <img
                        src={getScreenshotsApiRoute(images[currentIndex].id)}
                        alt={images[currentIndex].name}
                        className="mx-4 w-[1200px] rounded-md object-contain"
                    />

                    {images.length > 1 && currentIndex < images.length - 1 && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            onClick={goToNext}
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>

                <p className="mt-2 w-full max-w-[1000px] overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm text-cyan-800">
                    {images[currentIndex].name}
                </p>

                <button onClick={onClose} className="mt-4 rounded bg-red-500 px-4 py-2 text-white">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ImageModal;
