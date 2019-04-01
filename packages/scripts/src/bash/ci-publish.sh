#!/bin/sh -
# OBS:login with docker-hub credentials, set in ~/.docker/config
set -ev
echo "$(date +'%T') start ci-publish"
if [ -z "$TRAVIS_TAG" ]; then
  echo "TRAVIS_TAG is empty, Abort" ;
  exit 0
fi

if [ -z "$CI" ]; then
  echo "CI is empty, Abort. Only allowed to publish from CI" ;
  exit 0
fi

docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD";

echo "Pushing dina/dina-collections-ui:$TRAVIS_TAG"
docker pull dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER
docker tag dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER dina/dina-collections-ui:$TRAVIS_TAG
docker push dina/dina-collections-ui:$TRAVIS_TAG

echo "Pushing dina/dina-collections-ui:latest"
docker tag dina/dina-collections-ui:$TRAVIS_BUILD_NUMBER dina/dina-collections-ui:latest
docker push dina/dina-collections-ui:latest

echo "Pushing dina/dina-collections-api:$TRAVIS_TAG"
docker pull dina/dina-collections-api:$TRAVIS_BUILD_NUMBER
docker tag dina/dina-collections-api:$TRAVIS_BUILD_NUMBER dina/dina-collections-api:$TRAVIS_TAG
docker push dina/dina-collections-api:$TRAVIS_TAG

echo "Publishing dina/dina-collections-api:latest"
docker tag dina/dina-collections-api:$TRAVIS_BUILD_NUMBER dina/dina-collections-api:latest
docker push dina/dina-collections-api:latest

echo "Pushing dina/dina-collections-migrations:$TRAVIS_TAG"
docker pull dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER
docker tag dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER dina/dina-collections-migrations:$TRAVIS_TAG
docker push dina/dina-collections-migrations:$TRAVIS_TAG

echo "Publishing dina/dina-collections-migrations:latest"
docker tag dina/dina-collections-migrations:$TRAVIS_BUILD_NUMBER dina/dina-collections-migrations:latest
docker push dina/dina-collections-migrations:latest

echo "Pushing dina/dina-collections-docs:$TRAVIS_TAG"
docker pull dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER
docker tag dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER dina/dina-collections-docs:$TRAVIS_TAG
docker push dina/dina-collections-docs:$TRAVIS_TAG

echo "Publishing dina/dina-collections-docs:latest"
docker tag dina/dina-collections-docs:$TRAVIS_BUILD_NUMBER dina/dina-collections-docs:latest
docker push dina/dina-collections-docs:latest

echo "Pushing dina/dina-semantic-ui-docs:$TRAVIS_TAG"
docker pull dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER
docker tag dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER dina/dina-semantic-ui-docs:$TRAVIS_TAG
docker push dina/dina-semantic-ui-docs:$TRAVIS_TAG

echo "Publishing dina/dina-semantic-ui-docs:latest"
docker tag dina/dina-semantic-ui-docs:$TRAVIS_BUILD_NUMBER dina/dina-semantic-ui-docs:latest
docker push dina/dina-semantic-ui-docs:latest

echo "$(date +'%T') end ci-publish"