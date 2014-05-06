module GameModel where

import InputModel (Direction)

{------------------------------------------------------------------------------

Game Model

------------------------------------------------------------------------------}

data Tile = Number Int | Empty
data Grid = Grid [[Tile]]

type GameState = { grid:Grid, tilePush:Maybe Direction}

defaultGrid : Grid
defaultGrid = Grid <| repeat 4 <| repeat 4 <| Number 4

defaultGame : GameState
defaultGame = { grid = defaultGrid, tilePush = Nothing }

