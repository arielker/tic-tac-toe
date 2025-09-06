import React, { useState } from "react";
import { Board } from "./components/Board";
import { calculateWinner } from "./utils/calculateWinner";

const App: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Tic Tac Toe</h1>
      <Board board={board} onClick={handleClick} />
      <h2>
        {winner
          ? `Winner: ${winner}`
          : board.every(Boolean)
          ? "Draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>
      <button
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1rem" }}
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default App;
