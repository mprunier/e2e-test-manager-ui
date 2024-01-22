#!/bin/sh
set -e

sed -i "s@{API_URL}@$API_URL@g" /usr/share/nginx/html/**/*.js

sed -i "s@{API_WEBSOCKET_URL}@$API_WEBSOCKET_URL@g" /usr/share/nginx/html/**/*.js

sed -i "s@{KEYCLOAK_URL}@$KEYCLOAK_URL@g" /usr/share/nginx/html/**/*.js

sed -i "s@{KEYCLOAK_REALM}@$KEYCLOAK_REALM@g" /usr/share/nginx/html/**/*.js

sed -i "s@{KEYCLOAK_CLIENT}@$KEYCLOAK_CLIENT@g" /usr/share/nginx/html/**/*.js

sed -i "s@{KEYCLOAK_JS_URL}@$KEYCLOAK_JS_URL@g" /usr/share/nginx/html/index.html

nginx -g "daemon off;"
