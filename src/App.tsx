import React, { useState } from "react";
import { Board } from "./components/Board";
import { calculateWinner } from "./utils/calculateWinner";

const App: React.FC = () => {
  // Store history of boards
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentBoard = history[currentMove];
  const isXNext = currentMove % 2 === 0;

  const handleClick = (index: number) => {
    if (currentBoard[index] || calculateWinner(currentBoard)) return;

    const newBoard = [...currentBoard];
    newBoard[index] = isXNext ? "X" : "O";

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newBoard]);
    setCurrentMove(newHistory.length);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
  };

  const winner = calculateWinner(currentBoard);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Tic Tac Toe</h1>
      <Board board={currentBoard} onClick={handleClick} />
      <h2>
        {winner
          ? `Winner: ${winner}`
          : currentBoard.every(Boolean)
          ? "Draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>

      <div style={{ marginTop: "20px" }}>
        <button
          style={{ marginBottom: "10px", padding: "5px 15px" }}
          onClick={() => {
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0);
          }}
        >
          Restart
        </button>

        <ol>
          {history.map((_, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move === 0 ? "Go to game start" : `Go to move #${move}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
