import { Controller } from "react-hook-form";
import { useUpdateConfigurationScheduler } from "../../../services/useUpdateConfigurationScheduler";
import { CheckBox } from "../../Common/CheckBox/CheckBox";
import { DayOfWeek } from "../../../api";

export const ConfigurationScheduler = () => {
    const { control, update, isUpdateLoading } = useUpdateConfigurationScheduler();

    return (
        <form onSubmit={update} className="px-4 py-6">
            <div className="mb-4 flex items-center justify-center">
                <label className="mr-2 block text-sm font-bold text-gray-700">Enabled?</label>
                <Controller
                    name="isEnabled"
                    control={control}
                    defaultValue={false}
                    render={({ field: { value, onChange } }) => <CheckBox value={value} onChange={onChange} />}
                />
            </div>

            <div className="mb-4 flex items-center justify-center">
                <label className="mr-2 block text-sm font-bold text-gray-700">Time:</label>
                <div className="flex items-center">
                    <Controller
                        name="hour"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                min={0}
                                max={23}
                                {...field}
                                className="mr-2 w-20 rounded border px-3 py-2 text-gray-700 shadow"
                            />
                        )}
                    />
                    <span className="mr-2">:</span>
                    <Controller
                        name="minute"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                min={0}
                                max={59}
                                {...field}
                                className="w-20 rounded border px-3 py-2 text-gray-700 shadow"
                            />
                        )}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-center justify-center">
                <label className="mr-2 block text-sm font-bold text-gray-700">Days of Week:</label>
                <div className="flex flex-wrap justify-center">
                    {Object.values(DayOfWeek).map((day) => (
                        <div className="mb-2 mr-4 flex items-center" key={day}>
                            <Controller
                                name="daysOfWeek"
                                control={control}
                                render={({ field }) => (
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={day}
                                            checked={field.value?.includes(day)}
                                            onChange={(e) => {
                                                const newDaysOfWeek = e.target.checked
                                                    ? [...(field.value || []), day]
                                                    : (field.value || []).filter((d) => d !== day);
                                                field.onChange(newDaysOfWeek);
                                            }}
                                            className="form-checkbox mr-2 h-5 w-5 text-gray-600"
                                        />
                                        <span className="text-gray-700">{day}</span>
                                    </label>
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="mt-4 h-8 cursor-pointer rounded-2xl bg-cyan-900 px-4 font-medium text-white hover:bg-cyan-800"
                    disabled={isUpdateLoading}
                >
                    {isUpdateLoading ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};
