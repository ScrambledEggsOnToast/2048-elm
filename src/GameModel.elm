module GameModel where

import InputModel (Direction, Up, Down, Left, Right, None)
import Utils (groupedByTwo, transpose)

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

type GameState = { grid:Grid, tilePush:Direction, nextTile:Tile, tilesToPlace:Int, score:Int, gameProgress:Progress }

emptyGrid : Grid
emptyGrid = Grid <| repeat 4 <| repeat 4 <| Empty

readTile : (Int, Int) -> Grid -> Tile
readTile (i, j) (Grid g) = head <| drop i <| head <| drop j <| g

setTile : (Int, Int) -> Grid -> Tile -> Grid
setTile (i, j) (Grid g) t = let 
        r = head <| drop j <| g
        nr = (take i r) ++ [t] ++ (drop (i+1) r)
    in Grid <| (take j g) ++ [nr] ++ (drop (j+1) g)

emptyTiles : Grid -> [(Int, Int)]
emptyTiles (Grid g) = map (\(_,i,j) -> (i,j)) 
                   <| filter (\(t,_,_) -> t == Empty) 
                   <| concat
                   <| zipWith (\j r -> map (\(t,i) -> (t,i,j)) r) [0..3] 
                   <| map (\r -> zip r [0..3]) 
                   <| g

tileToInt : Tile -> Int
tileToInt t = case t of
    Number n -> n
    otherwise -> 0

intToTile : Int -> Tile
intToTile n = case n of
    0 -> Empty
    otherwise -> Number n

slideRow : [Tile] -> ([Tile], Int) -- slides list of tiles to left, merging tiles where necessary
slideRow r = let groupedInts = groupedByTwo <| map tileToInt r 
    in ((map intToTile <| take 4 <| ((map sum groupedInts) ++ [0,0,0,0])), sum <| concat <| filter (\x -> length x > 1) groupedInts)

slideGrid : Direction -> Grid -> (Grid, Int)
slideGrid dir (Grid g) = let h = case dir of
                            Down -> (\x -> zip (transpose <| map fst x) (map snd x)) <| map slideRow <| transpose g
                            Up -> (\x -> zip (transpose <| map fst x) (map snd x)) <| map (\(r,s) -> (reverse r,s)) <| map slideRow <| map reverse <| transpose g
                            Left -> map slideRow g
                            Right -> map (\(r,s) -> (reverse r,s)) <| map slideRow <| map reverse g
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
      

defaultGame : GameState
defaultGame = { grid = emptyGrid, tilePush = None, nextTile = Empty, tilesToPlace = 3, score = 0, gameProgress = Beginning }

