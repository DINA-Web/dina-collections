#!/bin/bash -
# OBS:login with docker-hub credentials, set in ~/.docker/config
# failsafe: check if that tag/version has already been published before pushing?
# ./packages/scripts/src/bash/publish-docker.sh  -t 4.5.2
usage()
{
  echo "usage: $0 -t <TAG>"
}

while getopts t: option
 do
  case "${option}"
   in
    (t) TAG=${OPTARG};;
  esac
 done

if [ -z "$TAG" ]
then
  usage
  exit 1
fi

echo "Info: This script publishes 1 images to Docker"
echo "Pushing TAG=$TAG to Dockerhub"

#docker login

#push to docker hub
docker push dina/dina-semantic-ui-docs:latest
docker push dina/dina-semantic-ui-docs:$TAG
