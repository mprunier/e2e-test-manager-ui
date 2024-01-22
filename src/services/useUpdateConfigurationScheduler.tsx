import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFetchState } from "../hooks/useFetchState.ts";
import { putUpdateSchedulerApiRoute } from "../endpoints/privateEndpoints.ts";
import { convertToISOString } from "../utils/dateUtils.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { useGetConfigurationScheduler } from "./useGetConfigurationScheduler.tsx";
import { IUpdateConfigurationSchedulerPayload } from "../interfaces/payloads/IUpdateConfigurationSchedulerPayload.tsx";
import { IConfigurationScheduler } from "../interfaces/domain/IConfigurationScheduler.tsx";

export const buildSchedulerForm = (
    configurationSchedulerResponse?: IConfigurationScheduler,
): IUpdateConfigurationSchedulerPayload => {
    return {
        isEnabled: configurationSchedulerResponse?.isEnabled ?? true,
        scheduledTime: configurationSchedulerResponse?.scheduledTime ?? new Date().toISOString(),
        daysOfWeek: configurationSchedulerResponse?.daysOfWeek ?? [],
    };
};

export const useUpdateConfigurationScheduler = () => {
    const { environment } = useEnvironmentContext();
    const { isLoading: isUpdateLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();
    const { configurationSchedulerData, mutateConfigurationScheduler } = useGetConfigurationScheduler();

    const defaultValues: IUpdateConfigurationSchedulerPayload = buildSchedulerForm(configurationSchedulerData);
    const formMethods = useForm<IUpdateConfigurationSchedulerPayload>({
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

        if (/^\d{2}:\d{2}$/.test(formData.scheduledTime)) {
            formData.scheduledTime = convertToISOString(formData.scheduledTime);
        }

        try {
            await putUpdateSchedulerApiRoute(environment?.id as number, formData);
            await mutateConfigurationScheduler();
            endFetchingSuccess("Scheduler updated !");
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
