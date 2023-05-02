FROM rust:1.67

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y -q \
    build-essential pkg-config

WORKDIR /usr/src/kakaku_api

COPY . .

RUN cargo install --path .

CMD ["kakaku_api"]

EXPOSE 3340