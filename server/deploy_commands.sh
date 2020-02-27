sudo service docker start

docker rm -f apiServer

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