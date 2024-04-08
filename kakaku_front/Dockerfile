FROM node:18-alpine as npm_builder

WORKDIR /app

COPY ./kakaku_front/src /app/src
COPY ./kakaku_front/public /app/public
COPY ./kakaku_front/tsconfig.json /app
COPY ./kakaku_front/package.json /app

COPY ./.env /app

RUN npm install
RUN npm run build

FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    libxml2-dev \
    git
RUN docker-php-ext-install dom

WORKDIR /src

RUN curl -o ./composer-setup.php https://getcomposer.org/installer
RUN php ./composer-setup.php
RUN mv ./composer.phar /usr/local/bin/composer
RUN composer require "ivopetkov/html5-dom-document-php:2.*"

RUN apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list

RUN apt-get update && apt-get install -y \
    caddy

COPY ./Caddyfile /etc/Caddyfile
COPY --from=npm_builder /app/build/* /srv/

CMD ["/usr/bin/caddy", "--conf", "/etc/Caddyfile", "--log", "stdout"]

