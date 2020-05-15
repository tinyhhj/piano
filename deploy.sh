#!/bin/bash

if [ 'build' == "$1" ]; then
docker-compose -f docker-compose.yml -f docker-compose-nginx.yml -f docker-compose-transmission.yml -f docker-compose-yt-web.yml -f docker-compose-yt-worker.yml up -d --build
else
docker-compose -f docker-compose.yml -f docker-compose-nginx.yml -f docker-compose-transmission.yml -f docker-compose-yt-web.yml -f docker-compose-yt-worker.yml up -d
fi

