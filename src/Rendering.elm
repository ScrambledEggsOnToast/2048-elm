{--
2048-elm

Rendering.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

{------------------------------------------------------------------------------

                                Rendering

------------------------------------------------------------------------------}

module Rendering where

import GameModel (Tile, Number, Empty, Grid, GameState, GameOver, Won)

tileSize : Float -- the width of a tile
tileSize = 106.25

tileMargin : Float -- the width of the gaps between tiles
tileMargin = 15

gridWidth : Float -- the width of the entire game grid
gridWidth = 4*tileSize + 5*tileMargin

tileColor : Tile -> Color -- the color of a tile
tileColor tile = case tile of
                  Number 2 -> rgb 238 228 218
                  Number 4 -> rgb 237 224 200
                  Number 8 -> rgb 242 177 121
                  Number 16 -> rgb 245 149 99
                  Number 32 -> rgb 246 124 95
                  Number 64 -> rgb 246 94 59
                  Number 128 -> rgb 237 207 114
                  Number 256 -> rgb 237 204 97
                  Number 512 -> rgb 237 200 80
                  Number 1024 -> rgb 237 197 63
                  Number 2048 -> rgb 237 194 46
                  otherwise -> rgba 238 228 218 0.35 -- empty tile

tileTextColor : Tile -> Color -- the text color of a tile
tileTextColor tile = case tile of 
                  Number n -> if n >= 8 then (rgb 249 246 242) 
                                else (rgb 119 110 101)
                  otherwise -> black -- empty tile

tileTextSize : Tile -> Float -- the text size of a tile
tileTextSize tile = case tile of 
                  Number 128 -> 45
                  Number 256 -> 45
                  Number 512 -> 45
                  Number 1024 -> 35
                  Number 2048 -> 35
                  otherwise -> 55 -- empty tile

tileTextStyle : Tile -> Style -- the text style of a tile
tileTextStyle tile = {
                  typeface = [ "Helvetica Neue", "Arial", "sans-serif" ]
                , height = Just <| tileTextSize tile
                , color = tileTextColor tile
                , bold = True
                , italic = False
                , line = Nothing
                }

displayTile : Tile -> Element -- display a tile
displayTile tile = let tileBackground = filled (tileColor tile) 
                                        <| square tileSize
                in case tile of 
                    Number n -> collage (round tileSize) (round tileSize) 
                       [ 
                         tileBackground -- the tile background
                       , toForm <| centered  -- and the number
                                <| style (tileTextStyle tile) 
                                <| toText <| show n
                       ]
                    Empty -> collage (round tileSize) (round tileSize) 
                       [ tileBackground ] -- just the background

displayTileAtCoordinates : (Tile, Int, Int) -> Form
displayTileAtCoordinates (t,i,j) = let position = 
                        (
                          (tileSize + tileMargin) * (toFloat i - 1.5)
                        , (tileSize + tileMargin) * (toFloat j - 1.5)
                        )
                    in move position <| toForm <| displayTile t

displayGrid : Grid -> Element -- display a grid
displayGrid (Grid ts) = let
                    gridBox = filled (rgb 187 173 160) -- the grid background
                                <| square gridWidth
                    tiles = map displayTileAtCoordinates 
                        <| concat -- a list of the tiles with their row and 
                                  -- column coordinates
                        <| zipWith (\j r -> map (\(t,i) -> (t,i,j)) r) [0..3] 
                                -- the tiles with row and column 
                                -- coordinates attached
                        <| map (\r -> zip r [0..3]) -- the tiles with a row 
                                                    -- coordinate attached
                        <| ts -- the tiles
    in collage (round gridWidth) (round gridWidth) ([gridBox] ++ tiles)

displayOverlay : Style -> Color -> String ->  Element -- display an overlay 
                                                      -- with a message
displayOverlay s c t = collage (round gridWidth) (round gridWidth)
    [ 
      filled c <| square gridWidth -- background
    , toForm <| centered <| style s <| toText t -- message
    ]


displayGameOverOverlay : Element -- display a game over overlay
displayGameOverOverlay = displayOverlay 
                            (tileTextStyle <| Number 2)
                            (rgba 238 228 218 0.73)
                            "Game over!"

displayWonOverlay : Element -- display a game won overlay
displayWonOverlay = displayOverlay 
                            (tileTextStyle <| Number 16)
                            (rgba 237 194 46 0.5)
                            "You win!"

display : (Int,Int) -> GameState -> Element -- display a game
display (w,h) gameState = 
    if gameState.gameProgress == GameOver 
    then collage (round gridWidth) (round gridWidth) -- game over screen
        [
          toForm <| displayGrid gameState.grid
        , toForm <| displayGameOverOverlay
        ]
    else if gameState.gameProgress == Won 
    then collage (round gridWidth) (round gridWidth) -- victory screen
        [
          toForm <| displayGrid gameState.grid
        , toForm <| displayWonOverlay
        ]
    else displayGrid gameState.grid -- just the grid

