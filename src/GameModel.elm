{--
2048-elm

GameModel.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

{------------------------------------------------------------------------------

                                Game Model

------------------------------------------------------------------------------}

module GameModel where

import Utils ((!))

data Tile = Number Int | Empty -- a tile can either contain an int, or be empty
data Grid = Grid [[Tile]] -- a grid is a list of list of tiles
data Progress = InProgress | GameOver | Won -- a game can be in progress, 
                                            -- at game over, or won

type GameState = { -- defines the various properties of a game state:
    grid: Grid              -- the grid of tiles
  , score: Int              -- the score
  , gameProgress: Progress  -- the progress of the game (in progress, 
                            -- game over etc.)
  }

{------------------------------------------------------------------------------
                             Grid manipulation
------------------------------------------------------------------------------}

readTile : (Int, Int) -> Grid -> Tile -- the tile at (i,j) in a grid
readTile (i, j) (Grid g) = (g ! j) ! i

setTile : (Int, Int) -> Grid -> Tile -> Grid -- change the tile at (i,j) in 
                                             -- a grid
setTile (i, j) (Grid g) t = let 
        r = g ! j -- jth row
        nr = (take i r) ++ [t] ++ (drop (i+1) r) -- ith element changed in
                                                 -- jth row
    in Grid <| (take j g) ++ [nr] ++ (drop (j+1) g) -- new grid with modified 
                                                    -- jth row

tileToInt : Tile -> Int -- convert a tile to the int it represents
tileToInt t = case t of
    Number n -> n
    otherwise -> 0

intToTile : Int -> Tile -- convert an int to a tile representing it
intToTile n = case n of
    0 -> Empty
    otherwise -> Number n

{------------------------------------------------------------------------------
                             Initial gamestate
------------------------------------------------------------------------------}

gridSize : Int
gridSize = 4

emptyGrid : Grid -- a grid of empty tiles
emptyGrid = Grid <| repeat gridSize <| repeat gridSize <| Empty

defaultGame : GameState -- the default starting game state:
defaultGame = { 
    grid = emptyGrid            -- an empty grid
  , score = 0                   -- initial score is zero
  , gameProgress = InProgress   -- the game is in progress
  }

