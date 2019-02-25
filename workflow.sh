#!/bin/bash

PATH=$PATH:/usr/local/bin

if ! [ -x "$(command -v docker)" ]; then
	osascript -e "display alert \"Docker needs to be installed.\""
    exit
fi

if [ ! -S /var/run/docker.sock ]; then
	osascript -e "display alert \"Docker needs to be running\""
    exit
fi

OUTPUT=$(docker container run --rm -v $1:/images --network=host mikesir87/image-renamer)
osascript -e "display dialog \"${OUTPUT//\"/\\\"}\"" || true
