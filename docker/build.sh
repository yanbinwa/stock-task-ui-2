#!/bin/sh

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BUILD_CONTEXT="${DIR}/.."

echo ${DIR}
echo ${BUILD_CONTEXT}

source ${DIR}/build.env

cmd="docker build -f Dockerfile -t ${IMAGE_NAME} ${BUILD_CONTEXT}"
echo ${cmd}
eval ${cmd}

echo ${IMAGE_NAME}
