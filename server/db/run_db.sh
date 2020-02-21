#!/bin/bash
export MYSQL_ROOT_PASSWORD="sqlpassword"
docker rm -f user-store
docker build -t kateks/user-store .

# runs a docker container on local for debugging purposes
docker run -d \
-p 3306:3306 \
--name userStore \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
-e MYSQL_DATABASE=users \
kateks/user-store

# runs local redisServer
docker rm -f redisServer
docker run -d -p 6379:6379 --name redisServer redis
