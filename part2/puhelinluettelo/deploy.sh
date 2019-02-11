#!/bin/sh
npm run build
rm -rf ../../../fullstack-2019-part3/build
cp -r build ../../../fullstack-2019-part3/
