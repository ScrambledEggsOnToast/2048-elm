module Logic where

import InputModel (Input)
import GameModel (GameState, Tile, Number, Empty, Grid, setTile, readTile, emptyTiles)

import Random

{------------------------------------------------------------------------------

Game Logic

------------------------------------------------------------------------------}

tile2Probability : Float -- or tileNot4Probability
tile2Probability = 0.9

newTile : Float -> Tile
newTile x = if (x < tile2Probability) then (Number 2) else (Number 4)

newTileIndex : Float -> Grid -> Maybe (Int, Int)
newTileIndex x g = let emptyTileIndices = emptyTiles g
    in case emptyTileIndices of 
        [] -> Nothing
        otherwise -> Just <| head <| drop (floor <| (toFloat <| length emptyTileIndices) * x) emptyTileIndices

stepGame : Input -> GameState -> GameState
stepGame input gameState = if gameState.tilesToPlace > 0 then
                           { gameState |
                                    nextTile <- newTile <| head <| input.randomFloats
                                  , grid <- setTile (maybe (0,0) id <| newTileIndex (last input.randomFloats) gameState.grid) gameState.grid gameState.nextTile
                                  , tilesToPlace <- gameState.tilesToPlace - 1
                           }
                           else if input.userInput.tilePushDirection == gameState.tilePush then gameState else
                           { gameState | 
                                    tilePush <- input.userInput.tilePushDirection
                                  , tilesToPlace <- gameState.tilesToPlace + 1
                           }
