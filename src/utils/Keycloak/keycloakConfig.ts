export const keycloakConfig = {
    clientId: process.env.KEYCLOAK_CLIENT,
    "enable-cors": true,
    realm: process.env.KEYCLOAK_REALM,
    "ssl-required": "all",
    url: process.env.KEYCLOAK_URL,
};
