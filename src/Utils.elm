module Utils where

groupedByTwo : [Int] -> [[Int]]
groupedByTwo l = groupedByTwo' <| filter (\x -> x/=0) l
groupedByTwo' l = case l of
    [] -> []
    [x] -> [[x]]
    [x,y] -> if (x == y) then [[x,y]] else [[x],[y]]
    (x::y::xs) -> if (x == y) then ([x,y] :: (groupedByTwo xs)) else ([x] :: (groupedByTwo (y::xs)))
    otherwise -> []

group : [a] -> [[a]]
group = groupBy (==)

groupBy : (a -> a -> Bool) -> [a] -> [[a]]
groupBy eq a = case a of
    [] -> []
    (x::xs) -> let (ys,zs) = span (eq x) xs in (x::ys) :: groupBy eq zs
    otherwise -> []

span : (a -> Bool) -> [a] -> ([a],[a])
span p xs = case xs of
    [] -> (xs,xs)
    (x::xs') -> if (p x) then (let (ys,zs) = span p xs' in (x::ys,zs)) else ([],xs)

transpose : [[a]] -> [[a]]
transpose ll = case ll of
    [] -> []
    ([] :: xss) -> transpose xss
    ((x::xs)::xss) -> (x :: (map head xss)) :: transpose (xs :: (map tail xss))
