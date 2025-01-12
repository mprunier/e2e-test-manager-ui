import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useEnvironments } from "./useEnvironments.ts";
import { EnvironmentCreate } from "../../Environment/Create/EnvironmentCreate.tsx";
import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";

export default function EnvironmentSelector() {
    const { environment, environmentsData, handleChangeEnvironment, isCreateModalOpen, setIsCreateModalOpen } =
        useEnvironments({});

    const isConnected = keycloakUtils.isAuthenticated();

    return (
        <>
            <div className="relative inline-block text-left">
                <Menu as="div" className="relative">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700 shadow-sm">
                        {environment?.description}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="-5 -3 24 24"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-50 mt-2 max-h-[400px] w-max origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {environmentsData &&
                                environmentsData.map((environment) => (
                                    <Menu.Item key={environment.id}>
                                        {({ active }) => (
                                            <a
                                                onClick={() => handleChangeEnvironment(environment)}
                                                className={`${
                                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                                } block px-4 py-2 text-sm`}
                                            >
                                                {environment.description}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            {isConnected && (
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={() => setIsCreateModalOpen(true)}
                                            className={`${
                                                active ? "bg-gray-100 text-gray-900" : "bg-gray-50 text-gray-700"
                                            } mt-2 flex cursor-pointer items-center justify-center`}
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
                                                    d="M12 4.5v15m7.5-7.5h-15"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </Menu.Item>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            {isCreateModalOpen && isConnected && (
                <EnvironmentCreate
                    handleChangeEnvironment={handleChangeEnvironment}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />
            )}
        </>
    );
}
