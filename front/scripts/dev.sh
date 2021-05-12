#!/bin/bash
rm dist* -rf
npm run bdev
zip -r dist.zip dist
scp -o StrictHostKeyChecking=no dist.zip hejian@10.43.102.97:~/