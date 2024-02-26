
docker pull redis

if [ "$(docker ps -q -f name=my-redis-container)" ]; then
    docker stop my-redis-container
    docker rm my-redis-container
fi

docker run -d --name my-redis-container -p 6379:6379 redis
