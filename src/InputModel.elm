module InputModel where

import Keyboard
import Random

{------------------------------------------------------------------------------

Input Model

------------------------------------------------------------------------------}

data Direction = Up | Down | Left | Right 

type UserInput = { tilePushDirection: Direction }

arrowsDirection : Signal (Maybe Direction)
arrowsDirection = let toDirection ds wasds = 
                                      if | ds == {x=0,y=1} -> Just Up
                                         | ds == {x=0,y=-1} -> Just Down
                                         | ds == {x=1,y=0} -> Just Right
                                         | ds == {x=-1,y=0} -> Just Left
                                         | wasds == {x=0,y=1} -> Just Up
                                         | wasds == {x=0,y=-1} -> Just Down
                                         | wasds == {x=1,y=0} -> Just Right
                                         | wasds == {x=-1,y=0} -> Just Left
                                         | otherwise -> Nothing
    in toDirection <~ Keyboard.arrows ~ Keyboard.wasd

userInput : Signal UserInput
userInput = (\d -> {tilePushDirection = maybe Up id d}) <~ (dropIf (\d -> d==Nothing) Nothing <| dropRepeats arrowsDirection)

randomFloats : Signal a -> Signal [Float]
randomFloats s = Random.floatList <| sampleOn s <| constant 2

type Input = { timeDelta:Float, userInput:UserInput, randomFloats:[Float]}

delta = fps 15
input = sampleOn delta <| Input <~ delta ~ userInput ~ (randomFloats delta)
