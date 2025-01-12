import { useCreateEnvironment } from "../../../services/useCreateEnvironment.ts";
import { Dispatch, SetStateAction } from "react";
import type { EnvironmentResponse } from "../../../api";

interface IParams {
    handleChangeEnvironment: (environmentSelected: EnvironmentResponse) => void;
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const EnvironmentCreateForm = (props: IParams) => {
    const { handleChangeEnvironment, setIsCreateModalOpen } = props;
    const { update, isLoading, register, errors } = useCreateEnvironment({
        handleChangeEnvironment,
        setIsCreateModalOpen,
    });

    return (
        <form onSubmit={update} className="mx-auto my-4 max-w-6xl space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                </label>
                <input
                    id="description"
                    {...register("description", { required: "Description is required" })}
                    type="text"
                    className={`w-full rounded-md border p-2 ${
                        errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="projectId" className="text-sm font-medium text-gray-700">
                    Project ID
                </label>
                <input
                    id="projectId"
                    {...register("projectId", { required: "Project ID is required" })}
                    type="text"
                    className={`w-full rounded-md border p-2 ${
                        errors.projectId ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.projectId && <p className="mt-1 text-xs text-red-600">{errors.projectId.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="branch" className="text-sm font-medium text-gray-700">
                    Branch
                </label>
                <input
                    id="branch"
                    {...register("branch", { required: "Branch is required" })}
                    type="text"
                    className={`w-full rounded-md border p-2 ${errors.branch ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.branch && <p className="mt-1 text-xs text-red-600">{errors.branch.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="token" className="text-sm font-medium text-gray-700">
                    Token
                </label>
                <input
                    id="token"
                    {...register("token", { required: "Token is required" })}
                    type="text"
                    className={`w-full rounded-md border p-2 ${errors.token ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.token && <p className="mt-1 text-xs text-red-600">{errors.token.message}</p>}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="maxParallelWorkers" className="text-sm font-medium text-gray-700">
                    Max Parallel Test Number (When all tests are run)
                </label>
                <input
                    id="maxParallelWorkers"
                    {...register("maxParallelWorkers", {
                        required: "Max Parallel Test Number is required",
                    })}
                    type="number"
                    min="1"
                    max="8"
                    step="1"
                    className={`w-full rounded-md border p-2 ${
                        errors.maxParallelWorkers ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.maxParallelWorkers && (
                    <p className="mt-1 text-xs text-red-600">{errors.maxParallelWorkers.message}</p>
                )}
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className={`hover:bg-blue-700" cursor-pointer rounded-full bg-blue-500 px-4 py-2 font-bold text-white`}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create"}
                </button>
            </div>
        </form>
    );
};
