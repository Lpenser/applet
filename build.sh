#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}

echo '拷贝需要发布的文件目录'
rm -rf release
mkdir release
cp -r bin release/bin
cp -r lib release/lib
cp -r lib release/template
cp ./package.json release/package.json

cd release && nrm use npm && npm publish