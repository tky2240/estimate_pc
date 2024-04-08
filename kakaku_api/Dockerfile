FROM rust:1.67.1-slim-bookworm

COPY ./kakaku_api/* /src

WORKDIR /src

RUN cargo build -r

COPY ./.env ./target/release/

CMD ["./target/release/kakaku_api"]