FROM rust:1.67.1-slim-bookworm

COPY /src /

WORKDIR /src

RUN pip3 insrall -r ./scraping_kakaku/requirements.txt

RUN apt-get update && apt-get install -y \
    cron

RUN cargo build -r

COPY ../.env ./

RUN cp ./target/release/kakaku_database ./

CMD ["./target/release/kakaku_database"]