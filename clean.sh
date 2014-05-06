#!/bin/bash

LOCATION=$(readlink -f $BASH_SOURCE)
BASEDIR=$(dirname $LOCATION)
rm -rf $BASEDIR/build $BASEDIR/cache
