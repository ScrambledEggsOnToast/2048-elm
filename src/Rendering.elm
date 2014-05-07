module Rendering where

import GameModel (Tile, Number, Empty, Grid, GameState)

{------------------------------------------------------------------------------

Rendering

------------------------------------------------------------------------------}

tileSize : Float
tileSize = 106.25

tileMargin : Float
tileMargin = 15

tileColor : Tile -> Color
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
                  otherwise -> rgba 238 228 218 0.35

tileTextColor : Tile -> Color
tileTextColor tile = case tile of 
                  Number n -> if n >= 8 then (rgb 249 246 242) else (rgb 119 110 101)
                  otherwise -> black

tileTextSize : Tile -> Float 
tileTextSize tile = case tile of 
                  Number 128 -> 45
                  Number 256 -> 45
                  Number 512 -> 45
                  Number 1024 -> 35
                  Number 2048 -> 35
                  otherwise -> 55

tileTextStyle : Tile -> Style
tileTextStyle tile = {
                  typeface = [ "Clear Sans", "Helvetica Neue", "Arial", "sans-serif" ]
                , height = Just <| tileTextSize tile
                , color = tileTextColor tile
                , bold = True
                , italic = False
                , line = Nothing
                }

displayTile : Tile -> Element
displayTile tile = case tile of 
                    Number n -> collage (round tileSize) (round tileSize) 
                       [ 
                         filled (tileColor tile) <| square tileSize
                       , toForm <| centered <| style (tileTextStyle tile) <| toText <| show n
                       ]
                    Empty -> collage (round tileSize) (round tileSize) 
                       [ filled (tileColor Empty) <| square tileSize ]

displayGrid : Grid -> Element
displayGrid (Grid ts) = let
                    gridWidth = 4*tileSize + 5*tileMargin
                    gridBox = filled (rgb 187 173 160) <| square gridWidth
                    tiles = map (\(t,i,j) -> move ((tileSize + tileMargin)*(i-1.5),(tileSize + tileMargin)*(j-1.5)) <| toForm <| displayTile t) 
                        <| concat 
                        <| zipWith (\j r -> map (\(t,i) -> (t,i,j)) r) [0..3] 
                        <| map (\r -> zip r [0..3]) 
                        <| ts
    in collage (round gridWidth) (round gridWidth) ([gridBox] ++ tiles)

display : (Int,Int) -> GameState -> Element
display (w,h) gameState = displayGrid gameState.grid

