import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "./../environment.d";
import { keycloakUtils } from "./utils/Keycloak/keycloakUtils.ts";
import { Error } from "./components/Common/Error/Error.tsx";
import { AppProviders } from "./AppProviders.tsx";
import { EventProvider } from "./providers/EventProvider.tsx";
import { EnvironmentProvider } from "./providers/EnvironmentProvider.tsx";
import "./api/config";
import pkg from "../package.json";

const APP_VERSION = pkg.version;

if (localStorage.getItem("appVersion") !== APP_VERSION) {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("appVersion", APP_VERSION);
    window.location.reload();
}

keycloakUtils
    .init({ onLoad: "login-required", checkLoginIframe: false })
    .then(() => {
        ReactDOM.createRoot(document.getElementById("root")!).render(
            <EnvironmentProvider>
                <EventProvider>
                    <React.StrictMode>
                        <BrowserRouter>
                            <AppProviders />
                        </BrowserRouter>
                    </React.StrictMode>
                </EventProvider>
            </EnvironmentProvider>,
        );
    })
    .catch((error) => {
        console.error("Error initializing Keycloak:", error);
        ReactDOM.createRoot(document.getElementById("root")!).render(
            <React.StrictMode>
                <BrowserRouter>
                    <Error status={500} errorMessage={"Error initializing Keycloak"} />;
                </BrowserRouter>
            </React.StrictMode>,
        );
    });
