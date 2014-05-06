module Logic where

import InputModel (Input)
import GameModel (GameState)

{------------------------------------------------------------------------------

Game Logic

------------------------------------------------------------------------------}

stepGame : Input -> GameState -> GameState
stepGame input gameState = { gameState | tilePush <- input.userInput.tilePushDirection }
