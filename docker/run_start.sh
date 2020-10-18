#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "$1" ]; then
    ENV_FILE="${DIR}/run.env"
    echo "Using default environment file: ${ENV_FILE}"
else
    ENV_FILE=$1
fi

# Get docker image tags and export to environment variables
set -a
source ${DIR}/build.env
source ${ENV_FILE}


# Run docker image
#docker-compose -f ${DIR}/docker-compose.yml stop ${DOCKER_CONTAINER}
docker-compose -f ${DIR}/docker-compose.yml up -d
