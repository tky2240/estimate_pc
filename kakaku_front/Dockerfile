FROM node:18-alpine as npm_builder

WORKDIR /app

COPY ./kakaku_front/src /app/src
COPY ./kakaku_front/public /app/public
COPY ./kakaku_front/tsconfig.json /app
COPY ./kakaku_front/package.json /app

RUN npm install

COPY ./.env /app

RUN npm run build

FROM dunglas/frankenphp

RUN apt-get update && apt-get install -y \
    libxml2-dev \
    git

RUN docker-php-ext-install dom

COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer require "ivopetkov/html5-dom-document-php:2.*"

COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=npm_builder /app/build/* /srv/

# CMD ["/usr/bin/caddy", "run", "--config", "/etc/Caddyfile"]

