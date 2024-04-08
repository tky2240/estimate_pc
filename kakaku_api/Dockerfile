FROM rust:1.67.1-slim-bookworm

COPY ./kakaku_api/src /app
COPY ./Cargo.toml /app

WORKDIR /app

RUN cargo build -r

COPY ./.env ./target/release/

CMD ["./target/release/kakaku_api"]