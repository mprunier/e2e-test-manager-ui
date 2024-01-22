import { FC, ReactNode, useState } from "react";

interface TooltipProps {
    content: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    children: ReactNode;
    disabled?: boolean;
    size?: string;
    z?: number;
}

export const Tooltip: FC<TooltipProps> = ({ content, children, position = "top", disabled, size, z }) => {
    const [isVisible, setIsVisible] = useState(false);

    let positionClasses = "";
    switch (position) {
        case "top":
            positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
            break;
        case "bottom":
            positionClasses = "top-full left-1/2 transform -translate-x-1/2 mt-2";
            break;
        case "left":
            positionClasses = "right-full top-1/2 transform translate-y-1/2 ml-2";
            break;
        case "right":
            positionClasses = "left-full top-1/2 transform -translate-y-1/2 mr-2";
            break;
    }

    return (
        <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {isVisible && !disabled && (
                <div
                    className={`absolute ${size ?? "w-64"} ${positionClasses} z-${
                        z ? z : "10"
                    } rounded bg-gray-200 p-2 text-sm font-medium text-cyan-800 shadow-lg`}
                >
                    {content}
                </div>
            )}
            {children}
        </div>
    );
};
