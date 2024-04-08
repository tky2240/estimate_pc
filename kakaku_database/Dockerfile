FROM rust:1.67.1-bookworm as rust_build

WORKDIR /app

COPY ./kakaku_database/src /app/src
COPY ./kakaku_database/Cargo.toml /app

RUN apt-get update && apt-get install -y \
    python3-dev

RUN cargo build -r

FROM python:3.10.14-slim-bookworm

WORKDIR /app
COPY --from=rust_build /app/target/release/kakaku_database /app
COPY ./.env ./
COPY ./kakaku_database/scraping_kakaku /app/scraping_kakaku

RUN pip3 install -r ./scraping_kakaku/requirements.txt

RUN apt-get update && apt-get install -y \
    cron

COPY ./crontab /etc/

CMD ["cron", "-f"]