import Keycloak from "keycloak-js";
import { keycloakConfig } from "./keycloakConfig.ts";

const keycloakInstance = new Keycloak(keycloakConfig);

export const keycloakUtils = {
    init: (options: any = {}): Promise<any> => keycloakInstance.init({ ...options }),

    login: () => keycloakInstance.login(),

    logout: (options?: any) => {
        keycloakInstance.logout(options);
    },

    updateToken: async (minValidity: number = 60) => {
        await keycloakInstance.updateToken(minValidity);
    },

    getToken: () => {
        return keycloakInstance.token;
    },

    getEmail: () => {
        return keycloakInstance.tokenParsed?.email || "";
    },

    getUsername: () => {
        return keycloakInstance.tokenParsed?.preferred_username || "";
    },

    isAuthenticated: () => {
        return !!keycloakInstance.token;
    },
};
