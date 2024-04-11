FROM rust:1.77.2-slim-bookworm as rust_build

RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config

COPY ./src /app/src
COPY ./Cargo.toml /app

WORKDIR /app

RUN cargo build -r

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config

WORKDIR /app

COPY --from=rust_build /app/target/release/kakaku_api ./

CMD ["./kakaku_api"]