#!/bin/sh -
#./packages/scripts/src/bash/ci-test.sh
set -v
echo "$(date +'%T') start ci-test"
START_DIRECTORY=$PWD

if [ "$CI_TEST_ALL" = true ]; then
  yarn test
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
fi

if [ "$CI_TEST_E2E_DOCKER_1" = true ]; then
  echo "Running test suite CI_TEST_E2E_DOCKER"
  cd ./packages/ui && yarn test:e2e:ci:1
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_E2E_DOCKER passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_E2E_DOCKER_2" = true ]; then
  echo "Running test suite CI_TEST_E2E_DOCKER"
  cd ./packages/ui && yarn test:e2e:ci:2
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_E2E_DOCKER passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_UI_LINT" = true ]; then
  echo "Running test suite CI_TEST_UI_LINT"
  cd ./packages/ui && yarn lint:js && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_UI_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_UI_UNIT" = true ]; then
  echo "Running test suite CI_TEST_UI_UNIT"
  cd ./packages/ui && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_UI_UNIT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_MODELS_LINT" = true ]; then
  echo "Running test suite CI_TEST_MODELS_LINT"
  cd ./packages/models && yarn lint:js && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_MODELS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_COMMON_LINT" = true ]; then
  echo "Running test suite CI_TEST_COMMON_LINT"
  cd ./packages/common && yarn lint:js && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_COMMON_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_COMMON_UNIT" = true ]; then
  echo "Running test suite CI_TEST_COMMON_UNIT"
  cd ./packages/common && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_COMMON_UNIT passed"
  cd $START_DIRECTORY
fi


if [ "$CI_TEST_SCRIPTS_LINT" = true ]; then
  echo "Running test suite CI_TEST_SCRIPTS_LINT"
  cd ./packages/scripts && yarn lint:js && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_SCRIPTS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_BACKEND_LINT" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_LINT"
  cd ./packages/backend && yarn lint:js && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_BACKEND_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_BACKEND_UNIT" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_UNIT"
  cd ./packages/backend && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_BACKEND_UNIT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_BACKEND_DB" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_DB"
  cd ./packages/backend && yarn test:db
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_BACKEND_DB passed"
  cd $START_DIRECTORY
fi


if [ "$CI_TEST_BACKEND_API" = true ]; then
  echo "Running test suite CI_TEST_BACKEND_API"
  cd ./packages/backend && yarn test:api
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_BACKEND_API passed"
  cd $START_DIRECTORY
fi


if [ "$CI_TEST_MIGRATIONS_LINT" = true ]; then
  echo "Running test suite CI_TEST_MIGRATIONS_LINT"
  cd ./packages/migrations && yarn lint:js && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_MIGRATIONS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_DOCS_LINT" = true ]; then
  echo "Running test suite CI_TEST_DOCS_LINT"
  cd ./packages/docs && yarn lint && yarn test:depcheck
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_DOCS_LINT passed"
  cd $START_DIRECTORY
fi

if [ "$CI_TEST_DOCS_UNIT" = true ]; then
  echo "Running test suite CI_TEST_DOCS_UNIT"
  cd ./packages/docs && yarn test:unit
  if [ $? -ne 0 ]; then
    echo "Aborting. exit is not 0"
    exit 1
  fi
  echo "Test suite CI_TEST_DOCS_UNIT passed"
  cd $START_DIRECTORY
fi

echo "$(date +'%T') end ci-test"