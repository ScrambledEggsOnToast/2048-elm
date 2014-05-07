module GameModel where

import InputModel (
    Direction
  , Up
  , Down
  , Left
  , Right
  , None
  )

{------------------------------------------------------------------------------

Game Model

------------------------------------------------------------------------------}

data Tile = Number Int | Empty
data Grid = Grid [[Tile]]
data Progress = Beginning | InProgress | Finished

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

type GameState = { 
    grid: Grid
  , tilePush: Direction
  , nextTile: Tile
  , tilesToPlace: Int
  , score: Int
  , gameProgress: Progress 
  }

emptyGrid : Grid
emptyGrid = Grid <| repeat 4 <| repeat 4 <| Empty

readTile : (Int, Int) -> Grid -> Tile
readTile (i, j) (Grid g) = head <| drop i 
                        <| head <| drop j 
                        <| g

setTile : (Int, Int) -> Grid -> Tile -> Grid
setTile (i, j) (Grid g) t = let 
        r = head <| drop j <| g
        nr = (take i r) ++ [t] ++ (drop (i+1) r)
    in Grid <| (take j g) ++ [nr] ++ (drop (j+1) g)

tileToInt : Tile -> Int
tileToInt t = case t of
    Number n -> n
    otherwise -> 0

intToTile : Int -> Tile
intToTile n = case n of
    0 -> Empty
    otherwise -> Number n

defaultGame : GameState
defaultGame = { 
    grid = emptyGrid
  , tilePush = None
  , nextTile = Empty
  , tilesToPlace = 3
  , score = 0
  , gameProgress = Beginning 
  }

