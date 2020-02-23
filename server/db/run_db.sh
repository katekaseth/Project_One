#!/bin/bash
docker rm -f userStore
docker build -t kateks/user-store .

# runs a docker container on local for debugging purposes
docker run -d \
-p 3306:3306 \
--name userStore \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
-e MYSQL_DATABASE=data \
kateks/user-store

# runs local redisServer
docker rm -f redisServer
docker run -d -p 6379:6379 --name redisServer redis
