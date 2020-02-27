#!/bin/bash
docker rm -f dataStore
docker build -t kateks/capstone_store .

# runs a docker container on local for debugging purposes
docker run -d \
-p 3306:3306 \
--name dataStore \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
-e MYSQL_DATABASE=data \
kateks/capstone_store 

# runs local redisServer
docker rm -f redisServer
docker run -d -p 6379:6379 --name redisServer redis
