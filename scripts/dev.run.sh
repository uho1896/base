#!/bin/bash
pushd /data/wk/vava/dev/vava
git pull origin master

pushd ./server
yarn install
pm2 restart vava3dev
popd

pushd ./front
yarn install
bash ./scripts/dev.sh
popd

popd