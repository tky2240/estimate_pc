#!/bin/bash

if [ $1 -eq 1 ]; then
    echo "start initial scraping"
    /app/kakaku_database
fi

cron -f