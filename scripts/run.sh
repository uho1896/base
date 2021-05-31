#!/bin/bash
pushd /data/wk/vava
git pull origin master

pushd ./server
yarn install
pm2 restart vava3
popd

pushd ./front
yarn install
bash ./scripts/prod.sh
popd

popd
