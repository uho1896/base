#!/bin/bash
rm /data/wk/vava/dev/vava/front/dist -rf
npm run bdev
sudo chown -R nginx:nginx /data/wk/vava/dev/vava/front/dist
sudo chmod -R 755 /data/wk/vava/dev/vava/front/dist