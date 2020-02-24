sudo service docker start

docker rm -f apiServer

# docker rm -f dataStore
# docker rm -f redisServer
# docker network rm server-net
# docker system prune --all -f
# docker system prune --volumes -f

# docker network create server-net

# docker pull kateks/capstone_store
# docker run -d \
# --name dataStore \
# --network server-net \
# -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
# -e MYSQL_DATABASE=data \
# kateks/capstone_store

# docker run -d --network server-net --name redisServer redis

docker pull kateks/capstone_api
docker run -d --name apiServer \
-p 443:443 \
--network server-net \
-v /etc/letsencrypt/:/etc/letsencrypt/:ro \
-e TLSCERT=/etc/letsencrypt/live/api.katekaseth.me/fullchain.pem \
-e TLSKEY=/etc/letsencrypt/live/api.katekaseth.me/privkey.pem \
-e ADDR=":443" \
-e DSN="root:password@tcp(dataStore:3306)/data?parseTime=true" \
-e REDISADDR="redisServer:6379" \
--restart unless-stopped \
kateks/capstone_api