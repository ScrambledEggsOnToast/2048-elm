module Elm2048 where

import Window

import InputModel (input)
import GameModel (defaultGame)
import Logic (stepGame)
import Rendering (display)

port score : Signal Int
port score = (\x -> x.score) <~ gameState

gameState = foldp stepGame defaultGame input

main = display <~ Window.dimensions ~ gameState
