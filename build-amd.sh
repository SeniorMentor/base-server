# Local is ARM, convert to AMD and push to docker hub
docker buildx use default
docker buildx build --push --tag sudheer121/sm_base_server:latest -o type=image --platform=linux/amd64 .

