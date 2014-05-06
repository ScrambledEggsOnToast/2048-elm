module GameModel where

import InputModel (Direction, Up)

{------------------------------------------------------------------------------

Game Model

------------------------------------------------------------------------------}

data Tile = Number Int | Empty
data Grid = Grid [[Tile]]

{-
a grid is a list of lists, indexed by (i,j) it will be rendered as follows:
  i | 0 1 2 3
j
-
3
2
1
0
-}

type GameState = { grid:Grid, tilePush:Direction, nextTile:Tile}

emptyGrid : Grid
emptyGrid = Grid <| repeat 4 <| repeat 4 <| Empty

readTile : (Int, Int) -> Grid -> Tile
readTile (i, j) (Grid g) = head <| drop i <| head <| drop j <| g

setTile : (Int, Int) -> Grid -> Tile -> Grid
setTile (i, j) (Grid g) t = let 
        r = head <| drop j <| g
        nr = (take i r) ++ [t] ++ (drop (i+1) r)
    in Grid <| (take j g) ++ [nr] ++ (drop (j+1) g)

defaultGame : GameState
defaultGame = { grid = emptyGrid, tilePush = Up, nextTile = Empty }

