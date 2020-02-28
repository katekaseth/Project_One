docker build -t kateks/client .
docker push kateks/client

ssh ec2-user@ec2-100-21-105-146.us-west-2.compute.amazonaws.com < deploy_commands.sh