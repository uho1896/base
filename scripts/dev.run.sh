#!/bin/bash
pushd /data/wk/ana/dev/ana
git pull origin master

pushd ./server
yarn install
pm2 restart anadev
popd

pushd ./front
yarn install
bash ./scripts/dev.sh
popd

popd