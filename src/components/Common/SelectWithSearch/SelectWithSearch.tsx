import { FC, useEffect, useRef, useState } from "react";

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
    const selectRef = useRef(null);

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
        const handleClickOutside = (event: Event) => {
            // @ts-ignore
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
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
                    isError ? `bg-red-50` : `bg-white`
                } ${disabled ? `bg-gray-50` : `bg-purple-50`}`}
            >
                {isLoading && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <svg
                            className="h-5 w-5 animate-spin text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                )}
                {!isLoading && !isError && (
                    <>
                        <input
                            disabled={disabled}
                            type="text"
                            placeholder={placeholder}
                            value={value ? value.label : query}
                            onChange={(e) => setQuery(e.target.value)}
                            onClick={toggleSelect}
                            className={`flex-grow truncate bg-purple-50 pl-3 font-medium text-cyan-900 outline-none ${
                                disabled ? `bg-gray-50` : `bg-white`
                            }`}
                        />
                        {value && (
                            <span onClick={clearValue} className="cursor-pointer p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </svg>
                            </span>
                        )}
                        <span onClick={toggleSelect} className="cursor-pointer p-2">
                            {isOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            )}
                        </span>
                    </>
                )}

                {isError && (
                    <div className="absolute left-1/2 top-3 mt-2 -translate-x-1/2 -translate-y-1/2 transform text-center font-bold text-red-300">
                        Error loading...
                    </div>
                )}
            </div>
            {isOpen && !isLoading && !isError && (
                <ul className="absolute z-10 mt-1  max-h-[500px] w-max overflow-y-auto  rounded border bg-white">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={handleOptionClick(option)}
                            className="cursor-pointer bg-purple-50 p-2 font-medium text-cyan-900 hover:bg-gray-200"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
