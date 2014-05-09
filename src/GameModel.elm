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

import Utils ((!), transpose)

data Tile = Number Int | Empty -- a tile can either contain an int, or be empty
data Grid = Grid [[Tile]] -- a grid is a list of lists of tiles

data Progress = InProgress | GameOver | Won -- a game can be in progress, 
                                            -- at game over, or won

type GameState = { -- defines the various properties of a game state:
    grid: Grid              -- the grid of tiles
  , score: Int              -- the score
  , gameProgress: Progress  -- the progress of the game (in progress, 
                            -- game over etc.)
}

gridSize : Int -- the length of the sides of the grid
gridSize = 4

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

tilesWithCoordinates : Grid -> [(Tile,Int,Int)] -- a list of the tiles in a grid 
                                                -- with their coordinates
tilesWithCoordinates (Grid g) = concat
                   <| zipWith (\j r -> map (\(t,i) -> (t,i,j)) r) 
                        [0..(gridSize-1)] 
                   <| map (\r -> zip r [0..(gridSize-1)]) 
                   <| g

rotateGrid : Grid -> Grid -- rotate a grid clockwise by 90 degrees 
rotateGrid (Grid g) = Grid <| map reverse <| transpose g

{------------------------------------------------------------------------------
                             Initial gamestate
------------------------------------------------------------------------------}

emptyGrid : Grid -- a grid of empty tiles
emptyGrid = Grid <| repeat gridSize <| repeat gridSize <| Empty

defaultGame : GameState -- the default starting game state:
defaultGame = { 
    grid = emptyGrid            -- an empty grid
  , score = 0                   -- initial score is zero
  , gameProgress = InProgress   -- the game is in progress
    }


