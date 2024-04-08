FROM rust:1.67.1-bookworm

COPY ./kakaku_database/src /app/src
COPY ./kakaku_database/Cargo.toml /app
COPY ./kakaku_database/scraping_kakaku /app/scraping_kakaku

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3-pip

RUN pip3 insrall -r ./scraping_kakaku/requirements.txt

RUN apt-get update && apt-get install -y \
    cron

RUN cargo build -r

COPY ./.env ./

COPY ./crontab /etc/

RUN cp ./build/release/kakaku_database ./

CMD ["cron", "-f"]