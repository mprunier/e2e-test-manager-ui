import { FC, Fragment } from "react";
import { RefreshCcw, X } from "lucide-react";
import { Popover, Transition } from "@headlessui/react";
import { IPipelineDetails } from "../../../interfaces/domain/IPipelineDetails.tsx";

interface TestPipelineIndicatorProps {
    pipelinesInProgress: IPipelineDetails[];
    onCancelPipeline: (id: string) => void;
    cancelIsLoading?: boolean;
}

export const PipelineIndicator: FC<TestPipelineIndicatorProps> = ({
    pipelinesInProgress,
    onCancelPipeline,
    cancelIsLoading,
}) => {
    return (
        <Popover className="relative inline-flex">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`flex items-center focus:outline-none ${
                            open ? "rounded-full ring-2 ring-blue-500 ring-opacity-50" : ""
                        }`}
                    >
                        <div className="relative inline-flex cursor-pointer items-center">
                            {pipelinesInProgress.length > 0 && (
                                <>
                                    <RefreshCcw className={`h-6 w-6 ${open ? "" : "animate-spin"} text-blue-500`} />
                                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-blue-600">
                                        {pipelinesInProgress.length}
                                    </span>
                                </>
                            )}
                        </div>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 mt-3 w-[400px] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative bg-white p-4">
                                    <ul className="space-y-2">
                                        {pipelinesInProgress.map((pipeline) => (
                                            <li
                                                key={pipeline.id}
                                                className="flex items-center justify-between rounded-3xl border-b bg-gray-100 px-4 py-2 text-sm last:border-b-0"
                                            >
                                                {pipeline.id && (
                                                    <>
                                                        <span className="text-gray-700">
                                                            Pipeline run by{" "}
                                                            <span className="font-semibold">{pipeline.createdBy}</span>.
                                                        </span>

                                                        <button
                                                            disabled={cancelIsLoading}
                                                            onClick={() => {
                                                                if (pipeline.id) {
                                                                    onCancelPipeline(pipeline.id);
                                                                }
                                                            }}
                                                            className="ml-2 rounded-full p-1 text-red-500 transition-colors duration-200 hover:bg-red-100"
                                                            title="Cancel pipeline"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                )}
                                                {pipeline.isAllTests && (
                                                    <span className="text-gray-700">
                                                        <span className="font-semibold">All tests</span> are running.
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};
