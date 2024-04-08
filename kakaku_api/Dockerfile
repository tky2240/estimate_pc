FROM rust:1.67.1-slim-bookworm

COPY /src /

WORKDIR /src

RUN cargo build -r

COPY ../.env ./target/release/

COPY ../crontab /etc/

CMD ["cron", "-f"]