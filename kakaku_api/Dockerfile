FROM rust:1.67.1-slim-bookworm

COPY ./kakaku_api/src /app/src
COPY ./kakaku_api/Cargo.toml /app

WORKDIR /app

RUN apt-get update && apt-get install -y libssl-dev
RUN cargo build -r

COPY ./.env ./target/release/

CMD ["./target/release/kakaku_api"]