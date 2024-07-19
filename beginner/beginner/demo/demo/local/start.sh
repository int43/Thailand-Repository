#!/bin/bash

# 「このスクリプトがある場所」まで移動
SCRIPT_DIR=$(cd $(dirname $(readlink -f $0 || echo $0));pwd -P)
cd ${SCRIPT_DIR}

if docker ps | grep 'warehouse-management-database' > /dev/null; then
  echo "コンテナが既にあるなら停止"
  docker-compose down
fi

# 実行
docker-compose up -d
