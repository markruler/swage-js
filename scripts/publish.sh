#!/usr/bin/env bash

set -e

echo "Check variables..."
echo "package.json: version"
echo "main.js: development"

echo "Build..."
rm -rf dist/ && rm -f *.tgz && npm run build

echo "Package..."
npm pack

echo "Publish..."
npm publish --access public
