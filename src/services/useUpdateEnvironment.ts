import { useFieldArray, useForm } from "react-hook-form";
import { buildEnvironmentForm } from "../components/Environment/environmentFormMapper.ts";
import { useFetchState } from "../hooks/useFetchState.ts";
import { useEffect } from "react";
import { useSwrGetEnvironmentDetails } from "./useGetEnvironmentDetails.ts";
import { type CreateUpdateEnvironmentRequest, EnvironmentApiService, type EnvironmentDetailsResponse } from "../api";

interface IParams {
    environment: EnvironmentDetailsResponse;
}

export const useUpdateEnvironment = ({ environment }: IParams) => {
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();
    const mutateEnvironment = useSwrGetEnvironmentDetails(environment?.id).mutate;

    const defaultValues: CreateUpdateEnvironmentRequest = buildEnvironmentForm(environment);
    const formMethods = useForm<CreateUpdateEnvironmentRequest>({
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
            value: "",
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
            await EnvironmentApiService.update(environment.id, formData);
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
