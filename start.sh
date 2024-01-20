#!/bin/bash

npm install
npm cache clean --force
npm run build
EXPOSE 9090
node server.js &
export NODE_OPTIONS=--openssl-legacy-provider && npm start