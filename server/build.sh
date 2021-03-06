#!/bin/bash 

CGO_ENABLED=0 go build
docker build -t kateks/capstone_api .
docker push kateks/capstone_api
go clean

TYPE=$1

if [ "$TYPE" == "db" ]
then
    cd db
    docker build -t kateks/capstone_store .
    docker push kateks/capstone_store
fi