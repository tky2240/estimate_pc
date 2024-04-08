FROM node:18-alpine as npm_builder

WORKDIR /app

COPY ./* /app
COPY ../.env /src/

RUN npm build

FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    php-dom

RUN wget -O composer-setup.php https://getcomposer.org/installer

RUN composer require -d /usr/share/php "ivopetkov/html5-dom-document-php:2.*"

RUN apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list

RUN apt-get update && apt-get install -y \
    caddy

COPY ./Caddyfile /etc/Caddyfile
COPY --from=npm_builder /src/build/* /srv/

CMD ["/usr/bin/caddy", "--conf", "/etc/Caddyfile", "--log", "stdout"]

