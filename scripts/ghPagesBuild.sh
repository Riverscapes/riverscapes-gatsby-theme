#!/bin/bash

env
pwd
printf "GATSBY_MAPBOX_TOKEN=${GATSBY_MAPBOX_TOKEN}\n
GATSBY_PUBLICMAP_API=${GATSBY_PUBLICMAP_API}\n" > .env.production
