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

type Input = { 
    timeDelta: Float
  , userInput: UserInput
  , randomFloats: [Float]
  , newGameButtonPressed: Bool
  }

data Direction = Up | Down | Left | Right | None

type UserInput = { tilePushDirection: Direction }

arrowsDirection : Signal Direction
arrowsDirection = let toDirection ds wasds = 
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

delta = fps 30

userInput : Signal UserInput
userInput = UserInput <~ (dropRepeats arrowsDirection)

randomFloats : Signal a -> Signal [Float]
randomFloats s = Random.floatList <| sampleOn delta <| constant 2
