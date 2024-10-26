import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Search, X } from "lucide-react";

interface Option {
    value: string | number;
    label: string;
}

interface SelectWithSearchProps {
    options: Option[];
    value: Option | null | undefined;
    onChange: (value: Option | null) => void;
    placeholder?: string;
    disabled?: boolean;
    isLoading?: boolean;
    isError?: boolean;
}

export const SelectWithSearch: FC<SelectWithSearchProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled,
    isLoading,
    isError,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const selectRef = useRef<HTMLDivElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});

    const toggleSelect = () => setIsOpen(!isOpen);

    const clearValue = () => {
        onChange(null);
        setQuery("");
    };

    const handleOptionClick = (option: Option) => () => {
        onChange(option);
        setIsOpen(false);
        setQuery("");
    };

    useEffect(() => {
        setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())));
    }, [query, options]);

    useEffect(() => {
        const calculateDropdownPosition = () => {
            if (isOpen && selectRef.current) {
                const selectRect = selectRef.current.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                const safeViewportWidth = viewportWidth - scrollbarWidth - 16;

                // Calculate content width
                const tempDiv = document.createElement("div");
                tempDiv.style.position = "absolute";
                tempDiv.style.visibility = "hidden";
                tempDiv.style.whiteSpace = "nowrap";
                document.body.appendChild(tempDiv);

                let maxWidth = selectRect.width;
                filteredOptions.forEach((option) => {
                    tempDiv.textContent = option.label;
                    const width = tempDiv.offsetWidth + 56;
                    maxWidth = Math.max(maxWidth, width);
                });

                document.body.removeChild(tempDiv);

                const rightEdgePosition = selectRect.left + maxWidth;

                if (rightEdgePosition > safeViewportWidth) {
                    const availableWidth = safeViewportWidth - selectRect.left;
                    setDropdownStyle({
                        width: `${availableWidth}px`,
                    });
                } else {
                    setDropdownStyle({
                        width: `${maxWidth}px`,
                    });
                }
            }
        };

        calculateDropdownPosition();
        window.addEventListener("resize", calculateDropdownPosition);
        return () => window.removeEventListener("resize", calculateDropdownPosition);
    }, [isOpen, filteredOptions]);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (selectRef.current && !(selectRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectRef]);

    return (
        <div className="relative w-full" ref={selectRef}>
            <div
                className={`flex h-10 w-full items-center justify-between rounded-xl border ${
                    isError ? "bg-red-50" : disabled ? "bg-gray-50" : "bg-purple-50"
                } px-2`}
            >
                {isLoading ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    </div>
                ) : isError ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <span className="text-center font-bold text-red-300">Error loading...</span>
                    </div>
                ) : (
                    <>
                        <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <div className="relative flex-1">
                            <input
                                disabled={disabled}
                                type="text"
                                placeholder={placeholder}
                                value={value ? value.label : query}
                                onChange={(e) => setQuery(e.target.value)}
                                onClick={toggleSelect}
                                className={`w-full truncate bg-transparent px-2 font-medium text-cyan-900 outline-none ${
                                    disabled ? "cursor-not-allowed" : ""
                                }`}
                            />
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1">
                            {value && (
                                <button
                                    onClick={clearValue}
                                    className="rounded-full p-1 hover:bg-gray-200"
                                    type="button"
                                >
                                    <X className="h-4 w-4 text-gray-400" />
                                </button>
                            )}
                            <button onClick={toggleSelect} className="rounded-full p-1 hover:bg-gray-200" type="button">
                                {isOpen ? (
                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
            {isOpen && !isLoading && !isError && (
                <ul
                    className="absolute z-10 mt-1 max-h-[500px] overflow-y-auto rounded-xl border bg-white shadow-lg"
                    style={dropdownStyle}
                >
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={handleOptionClick(option)}
                            className="cursor-pointer truncate px-4 py-2 font-medium text-cyan-900 hover:bg-purple-50"
                            title={option.label}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
