import { useForm } from "react-hook-form";
import { buildEnvironmentForm } from "../components/Environment/environmentFormMapper.ts";
import { useFetchState } from "../hooks/useFetchState.ts";
import { Dispatch, SetStateAction } from "react";
import { useGetEnvironments } from "./useGetAllEnvironments.ts";
import { type CreateUpdateEnvironmentRequest, EnvironmentApiService } from "../api";

interface IParams {
    handleChangeEnvironment: (environmentSelected: CreateUpdateEnvironmentRequest) => void;
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useCreateEnvironment = (props: IParams) => {
    const { handleChangeEnvironment, setIsCreateModalOpen } = props;
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const mutateEnvironments = useGetEnvironments().mutateEnvironments;

    const defaultValues: CreateUpdateEnvironmentRequest = buildEnvironmentForm();
    const formMethods = useForm<CreateUpdateEnvironmentRequest>({
        defaultValues,
        shouldUnregister: true,
    });
    const {
        control,
        register,
        formState: { errors },
    } = formMethods;

    const update = formMethods.handleSubmit(async (formData) => {
        startFetching();
        try {
            const environmentResponse = await EnvironmentApiService.create(formData);
            await mutateEnvironments();
            handleChangeEnvironment(environmentResponse);
            endFetchingSuccess("Environment created !");
            setIsCreateModalOpen(false);
        } catch (error) {
            endFetchingError(error);
        }
    });

    return {
        update,
        isLoading,
        register,
        control,
        errors,
    };
};
