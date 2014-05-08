Elm.Elm2048 = Elm.Elm2048 || {};
Elm.Elm2048.make = function (_elm) {
   "use strict";
   _elm.Elm2048 = _elm.Elm2048 || {};
   if (_elm.Elm2048.values)
   return _elm.Elm2048.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Elm2048";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var GameModel = Elm.GameModel.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var InputModel = Elm.InputModel.make(_elm);
   var List = Elm.List.make(_elm);
   var Logic = Elm.Logic.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Rendering = Elm.Rendering.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Window = Elm.Window.make(_elm);
   var _op = {};
   var newGameButton = Native.Ports.portIn("newGameButton",
   Native.Ports.incomingSignal(function (v) {
      return typeof v === "boolean" ? v : _E.raise("invalid input, expecting JSBoolean but got " + v);
   }));
   var controls = A2(Signal._op["~"],
   A2(Signal._op["<~"],
   InputModel.Controls,
   InputModel.playerDirection),
   newGameButton);
   var input = A2(Signal._op["~"],
   A2(Signal._op["<~"],
   InputModel.Input,
   controls),
   InputModel.randomFloats(controls));
   var gameState = A3(Signal.foldp,
   Logic.stepGame,
   GameModel.defaultGame,
   input);
   var main = A2(Signal._op["~"],
   A2(Signal._op["<~"],
   Rendering.display,
   Window.dimensions),
   gameState);
   var score = Native.Ports.portOut("score",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   A2(Signal._op["<~"],
   function (x) {
      return x.score;
   },
   gameState));
   _elm.Elm2048.values = {_op: _op
                         ,controls: controls
                         ,input: input
                         ,gameState: gameState
                         ,main: main};
   return _elm.Elm2048.values;
};Elm.Rendering = Elm.Rendering || {};
Elm.Rendering.make = function (_elm) {
   "use strict";
   _elm.Rendering = _elm.Rendering || {};
   if (_elm.Rendering.values)
   return _elm.Rendering.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Rendering";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var GameModel = Elm.GameModel.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var tileTextSize = function (tile) {
      return function () {
         switch (tile.ctor)
         {case "Number": switch (tile._0)
              {case 128: return 45;
                 case 256: return 45;
                 case 512: return 45;
                 case 1024: return 35;
                 case 2048: return 35;}
              break;}
         return 55;
      }();
   };
   var tileTextColor = function (tile) {
      return function () {
         switch (tile.ctor)
         {case "Number":
            return _U.cmp(tile._0,
              8) > -1 ? A3(Color.rgb,
              249,
              246,
              242) : A3(Color.rgb,
              119,
              110,
              101);}
         return Color.black;
      }();
   };
   var tileTextStyle = function (tile) {
      return {_: {}
             ,bold: true
             ,color: tileTextColor(tile)
             ,height: Maybe.Just(tileTextSize(tile))
             ,italic: false
             ,line: Maybe.Nothing
             ,typeface: _L.fromArray(["Helvetica Neue"
                                     ,"Arial"
                                     ,"sans-serif"])};
   };
   var tileColor = function (tile) {
      return function () {
         switch (tile.ctor)
         {case "Number": switch (tile._0)
              {case 2: return A3(Color.rgb,
                   238,
                   228,
                   218);
                 case 4: return A3(Color.rgb,
                   237,
                   224,
                   200);
                 case 8: return A3(Color.rgb,
                   242,
                   177,
                   121);
                 case 16: return A3(Color.rgb,
                   245,
                   149,
                   99);
                 case 32: return A3(Color.rgb,
                   246,
                   124,
                   95);
                 case 64: return A3(Color.rgb,
                   246,
                   94,
                   59);
                 case 128: return A3(Color.rgb,
                   237,
                   207,
                   114);
                 case 256: return A3(Color.rgb,
                   237,
                   204,
                   97);
                 case 512: return A3(Color.rgb,
                   237,
                   200,
                   80);
                 case 1024: return A3(Color.rgb,
                   237,
                   197,
                   63);
                 case 2048: return A3(Color.rgb,
                   237,
                   194,
                   46);}
              break;}
         return A4(Color.rgba,
         238,
         228,
         218,
         0.35);
      }();
   };
   var tileMargin = 15;
   var tileSize = 106.25;
   var displayTile = function (tile) {
      return function () {
         var tileBackground = Graphics.Collage.filled(tileColor(tile))(Graphics.Collage.square(tileSize));
         return function () {
            switch (tile.ctor)
            {case "Empty":
               return A3(Graphics.Collage.collage,
                 Basics.round(tileSize),
                 Basics.round(tileSize),
                 _L.fromArray([tileBackground]));
               case "Number":
               return A3(Graphics.Collage.collage,
                 Basics.round(tileSize),
                 Basics.round(tileSize),
                 _L.fromArray([tileBackground
                              ,Graphics.Collage.toForm(Text.centered(Text.style(tileTextStyle(tile))(Text.toText(String.show(tile._0)))))]));}
            _E.Case($moduleName,
            "between lines 76 and 85");
         }();
      }();
   };
   var displayTileAtCoordinates = function (_v8) {
      return function () {
         switch (_v8.ctor)
         {case "_Tuple3":
            return function () {
                 var position = {ctor: "_Tuple2"
                                ,_0: (tileSize + tileMargin) * (Basics.toFloat(_v8._1) - (Basics.toFloat(GameModel.gridSize) - 1) / 2)
                                ,_1: (tileSize + tileMargin) * (Basics.toFloat(_v8._2) - (Basics.toFloat(GameModel.gridSize) - 1) / 2)};
                 return Graphics.Collage.move(position)(Graphics.Collage.toForm(displayTile(_v8._0)));
              }();}
         _E.Case($moduleName,
         "between lines 88 and 93");
      }();
   };
   var gridWidth = Basics.toFloat(GameModel.gridSize) * tileSize + (1 + Basics.toFloat(GameModel.gridSize)) * tileMargin;
   var displayGrid = function (_v13) {
      return function () {
         switch (_v13.ctor)
         {case "Grid":
            return function () {
                 var tiles = List.map(displayTileAtCoordinates)(List.concat(A2(List.zipWith,
                 F2(function (j,r) {
                    return A2(List.map,
                    function (_v16) {
                       return function () {
                          switch (_v16.ctor)
                          {case "_Tuple2":
                             return {ctor: "_Tuple3"
                                    ,_0: _v16._0
                                    ,_1: _v16._1
                                    ,_2: j};}
                          _E.Case($moduleName,
                          "on line 109, column 61 to 66");
                       }();
                    },
                    r);
                 }),
                 _L.range(0,
                 GameModel.gridSize - 1))(List.map(function (r) {
                    return A2(List.zip,
                    r,
                    _L.range(0,
                    GameModel.gridSize - 1));
                 })(_v13._0))));
                 var gridBox = Graphics.Collage.filled(A3(Color.rgb,
                 187,
                 173,
                 160))(Graphics.Collage.square(gridWidth));
                 return A3(Graphics.Collage.collage,
                 Basics.round(gridWidth),
                 Basics.round(gridWidth),
                 _L.append(_L.fromArray([gridBox]),
                 tiles));
              }();}
         _E.Case($moduleName,
         "between lines 103 and 115");
      }();
   };
   var displayOverlay = F3(function (s,
   c,
   t) {
      return A3(Graphics.Collage.collage,
      Basics.round(gridWidth),
      Basics.round(gridWidth),
      _L.fromArray([Graphics.Collage.filled(c)(Graphics.Collage.square(gridWidth))
                   ,Graphics.Collage.toForm(Text.centered(Text.style(s)(Text.toText(t))))]));
   });
   var displayGameOverOverlay = A3(displayOverlay,
   tileTextStyle(GameModel.Number(2)),
   A4(Color.rgba,238,228,218,0.73),
   "Game over!");
   var displayWonOverlay = A3(displayOverlay,
   tileTextStyle(GameModel.Number(16)),
   A4(Color.rgba,237,194,46,0.5),
   "You win!");
   var display = F2(function (_v20,
   gameState) {
      return function () {
         switch (_v20.ctor)
         {case "_Tuple2":
            return _U.eq(gameState.gameProgress,
              GameModel.GameOver) ? A3(Graphics.Collage.collage,
              Basics.round(gridWidth),
              Basics.round(gridWidth),
              _L.fromArray([Graphics.Collage.toForm(displayGrid(gameState.grid))
                           ,Graphics.Collage.toForm(displayGameOverOverlay)])) : _U.eq(gameState.gameProgress,
              GameModel.Won) ? A3(Graphics.Collage.collage,
              Basics.round(gridWidth),
              Basics.round(gridWidth),
              _L.fromArray([Graphics.Collage.toForm(displayGrid(gameState.grid))
                           ,Graphics.Collage.toForm(displayWonOverlay)])) : displayGrid(gameState.grid);}
         _E.Case($moduleName,
         "between lines 148 and 160");
      }();
   });
   _elm.Rendering.values = {_op: _op
                           ,tileSize: tileSize
                           ,tileMargin: tileMargin
                           ,tileColor: tileColor
                           ,tileTextColor: tileTextColor
                           ,tileTextSize: tileTextSize
                           ,tileTextStyle: tileTextStyle
                           ,displayTile: displayTile
                           ,displayTileAtCoordinates: displayTileAtCoordinates
                           ,gridWidth: gridWidth
                           ,displayGrid: displayGrid
                           ,displayOverlay: displayOverlay
                           ,displayGameOverOverlay: displayGameOverOverlay
                           ,displayWonOverlay: displayWonOverlay
                           ,display: display};
   return _elm.Rendering.values;
};Elm.Logic = Elm.Logic || {};
Elm.Logic.make = function (_elm) {
   "use strict";
   _elm.Logic = _elm.Logic || {};
   if (_elm.Logic.values)
   return _elm.Logic.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Logic";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var GameModel = Elm.GameModel.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var InputModel = Elm.InputModel.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Random = Elm.Random.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Utils = Elm.Utils.make(_elm);
   var _op = {};
   var emptyTiles = function (_v0) {
      return function () {
         switch (_v0.ctor)
         {case "Grid":
            return List.map(function (_v12) {
                 return function () {
                    switch (_v12.ctor)
                    {case "_Tuple3":
                       return {ctor: "_Tuple2"
                              ,_0: _v12._1
                              ,_1: _v12._2};}
                    _E.Case($moduleName,
                    "on line 155, column 41 to 44");
                 }();
              })(List.filter(function (_v7) {
                 return function () {
                    switch (_v7.ctor)
                    {case "_Tuple3":
                       return _U.eq(_v7._0,
                         GameModel.Empty);}
                    _E.Case($moduleName,
                    "on line 156, column 43 to 53");
                 }();
              })(List.concat(A2(List.zipWith,
              F2(function (j,r) {
                 return A2(List.map,
                 function (_v3) {
                    return function () {
                       switch (_v3.ctor)
                       {case "_Tuple2":
                          return {ctor: "_Tuple3"
                                 ,_0: _v3._0
                                 ,_1: _v3._1
                                 ,_2: j};}
                       _E.Case($moduleName,
                       "on line 158, column 56 to 61");
                    }();
                 },
                 r);
              }),
              _L.range(0,
              GameModel.gridSize - 1))(List.map(function (r) {
                 return A2(List.zip,
                 r,
                 _L.range(0,
                 GameModel.gridSize - 1));
              })(_v0._0)))));}
         _E.Case($moduleName,
         "between lines 155 and 160");
      }();
   };
   var newTileIndex = F2(function (x,
   g) {
      return function () {
         var emptyTileIndices = emptyTiles(g);
         return function () {
            switch (emptyTileIndices.ctor)
            {case "[]":
               return Maybe.Nothing;}
            return Maybe.Just(A2(Utils._op["!"],
            emptyTileIndices,
            Basics.floor(Basics.toFloat(List.length(emptyTileIndices)) * x)));
         }();
      }();
   });
   var tile2Probability = 0.9;
   var newTile = function (x) {
      return _U.cmp(x,
      tile2Probability) < 0 ? GameModel.Number(2) : GameModel.Number(4);
   };
   var placeRandomTile = F3(function (float1,
   float2,
   gameState) {
      return function () {
         var tileIndex = A2(newTileIndex,
         float1,
         gameState.grid);
         return _U.eq(tileIndex,
         Maybe.Nothing) ? gameState : _U.replace([["grid"
                                                  ,A2(GameModel.setTile,
                                                  A2(Maybe.maybe,
                                                  {ctor: "_Tuple2",_0: 0,_1: 0},
                                                  Basics.id)(tileIndex),
                                                  gameState.grid)(newTile(float2))]],
         gameState);
      }();
   });
   var newGame = function (input) {
      return A2(placeRandomTile,
      A2(Utils._op["!"],
      input.randomFloats,
      0),
      A2(Utils._op["!"],
      input.randomFloats,
      1))(A2(placeRandomTile,
      A2(Utils._op["!"],
      input.randomFloats,
      2),
      A2(Utils._op["!"],
      input.randomFloats,
      3))(GameModel.defaultGame));
   };
   var win = function (gameState) {
      return _U.replace([["gameProgress"
                         ,GameModel.Won]],
      gameState);
   };
   var lose = function (gameState) {
      return _U.replace([["gameProgress"
                         ,GameModel.GameOver]],
      gameState);
   };
   var gameWon = function (_v18) {
      return function () {
         switch (_v18.ctor)
         {case "Grid": return !_U.eq(0,
              List.length(List.filter(function (t) {
                 return _U.eq(t,
                 GameModel.Number(2048));
              })(List.concat(_v18._0))));}
         _E.Case($moduleName,
         "on line 132, column 20 to 79");
      }();
   };
   var groupedByTwo = function (l) {
      return groupedByTwo$(A2(List.filter,
      function (x) {
         return !_U.eq(x,0);
      },
      l));
   };
   var groupedByTwo$ = function (l) {
      return function () {
         switch (l.ctor)
         {case "::": switch (l._1.ctor)
              {case "::":
                 switch (l._1._1.ctor)
                   {case "[]": return _U.eq(l._0,
                        l._1._0) ? _L.fromArray([_L.fromArray([l._0
                                                              ,l._1._0])]) : _L.fromArray([_L.fromArray([l._0])
                                                                                          ,_L.fromArray([l._1._0])]);}
                   return _U.eq(l._0,
                   l._1._0) ? {ctor: "::"
                              ,_0: _L.fromArray([l._0
                                                ,l._1._0])
                              ,_1: groupedByTwo(l._1._1)} : {ctor: "::"
                                                            ,_0: _L.fromArray([l._0])
                                                            ,_1: groupedByTwo({ctor: "::"
                                                                              ,_0: l._1._0
                                                                              ,_1: l._1._1})};
                 case "[]":
                 return _L.fromArray([_L.fromArray([l._0])]);}
              break;}
         return _L.fromArray([]);
      }();
   };
   var slideRow = function (r) {
      return function () {
         var groupedInts = groupedByTwo(A2(List.map,
         GameModel.tileToInt,
         r));
         return {ctor: "_Tuple2"
                ,_0: List.map(GameModel.intToTile)(List.take(GameModel.gridSize)(_L.append(A2(List.map,
                List.sum,
                groupedInts),
                A2(List.repeat,
                GameModel.gridSize,
                0))))
                ,_1: List.sum(List.concat(A2(List.filter,
                function (x) {
                   return _U.cmp(List.length(x),
                   1) > 0;
                },
                groupedInts)))};
      }();
   };
   var slideGrid = F2(function (dir,
   _v26) {
      return function () {
         switch (_v26.ctor)
         {case "Grid":
            return function () {
                 var h = function () {
                    switch (dir.ctor)
                    {case "Down":
                       return function (x) {
                            return A2(List.zip,
                            Utils.transpose(A2(List.map,
                            Basics.fst,
                            x)),
                            A2(List.map,Basics.snd,x));
                         }(List.map(slideRow)(Utils.transpose(_v26._0)));
                       case "Left": return A2(List.map,
                         slideRow,
                         _v26._0);
                       case "Right":
                       return List.map(function (_v30) {
                            return function () {
                               switch (_v30.ctor)
                               {case "_Tuple2":
                                  return {ctor: "_Tuple2"
                                         ,_0: List.reverse(_v30._0)
                                         ,_1: _v30._1};}
                               _E.Case($moduleName,
                               "on line 86, column 46 to 57");
                            }();
                         })(List.map(slideRow)(A2(List.map,
                         List.reverse,
                         _v26._0)));
                       case "Up": return function (x) {
                            return A2(List.zip,
                            Utils.transpose(A2(List.map,
                            Basics.fst,
                            x)),
                            A2(List.map,Basics.snd,x));
                         }(List.map(function (_v34) {
                            return function () {
                               switch (_v34.ctor)
                               {case "_Tuple2":
                                  return {ctor: "_Tuple2"
                                         ,_0: List.reverse(_v34._0)
                                         ,_1: _v34._1};}
                               _E.Case($moduleName,
                               "on line 93, column 48 to 59");
                            }();
                         })(List.map(slideRow)(List.map(List.reverse)(Utils.transpose(_v26._0)))));}
                    return A2(List.zip,
                    _v26._0,
                    A2(List.repeat,
                    GameModel.gridSize,
                    0));
                 }();
                 return {ctor: "_Tuple2"
                        ,_0: GameModel.Grid(A2(List.map,
                        Basics.fst,
                        h))
                        ,_1: List.sum(A2(List.map,
                        Basics.snd,
                        h))};
              }();}
         _E.Case($moduleName,
         "between lines 84 and 98");
      }();
   });
   var pushTiles = F2(function (input,
   gameState) {
      return function () {
         var newGridScore = A2(slideGrid,
         input.controls.tilePushDirection,
         gameState.grid);
         return _U.eq(Basics.fst(newGridScore),
         gameState.grid) ? gameState : _U.replace([["grid"
                                                   ,Basics.fst(newGridScore)]
                                                  ,["score"
                                                   ,gameState.score + Basics.snd(newGridScore)]],
         gameState);
      }();
   });
   var gameLost = function (g) {
      return function () {
         var right = Basics.fst(A2(slideGrid,
         InputModel.Right,
         g));
         var left = Basics.fst(A2(slideGrid,
         InputModel.Left,
         g));
         var down = Basics.fst(A2(slideGrid,
         InputModel.Down,
         g));
         var up = Basics.fst(A2(slideGrid,
         InputModel.Up,
         g));
         return List.and(_L.fromArray([!_U.eq(g,
                                      GameModel.emptyGrid)
                                      ,_U.eq(up,down)
                                      ,_U.eq(down,left)
                                      ,_U.eq(left,right)
                                      ,_U.eq(right,g)]));
      }();
   };
   var stepGame = F2(function (input,
   gameState) {
      return input.controls.newGameButtonPressed ? newGame(input) : !_U.eq(gameState.gameProgress,
      GameModel.InProgress) ? gameState : gameWon(gameState.grid) ? win(gameState) : gameLost(gameState.grid) ? lose(gameState) : !_U.eq(input.controls.tilePushDirection,
      InputModel.None) ? function () {
         var pushedState = A2(pushTiles,
         input,
         gameState);
         return _U.eq(pushedState,
         gameState) ? gameState : A3(placeRandomTile,
         A2(Utils._op["!"],
         input.randomFloats,
         0),
         A2(Utils._op["!"],
         input.randomFloats,
         1),
         pushedState);
      }() : gameState;
   });
   _elm.Logic.values = {_op: _op
                       ,groupedByTwo: groupedByTwo
                       ,groupedByTwo$: groupedByTwo$
                       ,slideRow: slideRow
                       ,slideGrid: slideGrid
                       ,pushTiles: pushTiles
                       ,gameLost: gameLost
                       ,gameWon: gameWon
                       ,lose: lose
                       ,win: win
                       ,tile2Probability: tile2Probability
                       ,newTile: newTile
                       ,emptyTiles: emptyTiles
                       ,newTileIndex: newTileIndex
                       ,placeRandomTile: placeRandomTile
                       ,newGame: newGame
                       ,stepGame: stepGame};
   return _elm.Logic.values;
};Elm.GameModel = Elm.GameModel || {};
Elm.GameModel.make = function (_elm) {
   "use strict";
   _elm.GameModel = _elm.GameModel || {};
   if (_elm.GameModel.values)
   return _elm.GameModel.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "GameModel";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Utils = Elm.Utils.make(_elm);
   var _op = {};
   var gridSize = 4;
   var GameState = F3(function (a,
   b,
   c) {
      return {_: {}
             ,gameProgress: c
             ,grid: a
             ,score: b};
   });
   var Won = {ctor: "Won"};
   var GameOver = {ctor: "GameOver"};
   var InProgress = {ctor: "InProgress"};
   var Grid = function (a) {
      return {ctor: "Grid",_0: a};
   };
   var readTile = F2(function (_v0,
   _v1) {
      return function () {
         switch (_v1.ctor)
         {case "Grid":
            return function () {
                 switch (_v0.ctor)
                 {case "_Tuple2":
                    return A2(Utils._op["!"],
                      A2(Utils._op["!"],
                      _v1._0,
                      _v0._1),
                      _v0._0);}
                 _E.Case($moduleName,
                 "on line 40, column 29 to 39");
              }();}
         _E.Case($moduleName,
         "on line 40, column 29 to 39");
      }();
   });
   var setTile = F3(function (_v7,
   _v8,
   t) {
      return function () {
         switch (_v8.ctor)
         {case "Grid":
            return function () {
                 switch (_v7.ctor)
                 {case "_Tuple2":
                    return function () {
                         var r = A2(Utils._op["!"],
                         _v8._0,
                         _v7._1);
                         var nr = _L.append(A2(List.take,
                         _v7._0,
                         r),
                         _L.append(_L.fromArray([t]),
                         A2(List.drop,_v7._0 + 1,r)));
                         return Grid(_L.append(A2(List.take,
                         _v7._1,
                         _v8._0),
                         _L.append(_L.fromArray([nr]),
                         A2(List.drop,
                         _v7._1 + 1,
                         _v8._0))));
                      }();}
                 _E.Case($moduleName,
                 "between lines 44 and 48");
              }();}
         _E.Case($moduleName,
         "between lines 44 and 48");
      }();
   });
   var Empty = {ctor: "Empty"};
   var emptyGrid = Grid(List.repeat(gridSize)(List.repeat(gridSize)(Empty)));
   var defaultGame = {_: {}
                     ,gameProgress: InProgress
                     ,grid: emptyGrid
                     ,score: 0};
   var Number = function (a) {
      return {ctor: "Number"
             ,_0: a};
   };
   var tileToInt = function (t) {
      return function () {
         switch (t.ctor)
         {case "Number": return t._0;}
         return 0;
      }();
   };
   var intToTile = function (n) {
      return function () {
         switch (n)
         {case 0: return Empty;}
         return Number(n);
      }();
   };
   _elm.GameModel.values = {_op: _op
                           ,readTile: readTile
                           ,setTile: setTile
                           ,tileToInt: tileToInt
                           ,intToTile: intToTile
                           ,gridSize: gridSize
                           ,emptyGrid: emptyGrid
                           ,defaultGame: defaultGame
                           ,Number: Number
                           ,Empty: Empty
                           ,Grid: Grid
                           ,InProgress: InProgress
                           ,GameOver: GameOver
                           ,Won: Won
                           ,GameState: GameState};
   return _elm.GameModel.values;
};Elm.InputModel = Elm.InputModel || {};
Elm.InputModel.make = function (_elm) {
   "use strict";
   _elm.InputModel = _elm.InputModel || {};
   if (_elm.InputModel.values)
   return _elm.InputModel.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "InputModel";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Keyboard = Elm.Keyboard.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Random = Elm.Random.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var randomFloats = function (s) {
      return Random.floatList(Signal.sampleOn(s)(Signal.constant(4)));
   };
   var Input = F2(function (a,b) {
      return {_: {}
             ,controls: a
             ,randomFloats: b};
   });
   var Controls = F2(function (a,
   b) {
      return {_: {}
             ,newGameButtonPressed: b
             ,tilePushDirection: a};
   });
   var None = {ctor: "None"};
   var Right = {ctor: "Right"};
   var Left = {ctor: "Left"};
   var Down = {ctor: "Down"};
   var Up = {ctor: "Up"};
   var playerDirection = function () {
      var toDirection = function (ds) {
         return _U.eq(ds,
         {_: {}
         ,x: 0
         ,y: 1}) ? Up : _U.eq(ds,
         {_: {}
         ,x: 0
         ,y: -1}) ? Down : _U.eq(ds,
         {_: {}
         ,x: 1
         ,y: 0}) ? Right : _U.eq(ds,
         {_: {}
         ,x: -1
         ,y: 0}) ? Left : None;
      };
      return A2(Signal.merge,
      A2(Signal._op["<~"],
      toDirection,
      Keyboard.arrows),
      A2(Signal._op["<~"],
      toDirection,
      Keyboard.wasd));
   }();
   _elm.InputModel.values = {_op: _op
                            ,playerDirection: playerDirection
                            ,randomFloats: randomFloats
                            ,Up: Up
                            ,Down: Down
                            ,Left: Left
                            ,Right: Right
                            ,None: None
                            ,Controls: Controls
                            ,Input: Input};
   return _elm.InputModel.values;
};Elm.Utils = Elm.Utils || {};
Elm.Utils.make = function (_elm) {
   "use strict";
   _elm.Utils = _elm.Utils || {};
   if (_elm.Utils.values)
   return _elm.Utils.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Utils";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   _op["!"] = F2(function (l,n) {
      return function () {
         var _v0 = {ctor: "_Tuple2"
                   ,_0: l
                   ,_1: n};
         switch (_v0.ctor)
         {case "_Tuple2": switch (_v0._1)
              {case 0:
                 return List.head(_v0._0);}
              switch (_v0._0.ctor)
              {case "::": return A2(_op["!"],
                   _v0._0._1,
                   _v0._1 - 1);}
              break;}
         _E.Case($moduleName,
         "between lines 29 and 31");
      }();
   });
   var transpose = function (ll) {
      return function () {
         switch (ll.ctor)
         {case "::": switch (ll._0.ctor)
              {case "::": return {ctor: "::"
                                 ,_0: {ctor: "::"
                                      ,_0: ll._0._0
                                      ,_1: A2(List.map,
                                      List.head,
                                      ll._1)}
                                 ,_1: transpose({ctor: "::"
                                                ,_0: ll._0._1
                                                ,_1: A2(List.map,
                                                List.tail,
                                                ll._1)})};
                 case "[]":
                 return transpose(ll._1);}
              break;}
         return _L.fromArray([]);
      }();
   };
   _elm.Utils.values = {_op: _op
                       ,transpose: transpose};
   return _elm.Utils.values;
};