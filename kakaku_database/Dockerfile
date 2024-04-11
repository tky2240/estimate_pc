FROM rust:1.77.2-bookworm as rust_build

RUN apt-get update && apt-get install -y \
    python3-dev

WORKDIR /app

COPY ./src /app/src
COPY ./Cargo.toml /app

RUN cargo build -r

FROM python:3.11.9-slim-bookworm

RUN apt-get update && apt-get install -y \
    cron \
    python3-dev

WORKDIR /app

COPY ./scraping_kakaku /app/scraping_kakaku
RUN pip3 install -r ./scraping_kakaku/requirements.txt

COPY --from=rust_build /app/target/release/kakaku_database /app

RUN crontab /etc/crontab

COPY ./docker-entrypoint.sh ./

ENTRYPOINT [ "sh", "-c", "./docker-entrypoint.sh ${SHOULD_INITIAL_SCRAPING}" ]