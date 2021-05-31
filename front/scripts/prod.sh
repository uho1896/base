#!/bin/bash
rm /data/wk/vava/front/dist -rf
npm run build
sudo chown -R nginx:nginx /data/wk/vava/front/dist
sudo chmod -R 755 /data/wk/vava/front/dist