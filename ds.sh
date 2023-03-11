#!/usr/bin/env bash
set -e

docker build --platform=linux/amd64 -t oscars2023/server -f packages/server/Dockerfile .
docker tag oscars2023/server registry.digitalocean.com/oscars2023/server
docker push registry.digitalocean.com/oscars2023/server