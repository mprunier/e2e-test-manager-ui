import { useUpdateEnvironment } from "../../../services/useUpdateEnvironment.ts";
import { IEnvironment } from "../../../interfaces/domain/IEnvironment.ts";
import { Controller } from "react-hook-form";

interface IParams {
    environment: IEnvironment;
}

export const EnvironmentUpdateForm = (props: IParams) => {
    const { environment } = props;
    const { update, isLoading, addVariable, removeVariable, fields, register, control, errors } = useUpdateEnvironment({
        environment,
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
                <label className="text-sm font-medium text-gray-700">Variables</label>
                <ul className="space-y-4">
                    {fields.map((field, index) => (
                        <li key={field.id} className="flex items-start">
                            <Controller
                                name={`variables.${index}.name`}
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field, fieldState }) => (
                                    <div className="flex w-1/3 flex-col pr-4">
                                        <input
                                            {...field}
                                            placeholder="Name"
                                            className={`rounded-md border p-2 ${
                                                fieldState.error ? "border-red-500" : ""
                                            }`}
                                        />
                                        {fieldState.error && (
                                            <span className="mt-1 text-xs text-red-500">
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`variables.${index}.defaultValue`}
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field, fieldState }) => (
                                    <div className="flex w-1/3 flex-col">
                                        <input
                                            {...field}
                                            placeholder="Default Value"
                                            className={`rounded-md border p-2 ${
                                                fieldState.error ? "border-red-500" : ""
                                            }`}
                                        />
                                        {fieldState.error && (
                                            <span className="mt-1 text-xs text-red-500">
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                            <Controller
                                name={`variables.${index}.isHidden`}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-start pr-4">
                                        <button
                                            type="button"
                                            onClick={() => field.onChange(!field.value)}
                                            className={`p-2 ${field.value ? "text-gray-400" : "text-blue-600"}`}
                                        >
                                            {field.value ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                )}
                            />
                            <Controller
                                name={`variables.${index}.description`}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex w-1/3 flex-col pr-4">
                                        <input {...field} placeholder="Description" className="rounded-md border p-2" />
                                    </div>
                                )}
                            />

                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => removeVariable(index)}
                                    className="p-2 text-red-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={addVariable} className="mt-4 text-blue-500">
                    Add Variable
                </button>
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="mt-4  h-8 cursor-pointer rounded-2xl  bg-cyan-900 px-4 font-medium text-white hover:bg-cyan-800"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};
