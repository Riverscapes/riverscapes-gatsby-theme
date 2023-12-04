#!/bin/bash

cd theme
yarn version patch
VERSION=$(node -p "require('./package.json').version")
git add package.json
git add ../.yarn/versions
git commit -m "Version bump to $VERSION and PUBLISH"
git tag $VERSION
git push
git push --tags
cd ../..
yarn workspace @riverscapes/gatsby-theme publish