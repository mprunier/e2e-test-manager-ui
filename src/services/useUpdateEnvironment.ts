import { useFieldArray, useForm } from "react-hook-form";
import { putEnvironmentApiRoute } from "../endpoints/privateEndpoints.ts";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { buildEnvironmentForm } from "../components/Environment/environmentFormMapper.ts";
import { useFetchState } from "../hooks/useFetchState.ts";
import { useEffect } from "react";
import { useSwrGetEnvironmentDetails } from "./useGetEnvironmentDetails.ts";
import { ICreateUpdateEnvironmentPayload } from "../interfaces/payloads/ICreateUpdateEnvironmentPayload.ts";

interface IParams {
    environment: IEnvironment;
}

export const useUpdateEnvironment = ({ environment }: IParams) => {
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();
    const mutateEnvironment = useSwrGetEnvironmentDetails(environment?.id).mutate;

    const defaultValues: ICreateUpdateEnvironmentPayload = buildEnvironmentForm(environment);
    const formMethods = useForm<ICreateUpdateEnvironmentPayload>({
        defaultValues,
        shouldUnregister: true,
    });
    const {
        control,
        register,
        reset,
        formState: { errors },
    } = formMethods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variables",
    });
    const addVariable = () => {
        append({
            name: "",
            description: "",
            defaultValue: "",
            isHidden: false,
        });
    };

    const removeVariable = (index: number) => {
        remove(index);
    };

    useEffect(() => {
        reset(defaultValues);
    }, [environment, reset]);

    const update = formMethods.handleSubmit(async (formData) => {
        startFetching();
        try {
            await putEnvironmentApiRoute(environment.id, formData);
            await mutateEnvironment();
            endFetchingSuccess("Environment updated !");
        } catch (error) {
            endFetchingError(error);
        }
    });

    return {
        update,
        isLoading,
        addVariable,
        removeVariable,
        fields,
        register,
        control,
        errors,
    };
};
