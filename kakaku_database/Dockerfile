FROM rust:1.67.1-slim-bookworm

COPY ./kakaku_database/src /

WORKDIR /src

RUN pip3 insrall -r ./scraping_kakaku/requirements.txt

RUN apt-get update && apt-get install -y \
    cron

RUN cargo build -r

COPY ./.env ./

COPY ./crontab /etc/

RUN cp ./build/release/kakaku_database ./

CMD ["cron", "-f"]