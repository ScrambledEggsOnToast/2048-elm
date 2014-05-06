module Logic where

import InputModel (Input)
import GameModel (GameState, Tile, Number, Empty, Grid, setTile, readTile)

import Random

{------------------------------------------------------------------------------

Game Logic

------------------------------------------------------------------------------}

tile2Probability : Float -- or tileNot4Probability
tile2Probability = 0.9

newTile : Float -> Tile
newTile x = if (x < tile2Probability) then (Number 2) else (Number 4)

stepGame : Input -> GameState -> GameState
stepGame input gameState = if input.userInput.tilePushDirection == gameState.tilePush then gameState else
                           { gameState | 
                                    tilePush <- input.userInput.tilePushDirection
                                  , nextTile <- newTile <| head <| input.randomFloats 
                                  , grid <- setTile (0,0) gameState.grid gameState.nextTile
                           }
