import { useForm } from "react-hook-form";
import { createEnvironmentApiRoute } from "../endpoints/privateEndpoints.ts";
import { IEnvironment } from "../interfaces/domain/IEnvironment.ts";
import { buildEnvironmentForm } from "../components/Environment/environmentFormMapper.ts";
import { useFetchState } from "../hooks/useFetchState.ts";
import { Dispatch, SetStateAction } from "react";
import { useGetEnvironments } from "./useGetAllEnvironments.ts";
import { ICreateUpdateEnvironmentPayload } from "../interfaces/payloads/ICreateUpdateEnvironmentPayload.ts";

interface IParams {
    handleChangeEnvironment: (environmentSelected: IEnvironment) => void;
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useCreateEnvironment = (props: IParams) => {
    const { handleChangeEnvironment, setIsCreateModalOpen } = props;
    const { isLoading, startFetching, endFetchingError, endFetchingSuccess } = useFetchState();

    const mutateEnvironments = useGetEnvironments().mutateEnvironments;

    const defaultValues: ICreateUpdateEnvironmentPayload = buildEnvironmentForm();
    const formMethods = useForm<ICreateUpdateEnvironmentPayload>({
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
            const environmentResponse = await createEnvironmentApiRoute(formData);
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
