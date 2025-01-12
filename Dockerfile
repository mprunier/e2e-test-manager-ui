FROM maxpnr/nginx-unprivileged
COPY ./dist /usr/share/nginx/html
COPY ./public /data

COPY ./docker-entrypoint.sh /
USER root
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
