import React, { useEffect, useRef, useState } from "react";
import { useRunOneSuiteOrTest } from "../../../services/useRunOneSuiteOrTest.ts";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";

interface IParams {
    configurationTestId?: number;
    configurationSuiteId?: number;
    disabled?: boolean;
    isConnected?: boolean;
    variables?: string[];
    isTestLoading?: boolean;
}

const RunActionButton = (props: IParams) => {
    const { configurationTestId, configurationSuiteId, disabled, isConnected, variables, isTestLoading } = props;

    const { isLoading, run, isModalOpen, setIsModalOpen } = useRunOneSuiteOrTest();

    const modalRef = useRef<HTMLDivElement>(null);

    const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isModalOpen, setIsModalOpen]);

    const hasVariables = variables && variables.length > 0;

    const buttonLabel = configurationTestId ? "Run" : "Run Suite";

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasVariables) {
            setIsModalOpen(true);
        } else {
            run({ configurationTestId, configurationSuiteId }).then();
        }
    };

    const getTooltipContent = (variables: string[] | undefined) => {
        if (!isConnected) return "You must be logged in to perform this action.";
        return (
            <>
                {variables && (
                    <>
                        This test contains one or more variables : <br />
                        {variables.map((variable, index) => (
                            <div key={variable} className={"font-bold"}>
                                {variable}
                                {index < variables.length - 1 ? <br /> : null}
                            </div>
                        ))}
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <Tooltip
                content={getTooltipContent(variables)}
                position="bottom"
                disabled={isConnected && !hasVariables}
                size={"w-80"}
            >
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={isLoading || disabled}
                    className={`ml-10 inline-flex h-7 w-[90px] items-center justify-center rounded text-center text-sm font-medium text-white focus:outline-none focus:ring-1 ${
                        isLoading || disabled
                            ? "cursor-not-allowed bg-gray-300"
                            : "bg-cyan-900 hover:bg-cyan-800 focus:ring-cyan-800"
                    }`}
                >
                    {isLoading || isTestLoading ? <LoadingSVG /> : buttonLabel}
                </button>
            </Tooltip>
            {isModalOpen && variables && (
                <div
                    id="modal-backdrop"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    ref={modalRef}
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        setIsModalOpen(false);
                    }}
                >
                    <div
                        className="max-h-3/4 h-auto w-1/2 overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 rounded-md border border-blue-200 bg-blue-50 px-4  text-blue-400">
                            <div className="font-normal">
                                ℹ️ These variables are essential for uniquely launching a suite or test. They typically
                                inherit from another suite or test.
                            </div>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const variablesRequest = Object.keys(variableValues).map((name) => ({
                                    name,
                                    value: variableValues[name],
                                }));
                                run({ configurationTestId, configurationSuiteId, variables: variablesRequest }).then(
                                    () => {
                                        setIsModalOpen(false);
                                    },
                                );
                            }}
                        >
                            {variables.map((variable) => (
                                <div key={variable} className="mb-4 flex items-center">
                                    <label htmlFor={variable} className="mr-4 block text-sm font-medium text-gray-700">
                                        {variable}
                                    </label>
                                    <input
                                        type="text"
                                        name={variable}
                                        id={variable}
                                        className="mt-1 block w-full flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                                        value={variableValues[variable] || ""}
                                        onChange={(e) =>
                                            setVariableValues({
                                                ...variableValues,
                                                [variable]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            ))}
                            <div className="mt-8 flex justify-center">
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className={`inline-flex w-[200px] items-center rounded-md bg-cyan-900 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800  ${
                                        isLoading || disabled
                                            ? "cursor-not-allowed bg-gray-300"
                                            : "bg-cyan-900 hover:bg-cyan-800 focus:ring-cyan-800"
                                    }`}
                                >
                                    {isLoading || isTestLoading ? <LoadingSVG /> : <> Run with these variables</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default RunActionButton;
