import React, { useState } from "react";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";
import type { Option } from "../../Common/SelectWithSearch/SelectWithSearch.tsx";
import { SelectWithSearch } from "../../Common/SelectWithSearch/SelectWithSearch.tsx";
import { useRunByGroup } from "../../../services/useRunByGroup.ts";
import { useGetSearchSelects } from "../../../services/useGetSearchSelects.ts";
import { ISelectOption } from "../../../interfaces/ISelectOption.tsx";
import { useIsRunningByGroup } from "../../../hooks/useIsRunningByGroup.ts";

interface IParams {
    disabled?: boolean;
    isConnected?: boolean;
}

interface GroupOption {
    value: string;
    label: string;
}

export const RunAllByGroupButton = (props: IParams) => {
    const { disabled, isConnected } = props;
    const { isRunningByGroup } = useIsRunningByGroup();
    const { isLoading, runByGroup, isModalOpen, setIsModalOpen, modalRef } = useRunByGroup();
    const [selectedGroup, setSelectedGroup] = useState<GroupOption | null>(null);
    const { criteriaData } = useGetSearchSelects();
    const availableGroups: ISelectOption[] =
        criteriaData?.tags?.reduce<ISelectOption[]>((acc, tag) => {
            if (tag.value) {
                acc.push({ value: tag.value, label: tag.value });
            }
            return acc;
        }, []) ?? [];

    const handleGroupChange = (option: Option | null) => {
        if (option === null) {
            setSelectedGroup(null);
        } else {
            setSelectedGroup({
                value: String(option.value),
                label: option.label,
            });
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const getTooltipContent = () => {
        if (!isConnected) return "You must be logged in to perform this action.";
        return "Run tests by group name";
    };

    if (availableGroups.length < 0) {
        return null;
    }

    return (
        <>
            <Tooltip content={getTooltipContent()} position="bottom" disabled={isConnected} size={"w-80"}>
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={isLoading || disabled}
                    className={`ml-2 inline-flex h-7 w-[120px] items-center justify-center rounded text-center text-sm font-medium text-white focus:outline-none focus:ring-1 ${
                        isLoading || disabled
                            ? "cursor-not-allowed bg-gray-300"
                            : "bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-600"
                    }`}
                >
                    {isLoading || isRunningByGroup ? <LoadingSVG /> : "Run by Group"}
                </button>
            </Tooltip>
            {isModalOpen && (
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
                        className="h-auto max-h-[80vh] w-1/2 rounded-lg bg-white p-8 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 rounded-md border border-blue-200 bg-blue-50 px-4 text-blue-400">
                            <div className="font-normal">
                                ℹ️ Select a group name to run all tests within that group.
                            </div>
                        </div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (selectedGroup) {
                                    await runByGroup(selectedGroup.value);
                                    setSelectedGroup(null);
                                }
                            }}
                        >
                            <div className="mb-4 flex items-center">
                                <label htmlFor="groupName" className="mr-4 block text-sm font-medium text-gray-700">
                                    Group Name
                                </label>
                                <div className="w-full">
                                    <SelectWithSearch
                                        options={availableGroups}
                                        value={selectedGroup}
                                        onChange={handleGroupChange}
                                        placeholder="Select a group"
                                        noOptionPlaceholder="No groups available"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button
                                    disabled={isLoading || !selectedGroup}
                                    type="submit"
                                    className={`inline-flex w-[200px] items-center rounded-md px-4 py-2 text-sm font-medium text-white ${
                                        isLoading || disabled || !selectedGroup
                                            ? "cursor-not-allowed bg-gray-300"
                                            : "bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-600"
                                    }`}
                                >
                                    {isLoading || isRunningByGroup ? <LoadingSVG /> : "Run with this group"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
