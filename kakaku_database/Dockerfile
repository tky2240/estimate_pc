FROM rust:1.67

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y -q \
    build-essential pkg-config python3-dev

WORKDIR /usr/src/kakaku_database

COPY . .

RUN cargo install --path .

CMD ["kakaku_database"]