{--
2048-elm

Elm2048.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

module Elm2048 where

import InputModel (Input, Controls, playerDirection, randomFloats)
import GameModel (defaultGame, GameState)
import Logic (stepGame)
import Rendering (display)

{------------------------------------------------------------------------------
                               Ports and Inputs
------------------------------------------------------------------------------}

port score : Signal Int -- Outgoing score port
port score = (\x -> x.score) <~ gameState

port newGameButton : Signal Bool -- Incoming new game button port

controls = Controls <~ playerDirection ~ newGameButton -- set up controls
input =  Input <~ controls ~ (randomFloats controls) -- set up input

{------------------------------------------------------------------------------
                        Gamestate folding and display
------------------------------------------------------------------------------}

gameState : Signal GameState
gameState = foldp stepGame defaultGame input -- fold the input into the game 
                                             -- state, starting with the 
                                             -- default game state

main = display <~ gameState -- display the game
