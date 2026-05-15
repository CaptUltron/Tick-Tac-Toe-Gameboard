import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";
import { useState } from "react"

function App() {

  const PLAYER = {
    X: "Player 1",
    O: "Player 2"
  }

  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const [gameTurns, setGameTurns] = useState([]);
  const [playerNameChange, setPlayerNameChange] = useState(PLAYER)

  //helper function
  function deriveActivePlayer() {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }
    return currentPlayer;
  }

  function deriveGameBoard() {
    let gameBoard = [...INITIAL_GAME_BOARD.map((gameArray) => [...gameArray])];

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }

    return gameBoard;

  }

  function deriveWinner(gameBoard) {
    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
      const firstPerfectCombination = gameBoard[combination[0].row][combination[0].column]
      const secondPerfectCombination = gameBoard[combination[1].row][combination[1].column]
      const ThirdPerfectCombination = gameBoard[combination[2].row][combination[2].column]

      if (firstPerfectCombination &&
        firstPerfectCombination == secondPerfectCombination &&
        firstPerfectCombination == ThirdPerfectCombination) {
        winner = playerNameChange[firstPerfectCombination];
      }
    }
    return winner;
  }

  const activePlayer = deriveActivePlayer();
  const gameBoard = deriveGameBoard();
  const winner = deriveWinner(gameBoard);
  const isDraw = gameTurns.length == 9 && !winner;

  function handleOnSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer();

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYER.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={setPlayerNameChange} />
          <Player initialName={PLAYER.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={setPlayerNameChange} />
        </ol>

        <GameBoard onSelectSquare={handleOnSelectSquare} board={gameBoard} />
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      </div>
      <Logs turns={gameTurns} />
    </main>
  )
}

export default App
