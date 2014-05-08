{--
2048-elm

InputModel.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

{------------------------------------------------------------------------------

                                Input Model

------------------------------------------------------------------------------}

module InputModel where

import Keyboard
import Random

data Direction = Up | Down | Left | Right | None -- the direction to shift 
                                                 -- the grid

type Controls = { 
    tilePushDirection: Direction 
  , newGameButtonPressed: Bool} -- define the user controls

type Input = { -- define the inputs that the game will depend upon:
    controls: Controls          -- the user controls
  , randomFloats: [Float]       -- a source of randomness
  }

userDirection : Signal Direction -- make a signal that is the direction 
                                 -- that the user has chosen. compatible
                                 -- with both the wasd and arrow keys
userDirection = let toDirection ds wasds = 
                      if | ds == {x=0,y=1} -> Up
                         | ds == {x=0,y=-1} -> Down
                         | ds == {x=1,y=0} -> Right
                         | ds == {x=-1,y=0} -> Left
                         | wasds == {x=0,y=1} -> Up
                         | wasds == {x=0,y=-1} -> Down
                         | wasds == {x=1,y=0} -> Right
                         | wasds == {x=-1,y=0} -> Left
                         | otherwise -> None
    in toDirection <~ Keyboard.arrows ~ Keyboard.wasd


randomFloats : Signal a -> Signal [Float] -- provides four  random floats that 
                                          -- will be used for random events in 
                                          -- the game logic. changes every time
                                          -- the signal s changes
randomFloats s = Random.floatList <| sampleOn s <| constant 4
