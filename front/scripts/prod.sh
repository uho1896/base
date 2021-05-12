#!/bin/bash
rm dist* -rf
npm run build
zip -r dist.zip dist
scp -o StrictHostKeyChecking=no dist.zip hejian@10.43.102.97:~/

git tag -a v$(date +%s) -m 'version v$(date +%s)'
git push --tags origin master