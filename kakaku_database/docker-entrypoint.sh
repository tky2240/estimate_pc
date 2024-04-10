#!/bin/bash

if [ $SHOULD_INITIAL_SCRAPING -eq 1 ]; then
    /app/kakaku_database
fi

cron -f