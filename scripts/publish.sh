#!/usr/bin/env bash

set -e

echo "Clean..."
rm -rf dist/
rm -f *.tgz

echo "Build..."
npm run build
npm version patch

echo "Package..."
npm pack

echo "Publish..."
npm publish --access public
