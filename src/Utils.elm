{--
2048-elm

Utils.elm

Copyright (c) 2014 Josh Kirklin

This source is subject to the MIT License.
Please see the LICENSE file for more information.
All other rights reserved.
--}

{------------------------------------------------------------------------------

                            Utility Functions

------------------------------------------------------------------------------}

module Utils where

groupedByTwo : [Int] -> [[Int]]
groupedByTwo l = groupedByTwo' <| filter (\x -> x/=0) l
groupedByTwo' l = case l of
    [] -> []
    [x] -> [[x]]
    [x,y] -> if (x == y) then [[x,y]] else [[x],[y]]
    (x::y::xs) -> if (x == y) then ([x,y] :: (groupedByTwo xs)) else ([x] :: (groupedByTwo (y::xs)))
    otherwise -> []

transpose : [[a]] -> [[a]]
transpose ll = case ll of
    [] -> []
    ([] :: xss) -> transpose xss
    ((x::xs)::xss) -> (x :: (map head xss)) :: transpose (xs :: (map tail xss))
