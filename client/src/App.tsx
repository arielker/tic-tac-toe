import React from "react";
import { Box, Paper, Typography, Button, List, ListItem } from "@mui/material";
import { Board } from "./components/Board";
import { Scoreboard } from "./components/Scoreboard";
import { useGame } from "./hooks/useGame";
import { useVictories } from "./hooks/useVictories";
import { getWinningSquares } from "./utils/getWinningSquares";

const App: React.FC = () => {
  const {
    history,
    currentBoard,
    currentMove,
    isXNext,
    winner,
    handleClick,
    jumpTo,
    resetGame,
  } = useGame();
  const { sessionVictories, allTimeVictories } = useVictories(winner);

  const winningSquares = winner ? getWinningSquares(currentBoard) : [];

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "10vh",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        gap={4}
        justifyContent="center"
        alignItems="flex-start"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Scoreboard
          sessionVictories={sessionVictories}
          allTimeVictories={allTimeVictories}
        />

        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Tic Tac Toe
          </Typography>
          <Board
            board={currentBoard}
            onClick={handleClick}
            winningSquares={winningSquares}
            size={Math.min(100, window.innerWidth / 15)}
          />
          <Typography variant="h6" textAlign="center" sx={{ mt: 3 }}>
            {winner
              ? `Winner: ${winner}`
              : currentBoard.every(Boolean)
              ? "Draw!"
              : `Next Player: ${isXNext ? "X" : "O"}`}
          </Typography>
          <Box textAlign="center" marginTop={3}>
            <Button variant="contained" onClick={resetGame}>
              Restart
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, minWidth: 180, flexShrink: 0 }}>
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
