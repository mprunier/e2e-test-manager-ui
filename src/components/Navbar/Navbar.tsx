import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classNameUtils.ts";
import LoginLogout from "./LoginLogout/LoginLogout.tsx";
import EnvironmentSelector from "./EnvironmentSelector/EnvironmentSelector.tsx";
import { keycloakUtils } from "../../utils/Keycloak/keycloakUtils.ts";
import { SyncErrors } from "./SyncErrors/SyncErrors.tsx";

export default function Navbar() {
    const location = useLocation();

    const navigation = [{ name: "Dashboard", to: "/", current: location.pathname === "/" }];

    const isConnected = keycloakUtils.isAuthenticated();
    if (isConnected) {
        navigation.push({
            name: "Configuration",
            to: "/configuration",
            current: location.pathname === "/configuration",
        });
    }
    // navigation.push({ name: "Helper", to: "/helper", current: location.pathname === "/helper" });

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="/images/favicon.ico" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link key={item.name} to={item.to}>
                                        <div
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "rounded-md px-3 py-2 text-sm font-medium",
                                            )}
                                            aria-current={item.current ? "page" : undefined}
                                        >
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <EnvironmentSelector />
                    <SyncErrors />
                    <LoginLogout />
                </div>
            </div>
        </Disclosure>
    );
}
