#!/bin/bash

LOCATION=$(readlink -f $BASH_SOURCE)
BASEDIR=$(dirname $LOCATION)
cd $BASEDIR/src
elm -m -o Elm2048.elm -b ../build -c ../cache
echo -n "Copying html files ... "
cp *.html ../build
echo "Done"
echo -n "Copying elm-runtime.js ... "
cp ../elm-runtime.js ../build
echo "Done"
