import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "../Tooltip/Tooltip.tsx";

interface TruncatedTextWithTooltipProps {
    text: string;
    className?: string;
}

const TruncatedTextWithTooltip: React.FC<TruncatedTextWithTooltipProps> = ({ text, className }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
            }
        };

        checkTruncation();
        window.addEventListener("resize", checkTruncation);

        return () => {
            window.removeEventListener("resize", checkTruncation);
        };
    }, [text]);

    return (
        <Tooltip
            content={text}
            position="bottom"
            isTextTruncated={isTruncated}
            className="inline-block w-full"
            size={"w-full"}
        >
            <div ref={textRef} className={`truncate ${className}`}>
                {text}
            </div>
        </Tooltip>
    );
};

export default TruncatedTextWithTooltip;
