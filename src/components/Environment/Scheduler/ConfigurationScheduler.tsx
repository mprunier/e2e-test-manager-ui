import { Controller } from "react-hook-form";
import { useUpdateConfigurationScheduler } from "../../../services/useUpdateConfigurationScheduler.tsx";
import { CheckBox } from "../../Common/CheckBox/CheckBox.tsx";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
import { EDayOfWeek } from "../../../constants.ts";

const displayLocalTime = (timeString: string): string => {
    if (/^\d{2}:\d{2}$/.test(timeString)) {
        return timeString;
    }
    const date = parseISO(timeString);
    return format(date, "HH:mm");
};

const ConfigurationScheduler = () => {
    const { control, update, isUpdateLoading } = useUpdateConfigurationScheduler();

    return (
        <form onSubmit={update} className="px-4 py-6">
            <div className="mb-4 flex items-center justify-center">
                <label className="mr-2 block text-sm font-bold text-gray-700">Enabled?</label>
                <Controller
                    name="isEnabled"
                    control={control}
                    defaultValue={true}
                    render={({ field: { value, onChange } }) => <CheckBox value={value} onChange={onChange} />}
                />
            </div>

            <div className="mb-4 flex items-center justify-center">
                <label className="mr-2 block text-sm font-bold text-gray-700">Scheduled Time:</label>
                <Controller
                    name="scheduledTime"
                    control={control}
                    render={({ field }) => (
                        <input
                            type="time"
                            {...field}
                            value={field.value ? displayLocalTime(field.value) : ""}
                            className="rounded border px-3 py-2 text-gray-700 shadow"
                        />
                    )}
                />
            </div>

            <div className="mb-4 flex items-center justify-center">
                {Object.values(EDayOfWeek).map((day) => (
                    <div className="mb-2 mr-4 flex items-center" key={day}>
                        <Controller
                            name="daysOfWeek"
                            control={control}
                            render={({ field }) => (
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={day}
                                        checked={field.value.includes(day)}
                                        onChange={() => {
                                            const newDaysOfWeek = field.value.includes(day)
                                                ? field.value.filter((d) => d !== day)
                                                : [...field.value, day];
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

export default ConfigurationScheduler;
