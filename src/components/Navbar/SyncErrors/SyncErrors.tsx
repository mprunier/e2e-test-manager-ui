import { useGetSyncErrors } from "../../../services/useGetSyncErrors.tsx";
import Dropdown from "../../Common/Dropdown/Dropdown.tsx";
import { SyncErrorSVG } from "../../../assets/images/SyncErrorSVG.tsx";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { formatDateTime } from "../../../utils/dateUtils.ts";

export const SyncErrors = () => {
    const { errorsData, getSyncErrorsState } = useGetSyncErrors();
    const errorsCount = errorsData ? errorsData.length : -1;

    return (
        <div className="relative inline-flex">
            <Tooltip
                disabled={errorsCount > 0}
                content={
                    getSyncErrorsState.error
                        ? getSyncErrorsState.error.detail
                        : `It seems that you do not have any configuration errors in your Cypress files. Well done! 👌`
                }
                position="bottom"
            >
                <Dropdown
                    button={
                        <SyncErrorSVG
                            errorsCount={errorsCount}
                            pointer={errorsCount > 0 && !getSyncErrorsState.error}
                        />
                    }
                    animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                    children={
                        errorsCount > 0 && !getSyncErrorsState.error ? (
                            <div className="flex max-h-[300px] w-[600px] flex-col gap-3 overflow-y-auto rounded-[20px] bg-white  p-4 shadow-xl shadow-gray-200">
                                <div className=" flex items-center justify-center text-center text-xs font-bold text-cyan-900">
                                    Git Synchronization Error(s)
                                </div>
                                {errorsData?.map((error) => (
                                    <button
                                        className="flex w-full items-center"
                                        key={`${error.at}  ${error.file} + ${error.error}`}
                                    >
                                        <>
                                            <div className="flex w-[85px] items-center justify-center  rounded-2xl bg-gray-100 px-2 py-3 text-xs font-semibold text-gray-400">
                                                {formatDateTime(new Date(error.at.toLocaleString()))}
                                            </div>
                                            <div className="ml-2 flex h-full w-full flex-col justify-center  rounded-2xl bg-gray-50 px-2 py-2 text-sm ">
                                                <p className="mb-1 text-left text-xs font-light text-amber-800">
                                                    {error.file}
                                                </p>
                                                <p className="font-base text-left text-xs text-red-800">
                                                    {error.error}
                                                </p>
                                            </div>
                                        </>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div />
                        )
                    }
                    classNames={"py-2 top-6 -left-[550px] w-max"}
                />
            </Tooltip>
            {getSyncErrorsState.error && (
                <span className="absolute -right-2 top-0 -mr-1 -mt-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full  rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
                </span>
            )}
            {!getSyncErrorsState.error && errorsCount > 0 && (
                <span className="absolute -right-2 -top-1 -mr-1 -mt-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                </span>
            )}
            {!getSyncErrorsState.error && errorsCount === 0 && (
                <span className="absolute -right-2 top-0 -mr-1 -mt-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full  rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
            )}
        </div>
    );
};
