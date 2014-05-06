#!/bin/bash

LOCATION=$(readlink -f $BASH_SOURCE)
BASEDIR=$(dirname $LOCATION)
cd $BASEDIR/src
elm -m Main.elm -b ../build -c ../cache
