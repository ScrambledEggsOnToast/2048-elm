{--
2048-elm

Logic.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

{------------------------------------------------------------------------------

                                Game Logic

------------------------------------------------------------------------------}

module Logic where

import Random

import InputModel (
    Input
  , Direction
  , Up
  , Down
  , Left
  , Right
  , None
  )

import GameModel (
    defaultGame
  , emptyGrid
  , GameState
  , Tile
  , Number
  , Empty
  , Grid
  , setTile
  , readTile
  , tileToInt
  , intToTile
  , GameOver
  , InProgress
  , Beginning
  , Won
  )

import Utils (transpose, (!))

groupedByTwo : [Int] -> [[Int]] -- takes a list of ints and 'slides' them to 
                                -- the left, removing 0s and joining in lists 
                                -- pairs of adjacent identical ints.
groupedByTwo l = groupedByTwo' <| filter (\x -> x/=0) l
groupedByTwo' l = case l of
    [x] -> [[x]]
    [x,y] -> if (x == y) then [[x,y]] else [[x],[y]]
    (x::y::xs) -> if (x == y) then ([x,y] :: (groupedByTwo xs)) 
                    else ([x] :: (groupedByTwo (y::xs)))
    otherwise -> []

slideRow : [Tile] -> ([Tile], Int) -- slides list of tiles to left,
                                   -- merging tiles where necessary,
                                   -- and returning a full list of 
                                   -- four tiles
slideRow r = let groupedInts = groupedByTwo <| map tileToInt r 
    in (
        map intToTile 
        <| take 4 
        <| ((map sum groupedInts) ++ [0,0,0,0])
      , sum 
        <| concat 
        <| filter (\x -> length x > 1) groupedInts
    )

slideGrid : Direction -> Grid -> (Grid, Int) -- slide all of the rows of a grid
                                             -- in a certain direction
slideGrid dir (Grid g) = let h = case dir of
                    Left -> map slideRow g
                    Right -> map (\(r,s) -> (reverse r,s)) 
                            <| map slideRow 
                            <| map reverse g
                    Down -> (\x -> zip (transpose <| map fst x) (map snd x)) 
                            <| map slideRow 
                            <| transpose g
                    Up -> (\x -> zip (transpose <| map fst x) (map snd x)) 
                            <| map (\(r,s) -> (reverse r,s)) 
                            <| map slideRow 
                            <| map reverse 
                            <| transpose g
                    otherwise -> zip g [0,0,0,0]
                in (Grid (map fst h), sum <| map snd h)

gameLost : Grid -> Bool -- check if none of the rows or columns of a grid
                        -- can be slid in any direction
gameLost g = let
        up = fst <| slideGrid Up g
        down = fst <| slideGrid Down g
        left = fst <| slideGrid Left g
        right = fst <| slideGrid Right g
    in and 
        [
          g /= emptyGrid
        , up == down
        , down == left
        , left == right
        , right == g
        ]

tile2Probability : Float -- the probability that a new tile is a 2.
                         -- equivalently, the probability that a new 
                         -- tile is a 4
tile2Probability = 0.9

newTile : Float -> Tile -- based on a float that will be random, 
                        -- return a new tile
newTile x = if (x < tile2Probability) then (Number 2) else (Number 4)

emptyTiles : Grid -> [(Int, Int)] -- a list of the coordinates of the empty 
                                  -- tiles in a grid
emptyTiles (Grid g) = map (\(_,i,j) -> (i,j)) 
                   <| filter (\(t,_,_) -> t == Empty) 
                   <| concat
                   <| zipWith (\j r -> map (\(t,i) -> (t,i,j)) r) [0..3] 
                   <| map (\r -> zip r [0..3]) 
                   <| g

newTileIndex : Float -> Grid -> Maybe (Int, Int) -- based on a float that will
                                        -- be random, return Just the 
                                        -- coordinates of an empty tile in a 
                                        -- grid if one exists, or Nothing if 
                                        -- there are none
newTileIndex x g = let emptyTileIndices = emptyTiles g
    in case emptyTileIndices of 
        [] -> Nothing
        otherwise -> Just 
                    <| head 
                    <| (\y -> drop y emptyTileIndices)
                    <| floor 
                    <| (toFloat <| length emptyTileIndices) * x 

lose : GameState -> GameState -- set a game to be at game over
lose gameState = { gameState | gameProgress <- GameOver }

win : GameState -> GameState -- set a game to be won
win gameState = { gameState | gameProgress <- Won }


placeRandomTile : Float -> Float -> GameState -> GameState -- place a random tile into 
                                                  -- a random position in the 
                                                  -- grid
placeRandomTile float1 float2 gameState = 
    let tileIndex = newTileIndex float1 gameState.grid
    in if (tileIndex == Nothing) then gameState else
        { gameState |
            grid <- setTile 
                    (maybe (0,0) id <| tileIndex)
                    gameState.grid 
                    <| newTile float2
        }

pushTiles : Input -> GameState -> GameState -- push the tiles in the grid 
                                            -- according to the direction in 
                                            -- the input
pushTiles input gameState = 
   let newGridScore = slideGrid input.controls.tilePushDirection gameState.grid
    in if (fst newGridScore == gameState.grid) then gameState else
        { gameState | 
            grid <- fst newGridScore
          , score <- gameState.score + snd newGridScore
        }

gameWon : Grid -> Bool -- checks if a 2048 tile present in the grid
gameWon (Grid g) = 0 /= (length <| filter (\t -> t == Number 2048) <| concat g)

newGame : Input -> GameState
newGame input = placeRandomTile (input.randomFloats ! 0) (input.randomFloats ! 1)
             <| placeRandomTile (input.randomFloats ! 2) (input.randomFloats ! 3)
             <| defaultGame

stepGame : Input -> GameState -> GameState
stepGame input gameState = 
    if | input.controls.newGameButtonPressed -- if the new game button is pressed
            -> newGame input          -- then start a new game
       | gameState.gameProgress == GameOver -- else if the game is at game over
            -> gameState                    -- then do nothing
       | gameState.gameProgress == Won -- else if the game is won
            -> gameState               -- then do nothing
       | gameWon gameState.grid -- else if the grid contains a 2048 tile
            -> win gameState    -- then set the game to be won
       | gameLost gameState.grid -- else if the grid is completely fixed
            -> lose gameState    -- then set the game to be lost
       | input.controls.tilePushDirection /= None -- else if the tile push has 
                                                  -- changed to a direction
            -> let pushedState = pushTiles input gameState
                in if (pushedState == gameState) then gameState
                    else placeRandomTile 
                        (input.randomFloats ! 0) 
                        (input.randomFloats ! 1) 
                        pushedState -- then place a new tile
                                                  -- that direction
       | otherwise -> gameState -- else do nothing
