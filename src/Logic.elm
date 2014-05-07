module Logic where

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
  , GameState
  , Tile
  , Number
  , Empty
  , Grid
  , setTile
  , readTile
  , tileToInt
  , intToTile
  , Finished
  , InProgress
  , Beginning
  )

import Utils (groupedByTwo, transpose)

import Random

{------------------------------------------------------------------------------

Game Logic

------------------------------------------------------------------------------}

emptyTiles : Grid -> [(Int, Int)]
emptyTiles (Grid g) = map (\(_,i,j) -> (i,j)) 
                   <| filter (\(t,_,_) -> t == Empty) 
                   <| concat
                   <| zipWith (\j r -> map (\(t,i) -> (t,i,j)) r) [0..3] 
                   <| map (\r -> zip r [0..3]) 
                   <| g

slideRow : [Tile] -> ([Tile], Int) -- slides list of tiles to left, merging tiles where necessary
slideRow r = let groupedInts = groupedByTwo <| map tileToInt r 
    in (
        map intToTile 
        <| take 4 
        <| ((map sum groupedInts) ++ [0,0,0,0])
      , sum 
        <| concat 
        <| filter (\x -> length x > 1) groupedInts
    )

slideGrid : Direction -> Grid -> (Grid, Int)
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

gridFull : Grid -> Bool
gridFull g = let
        up = fst <| slideGrid Up g
        down = fst <| slideGrid Down g
        left = fst <| slideGrid Left g
        right = fst <| slideGrid Right g
    in and 
        [
          up == down
        , down == left
        , left == right
        ]

tile2Probability : Float -- or tileNot4Probability
tile2Probability = 0.9

newTile : Float -> Tile
newTile x = if (x < tile2Probability) then (Number 2) else (Number 4)

newTileIndex : Float -> Grid -> Maybe (Int, Int)
newTileIndex x g = let emptyTileIndices = emptyTiles g
    in case emptyTileIndices of 
        [] -> Nothing
        otherwise -> Just 
                    <| head 
                    <| drop (floor <| (toFloat <| length emptyTileIndices) * x) emptyTileIndices

inProgressGameState : GameState -> GameState
inProgressGameState gameState = { gameState | gameProgress <- InProgress }

finishGameState : GameState -> GameState
finishGameState gameState = { gameState | gameProgress <- Finished }

placeRandomTile : Input -> GameState -> GameState
placeRandomTile input gameState = { gameState |
                                        nextTile <- newTile <| head <| input.randomFloats
                                      , grid <- setTile 
                                                (maybe (0,0) id <| newTileIndex (last input.randomFloats) 
                                                gameState.grid) 
                                                gameState.grid gameState.nextTile
                                      , tilesToPlace <- gameState.tilesToPlace - 1
                                  }

noTilePushDirection : GameState -> GameState
noTilePushDirection gameState = { gameState | tilePush <- None }

pushTiles : Input -> GameState -> GameState
pushTiles input gameState = let newGridScore = slideGrid input.userInput.tilePushDirection gameState.grid in
                                    if (fst newGridScore == gameState.grid) then gameState else
                                        { gameState | 
                                            tilePush <- input.userInput.tilePushDirection
                                          , tilesToPlace <- gameState.tilesToPlace + 1
                                          , grid <- fst newGridScore
                                          , score <- gameState.score + snd newGridScore
                                        }

stepGame : Input -> GameState -> GameState
stepGame input gameState = if | input.newGameButtonPressed -> defaultGame
                              | gameState.gameProgress == Finished -> gameState
                              | and [gridFull gameState.grid, gameState.gameProgress == InProgress] -> finishGameState gameState
                              | gameState.tilesToPlace > 0 -> placeRandomTile input gameState
                              | gameState.gameProgress == Beginning -> inProgressGameState gameState
                              | input.userInput.tilePushDirection == gameState.tilePush -> gameState
                              | input.userInput.tilePushDirection == None -> noTilePushDirection gameState
                              | input.userInput.tilePushDirection /= None -> pushTiles input gameState
                              | otherwise -> gameState
