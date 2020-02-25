#!/bin/bash

TYPE=$1
bash build.sh "$TYPE"
if [ "$TYPE" == "db" ]
then 
    ssh ec2-user@ec2-52-43-131-163.us-west-2.compute.amazonaws.com < deploy_with_db_commands.sh
else 
    bash build.sh
    ssh ec2-user@ec2-52-43-131-163.us-west-2.compute.amazonaws.com < deploy_commands.sh
fi