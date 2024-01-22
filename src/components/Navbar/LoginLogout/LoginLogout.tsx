import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";
import { classNames } from "../../../utils/classNameUtils.ts";

export default function LoginLogout() {
    const getInitials = (email: string): string => {
        const parts = email.split("@")[0].split(".");
        return parts.map((part) => part[0].toUpperCase()).join("");
    };

    return (
        <div className="nset-auto absolute inset-y-0 right-0 ml-12 flex items-center pr-0 pr-2 sm:static">
            <Menu as="div" className="relative">
                <div>
                    {!keycloakUtils.isAuthenticated() ? (
                        <button
                            className="rounded bg-blue-900 px-4 py-2 font-bold text-white hover:bg-blue-800"
                            type="button"
                            onClick={() => keycloakUtils.login()}
                        >
                            Log in
                        </button>
                    ) : (
                        <Menu.Button>
                            <div className="mr-3 flex rounded-xl text-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-800">
                                    {keycloakUtils.getEmail() !== ""
                                        ? getInitials(keycloakUtils.getEmail())
                                        : keycloakUtils.getUsername()[0].toUpperCase()}
                                </div>
                            </div>
                        </Menu.Button>
                    )}
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => keycloakUtils.logout({ redirectUri: window.location.origin })}
                                    className={classNames(
                                        active ? "cursor-pointer bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700",
                                    )}
                                >
                                    Sign out
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
