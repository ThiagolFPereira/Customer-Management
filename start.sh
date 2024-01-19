#!/bin/bash

# Inicia o servidor Node.js em segundo plano
node server.js &

# Inicia o aplicativo ReactJS
export NODE_OPTIONS=--openssl-legacy-provider && npm start