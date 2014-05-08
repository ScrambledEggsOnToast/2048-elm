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

import InputModel (Input, Controls, userDirection, randomFloats)
import GameModel (defaultGame)
import Logic (stepGame)
import Rendering (display)

port score : Signal Int -- Outgoing score port
port score = (\x -> x.score) <~ gameState

port newGameButton : Signal Bool -- Incoming new game button port

controls = Controls <~ userDirection ~ newGameButton
input =  Input <~ controls ~ (randomFloats controls) 

gameState = foldp stepGame defaultGame input -- fold the input into the game 
                                             -- state, starting with the 
                                             -- default game state

main = display <~ Window.dimensions ~ gameState -- display the game
