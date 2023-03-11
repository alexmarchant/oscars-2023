#!/usr/bin/env bash
set -e

docker build --platform=linux/amd64 --build-arg VITE_TRPC_ENDPOINT=/api/trpc -t oscars2023/client -f packages/client/Dockerfile .
docker tag oscars2023/client registry.digitalocean.com/oscars2023/client
docker push registry.digitalocean.com/oscars2023/client