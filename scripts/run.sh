#!/bin/bash
pushd /data/wk/ana
git pull origin master

pushd ./server
yarn install
pm2 restart ana
popd

pushd ./front
yarn install
bash ./scripts/prod.sh
popd

popd
