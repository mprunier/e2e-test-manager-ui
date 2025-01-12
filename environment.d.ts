declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_URL: string;
            API_WEBSOCKET_URL: string;
            KEYCLOAK_REALM: string;
            KEYCLOAK_CLIENT: string;
            KEYCLOAK_URL: string;
            KEYCLOAK_JS_URL: string;
        }
    }
}

export {};
