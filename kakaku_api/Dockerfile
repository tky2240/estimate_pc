FROM rust:1.67.1-slim-bookworm

COPY ./kakaku_api/src /app/src
COPY ./kakaku_api/Cargo.toml /app

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config
RUN cargo build -r

COPY ./.env ./
RUN cp ./target/release/kakaku_api ./

CMD ["./kakaku_api"]