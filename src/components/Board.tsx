// components/Board.tsx
import React from "react";
import { Square } from "./Square";

type BoardProps = {
  board: Array<string | null>;
  onClick: (index: number) => void;
};

export const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  const renderSquare = (i: number) => (
    <Square value={board[i]} onClick={() => onClick(i)} />
  );

  return (
    <div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
