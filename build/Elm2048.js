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
   var gameState = A3(Signal.foldp,
   Logic.stepGame,
   GameModel.defaultGame,
   InputModel.input);
   var main = A2(Signal._op["~"],
   A2(Signal._op["<~"],
   Rendering.display,
   Window.dimensions),
   gameState);
   _elm.Elm2048.values = {_op: _op
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
             ,typeface: _L.fromArray(["Clear Sans"
                                     ,"Helvetica Neue"
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
         switch (tile.ctor)
         {case "Empty":
            return A3(Graphics.Collage.collage,
              Basics.round(tileSize),
              Basics.round(tileSize),
              _L.fromArray([Graphics.Collage.filled(tileColor(tile))(Graphics.Collage.square(tileSize))]));
            case "Number":
            return A3(Graphics.Collage.collage,
              Basics.round(tileSize),
              Basics.round(tileSize),
              _L.fromArray([Graphics.Collage.filled(tileColor(tile))(Graphics.Collage.square(tileSize))
                           ,Graphics.Collage.toForm(Text.centered(Text.style(tileTextStyle(tile))(Text.toText(String.show(tile._0)))))]));}
         _E.Case($moduleName,
         "between lines 57 and 64");
      }();
   };
   var displayGrid = function (_v8) {
      return function () {
         switch (_v8.ctor)
         {case "Grid":
            return function () {
                 var tiles = List.map(function (_v15) {
                    return function () {
                       switch (_v15.ctor)
                       {case "_Tuple3":
                          return Graphics.Collage.move({ctor: "_Tuple2"
                                                       ,_0: (tileSize + tileMargin) * (_v15._1 - 1.5)
                                                       ,_1: (tileSize + tileMargin) * (_v15._2 - 1.5)})(Graphics.Collage.toForm(displayTile(_v15._0)));}
                       _E.Case($moduleName,
                       "on line 69, column 46 to 143");
                    }();
                 })(List.concat(A2(List.zipWith,
                 F2(function (j,r) {
                    return A2(List.map,
                    function (_v11) {
                       return function () {
                          switch (_v11.ctor)
                          {case "_Tuple2":
                             return {ctor: "_Tuple3"
                                    ,_0: _v11._0
                                    ,_1: _v11._1
                                    ,_2: j};}
                          _E.Case($moduleName,
                          "on line 71, column 61 to 66");
                       }();
                    },
                    r);
                 }),
                 _L.range(0,
                 3))(List.map(function (r) {
                    return A2(List.zip,
                    r,
                    _L.range(0,3));
                 })(_v8._0))));
                 var gridBox = Graphics.Collage.filled(A3(Color.rgb,
                 187,
                 173,
                 160))(Graphics.Collage.square(4 * tileSize + 5 * tileMargin));
                 return A3(Graphics.Collage.collage,
                 Basics.round(4 * tileSize + 5 * tileMargin),
                 Basics.round(4 * tileSize + 5 * tileMargin),
                 _L.append(_L.fromArray([gridBox]),
                 tiles));
              }();}
         _E.Case($moduleName,
         "between lines 67 and 74");
      }();
   };
   var display = F2(function (_v20,
   gameState) {
      return function () {
         switch (_v20.ctor)
         {case "_Tuple2":
            return A3(Graphics.Collage.collage,
              Basics.round(4 * tileSize + 5 * tileMargin),
              Basics.round(4 * tileSize + 5 * tileMargin),
              _L.fromArray([Graphics.Collage.toForm(displayGrid(gameState.grid))
                           ,Graphics.Collage.toForm(Text.asText(_L.append(String.show(gameState.nextTile),
                           _L.append(", ",
                           String.show(gameState.tilePush)))))]));}
         _E.Case($moduleName,
         "between lines 77 and 81");
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
                           ,displayGrid: displayGrid
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
   var _op = {};
   var newTileIndex = F2(function (x,
   g) {
      return function () {
         var emptyTileIndices = GameModel.emptyTiles(g);
         return function () {
            switch (emptyTileIndices.ctor)
            {case "[]":
               return Maybe.Nothing;}
            return Maybe.Just(List.head(A2(List.drop,
            Basics.floor(Basics.toFloat(List.length(emptyTileIndices)) * x),
            emptyTileIndices)));
         }();
      }();
   });
   var tile2Probability = 0.9;
   var newTile = function (x) {
      return _U.cmp(x,
      tile2Probability) < 0 ? GameModel.Number(2) : GameModel.Number(4);
   };
   var stepGame = F2(function (input,
   gameState) {
      return _U.cmp(gameState.tilesToPlace,
      0) > 0 ? _U.replace([["nextTile"
                           ,newTile(List.head(input.randomFloats))]
                          ,["grid"
                           ,A3(GameModel.setTile,
                           A2(Maybe.maybe,
                           {ctor: "_Tuple2",_0: 0,_1: 0},
                           Basics.id)(A2(newTileIndex,
                           List.last(input.randomFloats),
                           gameState.grid)),
                           gameState.grid,
                           gameState.nextTile)]
                          ,["tilesToPlace"
                           ,gameState.tilesToPlace - 1]],
      gameState) : _U.eq(input.userInput.tilePushDirection,
      gameState.tilePush) ? gameState : _U.replace([["tilePush"
                                                    ,input.userInput.tilePushDirection]
                                                   ,["tilesToPlace"
                                                    ,gameState.tilesToPlace + 1]],
      gameState);
   });
   _elm.Logic.values = {_op: _op
                       ,tile2Probability: tile2Probability
                       ,newTile: newTile
                       ,newTileIndex: newTileIndex
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
   var InputModel = Elm.InputModel.make(_elm);
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
   var GameState = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,grid: a
             ,nextTile: c
             ,tilePush: b
             ,tilesToPlace: d};
   });
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
                    return List.head(List.drop(_v0._0)(List.head(List.drop(_v0._1)(_v1._0))));}
                 _E.Case($moduleName,
                 "on line 31, column 28 to 65");
              }();}
         _E.Case($moduleName,
         "on line 31, column 28 to 65");
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
                         var r = List.head(List.drop(_v7._1)(_v8._0));
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
                 "between lines 34 and 37");
              }();}
         _E.Case($moduleName,
         "between lines 34 and 37");
      }();
   });
   var Empty = {ctor: "Empty"};
   var emptyGrid = Grid(List.repeat(4)(List.repeat(4)(Empty)));
   var emptyTiles = function (_v14) {
      return function () {
         switch (_v14.ctor)
         {case "Grid":
            return List.map(function (_v26) {
                 return function () {
                    switch (_v26.ctor)
                    {case "_Tuple3":
                       return {ctor: "_Tuple2"
                              ,_0: _v26._1
                              ,_1: _v26._2};}
                    _E.Case($moduleName,
                    "on line 40, column 41 to 44");
                 }();
              })(List.filter(function (_v21) {
                 return function () {
                    switch (_v21.ctor)
                    {case "_Tuple3":
                       return _U.eq(_v21._0,Empty);}
                    _E.Case($moduleName,
                    "on line 41, column 43 to 53");
                 }();
              })(List.concat(A2(List.zipWith,
              F2(function (j,r) {
                 return A2(List.map,
                 function (_v17) {
                    return function () {
                       switch (_v17.ctor)
                       {case "_Tuple2":
                          return {ctor: "_Tuple3"
                                 ,_0: _v17._0
                                 ,_1: _v17._1
                                 ,_2: j};}
                       _E.Case($moduleName,
                       "on line 43, column 56 to 61");
                    }();
                 },
                 r);
              }),
              _L.range(0,
              3))(List.map(function (r) {
                 return A2(List.zip,
                 r,
                 _L.range(0,3));
              })(_v14._0)))));}
         _E.Case($moduleName,
         "between lines 40 and 45");
      }();
   };
   var defaultGame = {_: {}
                     ,grid: emptyGrid
                     ,nextTile: Empty
                     ,tilePush: InputModel.Up
                     ,tilesToPlace: 3};
   var Number = function (a) {
      return {ctor: "Number"
             ,_0: a};
   };
   _elm.GameModel.values = {_op: _op
                           ,emptyGrid: emptyGrid
                           ,readTile: readTile
                           ,setTile: setTile
                           ,emptyTiles: emptyTiles
                           ,defaultGame: defaultGame
                           ,Number: Number
                           ,Empty: Empty
                           ,Grid: Grid
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
   var delta = Time.fps(30);
   var Input = F3(function (a,
   b,
   c) {
      return {_: {}
             ,randomFloats: c
             ,timeDelta: a
             ,userInput: b};
   });
   var UserInput = function (a) {
      return {_: {}
             ,tilePushDirection: a};
   };
   var Right = {ctor: "Right"};
   var Left = {ctor: "Left"};
   var Down = {ctor: "Down"};
   var Up = {ctor: "Up"};
   var arrowsDirection = function () {
      var toDirection = F2(function (ds,
      wasds) {
         return _U.eq(ds,
         {_: {}
         ,x: 0
         ,y: 1}) ? Maybe.Just(Up) : _U.eq(ds,
         {_: {}
         ,x: 0
         ,y: -1}) ? Maybe.Just(Down) : _U.eq(ds,
         {_: {}
         ,x: 1
         ,y: 0}) ? Maybe.Just(Right) : _U.eq(ds,
         {_: {}
         ,x: -1
         ,y: 0}) ? Maybe.Just(Left) : _U.eq(wasds,
         {_: {}
         ,x: 0
         ,y: 1}) ? Maybe.Just(Up) : _U.eq(wasds,
         {_: {}
         ,x: 0
         ,y: -1}) ? Maybe.Just(Down) : _U.eq(wasds,
         {_: {}
         ,x: 1
         ,y: 0}) ? Maybe.Just(Right) : _U.eq(wasds,
         {_: {}
         ,x: -1
         ,y: 0}) ? Maybe.Just(Left) : Maybe.Nothing;
      });
      return A2(Signal._op["~"],
      A2(Signal._op["<~"],
      toDirection,
      Keyboard.arrows),
      Keyboard.wasd);
   }();
   var userInput = A2(Signal._op["<~"],
   function (d) {
      return {_: {}
             ,tilePushDirection: A3(Maybe.maybe,
             Up,
             Basics.id,
             d)};
   },
   A2(Signal.dropIf,
   function (d) {
      return _U.eq(d,
      Maybe.Nothing);
   },
   Maybe.Nothing)(Signal.dropRepeats(arrowsDirection)));
   var randomFloats = function (s) {
      return Random.floatList(Signal.sampleOn(userInput)(Signal.constant(2)));
   };
   var input = Signal.sampleOn(delta)(A2(Signal._op["~"],
   A2(Signal._op["~"],
   A2(Signal._op["<~"],
   Input,
   delta),
   userInput),
   randomFloats(delta)));
   _elm.InputModel.values = {_op: _op
                            ,arrowsDirection: arrowsDirection
                            ,userInput: userInput
                            ,randomFloats: randomFloats
                            ,delta: delta
                            ,input: input
                            ,Up: Up
                            ,Down: Down
                            ,Left: Left
                            ,Right: Right
                            ,UserInput: UserInput
                            ,Input: Input};
   return _elm.InputModel.values;
};