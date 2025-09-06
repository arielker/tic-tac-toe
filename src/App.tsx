import React, { useState } from "react";
import { Board } from "./components/Board";
import { calculateWinner } from "./utils/calculateWinner";
import { Box, Button, Typography, Paper, List, ListItem } from "@mui/material";
import { getWinningSquares } from "./utils/getWinningSquares";

const App: React.FC = () => {
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

  const jumpTo = (move: number) => setCurrentMove(move);

  const winner = calculateWinner(currentBoard);
  const winningSquares = winner ? getWinningSquares(currentBoard) : [];

  return (
    <Box
      sx={{
        backgroundColor: "#fffaf0", // creamy white
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "15vh",
      }}
    >
      <Box display="flex" gap={6}>
        {/* Board */}
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Tic Tac Toe
          </Typography>
          <Board
            board={currentBoard}
            onClick={handleClick}
            winningSquares={winningSquares}
          />

          <Typography variant="h6" textAlign="center" sx={{ marginTop: 2 }}>
            {winner
              ? `Winner: ${winner}`
              : currentBoard.every(Boolean)
              ? "Draw!"
              : `Next Player: ${isXNext ? "X" : "O"}`}
          </Typography>
          <Box textAlign="center" marginTop={2}>
            <Button
              variant="contained"
              onClick={() => {
                setHistory([Array(9).fill(null)]);
                setCurrentMove(0);
              }}
            >
              Restart
            </Button>
          </Box>
        </Paper>

        {/* Move History */}
        <Paper elevation={3} sx={{ padding: 2, minWidth: 180 }}>
          <Typography variant="h6" gutterBottom>
            Move History
          </Typography>
          <List dense>
            {history.map((_, move) => (
              <ListItem key={move} disablePadding>
                <Button fullWidth onClick={() => jumpTo(move)}>
                  {move === 0 ? "Game Start" : `Move #${move}`}
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default App;
