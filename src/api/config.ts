import { keycloakUtils } from "../utils/Keycloak/keycloakUtils.ts";
import { OpenAPI } from "./index";

OpenAPI.TOKEN = () => Promise.resolve(keycloakUtils.getToken() || "");
OpenAPI.BASE = `${process.env.API_URL}`;

export { OpenAPI };
