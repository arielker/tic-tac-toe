import { Box } from "@mui/material";
import { Square } from "./Square";

type BoardProps = {
  board: Array<string | null>;
  onClick: (index: number) => void;
  winningSquares?: number[];
  size?: number; // new prop for square size
};

export const Board: React.FC<BoardProps> = ({
  board,
  onClick,
  winningSquares = [],
  size = 60,
}) => {
  const renderSquare = (i: number) => (
    <Square
      key={i}
      value={board[i]}
      onClick={() => onClick(i)}
      highlight={winningSquares.includes(i)}
      size={size}
    />
  );

  return (
    <Box display="flex" flexDirection="column">
      {[0, 3, 6].map((row) => (
        <Box key={row} display="flex" justifyContent="center">
          {renderSquare(row)}
          {renderSquare(row + 1)}
          {renderSquare(row + 2)}
        </Box>
      ))}
    </Box>
  );
};
