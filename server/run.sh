#!/bin/bash

# check if docker is installed
if ! [ -x "$(command -v docker)" ]; then
    echo "Error: docker is not installed." >&2
    exit 1
fi

docker pull redis
docker pull mongo


if [ "$(docker ps -q -f name=my-redis-container)" ]; then
    docker stop my-redis-container
    docker rm my-redis-container
fi

if [ "$(docker ps -q -f name=my-mongo-container)" ]; then
    docker stop my-mongo-container
    docker rm my-mongo-container
fi

docker run -d --name my-redis-container -p 6379:6379 redis
docker run -d --name my-mongo-container -p 27017:27017 mongo

echo "Containers redis and mongo are running"


