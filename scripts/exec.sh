#!/usr/bin/env bash

set -e

echo "Local Build..."
npm run build

echo "Execute..."
./dist/main.js gen ./example/example.json -o .
