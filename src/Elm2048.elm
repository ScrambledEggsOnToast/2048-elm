{--
2048-elm

Elm2048.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

{------------------------------------------------------------------------------

                                    Main

------------------------------------------------------------------------------}

module Elm2048 where

import Window

import InputModel (Input, userInput, randomFloats, delta)
import GameModel (defaultGame)
import Logic (stepGame)
import Rendering (display)

port score : Signal Int
port score = (\x -> x.score) <~ gameState

port newGameButton : Signal Bool

input = sampleOn delta <| Input <~ delta ~ userInput ~ (randomFloats delta) ~ newGameButton

gameState = foldp stepGame defaultGame input

main = display <~ Window.dimensions ~ gameState
