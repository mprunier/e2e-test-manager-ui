import { IEnvironment } from "../../../interfaces/domain/IEnvironment.ts";
import React, { Dispatch, SetStateAction } from "react";
import { EnvironmentCreateForm } from "./EnvironmentCreateForm.tsx";

interface IParams {
    handleChangeEnvironment: (environmentSelected: IEnvironment) => void;
    setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const EnvironmentCreate = (props: IParams) => {
    const { handleChangeEnvironment, setIsCreateModalOpen } = props;

    return (
        <div
            className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsCreateModalOpen(false);
            }}
        >
            <div
                className="max-h-3/4 h-auto w-1/2 overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <EnvironmentCreateForm
                    handleChangeEnvironment={handleChangeEnvironment}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />
            </div>
        </div>
    );
};
