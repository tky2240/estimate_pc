FROM node:18-alpine as npm_builder

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

COPY ./src /app/src
COPY ./public /app/public
COPY ./tsconfig.json /app


RUN npm run build

FROM dunglas/frankenphp

RUN apt-get update && apt-get install -y \
    libxml2-dev \
    git

RUN docker-php-ext-install dom

COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer require -d /usr/local/lib/php "ivopetkov/html5-dom-document-php:2.*"

COPY --from=npm_builder /app/build /srv
