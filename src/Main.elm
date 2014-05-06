module Main where

import Window

import InputModel (..)

import GameModel (..)

import Logic (..)

import Rendering (..)

delta = fps 30
input = sampleOn delta (lift2 Input delta userInput)

gameState = foldp stepGame defaultGame input

main = lift2 display Window.dimensions gameState
