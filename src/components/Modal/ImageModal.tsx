import React, { useState } from "react";
import { TestResultScreenshotResponse } from "../../api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { downloadScreenshotsApiRoute } from "../../api/medias/mediaApi.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: TestResultScreenshotResponse[];
}

export const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, images }) => {
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
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-100"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    <div className="flex h-[600px] w-[1200px] items-center justify-center rounded-md bg-gray-50">
                        <img
                            src={downloadScreenshotsApiRoute(images[currentIndex].id)}
                            alt={images[currentIndex].name}
                            className="max-h-full max-w-full rounded-md object-contain"
                        />
                    </div>

                    {images.length > 1 && currentIndex < images.length - 1 && (
                        <button
                            onClick={goToNext}
                            className="absolute right-4 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-100"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}
                </div>

                <p className="mt-2 w-full max-w-[1000px] overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm text-cyan-800">
                    {images[currentIndex].name}
                </p>

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
