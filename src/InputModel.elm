module InputModel where

import Keyboard
import Random

{------------------------------------------------------------------------------

Input Model

------------------------------------------------------------------------------}

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

userInput : Signal UserInput
userInput = (\d -> {tilePushDirection = d}) <~ (dropRepeats arrowsDirection)

randomFloats : Signal a -> Signal [Float]
randomFloats s = Random.floatList <| sampleOn delta <| constant 2

type Input = { timeDelta:Float, userInput:UserInput, randomFloats:[Float]}

delta = fps 30
input = sampleOn delta <| Input <~ delta ~ userInput ~ (randomFloats delta)
