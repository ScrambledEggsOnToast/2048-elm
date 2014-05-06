module InputModel where

import Keyboard

{------------------------------------------------------------------------------

Input Model

------------------------------------------------------------------------------}

data Direction = Up | Down | Left | Right 

type UserInput = { tilePushDirection:Maybe Direction }

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
userInput = (\d -> {tilePushDirection = d}) <~ arrowsDirection

type Input = { timeDelta:Float, userInput:UserInput }
