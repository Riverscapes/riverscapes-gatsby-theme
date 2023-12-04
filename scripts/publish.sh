#!/bin/bash

cd packages/@riverscapes/gatsby-theme
yarn version patch
VERSION=$(yarn -s version --no-git-tag-version)
git add .
git commit -m "version bump to $VERSION"
git tag $VERSION
git push
git push --tags
cd ../..
yarn workspace @riverscapes/gatsby-theme publish