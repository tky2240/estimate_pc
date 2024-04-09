FROM rust:1.67.1-bookworm as rust_build

RUN apt-get update && apt-get install -y \
    python3-dev

WORKDIR /app

COPY ./kakaku_database/src /app/src
COPY ./kakaku_database/Cargo.toml /app

RUN cargo build -r

FROM python:3.10.14-slim-bookworm

RUN apt-get update && apt-get install -y \
    cron

WORKDIR /app

COPY ./kakaku_database/scraping_kakaku /app/scraping_kakaku
RUN pip3 install -r ./scraping_kakaku/requirements.txt

COPY --from=rust_build /app/target/release/kakaku_database /app
COPY ./.env ./


COPY ./crontab /etc/

CMD ["cron", "-f"]