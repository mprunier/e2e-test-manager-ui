import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFetchState } from "../hooks/useFetchState";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext";
import { useGetConfigurationScheduler } from "./useGetConfigurationScheduler";
import { SchedulerApiService, type SchedulerResponse, type UpdateSchedulerRequest } from "../api";

export const buildSchedulerForm = (schedulerResponse?: SchedulerResponse): UpdateSchedulerRequest => {
    return {
        isEnabled: schedulerResponse?.isEnabled ?? false,
        hour: schedulerResponse?.hour ?? 0,
        minute: schedulerResponse?.minute ?? 0,
        daysOfWeek: schedulerResponse?.daysOfWeek ?? [],
    };
};

export const useUpdateConfigurationScheduler = () => {
    const { environment } = useEnvironmentContext();
    const { isLoading: isUpdateLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();
    const { configurationSchedulerData, mutateConfigurationScheduler } = useGetConfigurationScheduler();

    const defaultValues: UpdateSchedulerRequest = buildSchedulerForm(configurationSchedulerData);
    const formMethods = useForm<UpdateSchedulerRequest>({
        defaultValues,
        shouldUnregister: true,
    });
    const { control } = formMethods;

    useEffect(() => {
        if (configurationSchedulerData) {
            formMethods.reset(buildSchedulerForm(configurationSchedulerData));
        }
    }, [configurationSchedulerData, formMethods]);

    const update = formMethods.handleSubmit(async (formData) => {
        startFetching();

        try {
            await SchedulerApiService.update(environment?.id as string, formData);
            await mutateConfigurationScheduler(
                {
                    ...configurationSchedulerData,
                    ...formData,
                },
                false,
            );
            endFetchingSuccess("Scheduler updated!");
        } catch (error) {
            endFetchingError(error);
        }
    });

    return {
        control,
        update,
        isUpdateLoading,
    };
};
