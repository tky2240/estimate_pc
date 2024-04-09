FROM rust:1.67.1-slim-bookworm as rust_build

RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config

COPY ./kakaku_api/src /app/src
COPY ./kakaku_api/Cargo.toml /app

WORKDIR /app

RUN cargo build -r

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config

COPY ./.env ./
COPY --from=rust_build /app/target/release/kakaku_api ./

CMD ["./kakaku_api"]