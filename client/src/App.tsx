import React, { useEffect, useState } from "react";
import { Board } from "./components/Board";
import { calculateWinner, Player } from "./utils/calculateWinner";
import { Box, Button, Typography, Paper, List, ListItem } from "@mui/material";
import { getWinningSquares } from "./utils/getWinningSquares";
import { updateVictory, getVictories } from "./services/api";

const App: React.FC = () => {
  const [history, setHistory] = useState<Array<Array<Player | null>>>([
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

  const winner: Player | null = calculateWinner(currentBoard);
  const winningSquares = winner ? getWinningSquares(currentBoard) : [];

  const [victories, setVictories] = useState<{ X: number; O: number }>({
    X: 0,
    O: 0,
  });

  useEffect(() => {
    const fetchVictories = async () => {
      try {
        const data = await getVictories();
        setVictories(data);
      } catch (err) {
        console.error("Error fetching victories:", err);
      }
    };
    fetchVictories();
  }, []);

  // update victories when game ends
  useEffect(() => {
    if (!winner) return; // only run when there *is* a winner

    const handleGameEnd = async () => {
      try {
        const data = await updateVictory(winner);
        setVictories(data.victories); // update UI with new totals
      } catch (err) {
        console.error("Error updating victory:", err);
      }
    };

    handleGameEnd();
  }, [winner]); // runs only when `winner` changes

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
        flexDirection={{ xs: "column", md: "row" }} // column on small screens
      >
        {/* Scoreboard */}
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            minWidth: 140,
            flexShrink: 0,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Scoreboard
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#004D98", fontWeight: "bold" }}
          >
            X Wins: {victories.X}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#A50044", fontWeight: "bold" }}
          >
            O Wins: {victories.O}
          </Typography>
        </Paper>{" "}
        {/* spacing between board and move history */}
        {/* Board */}
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
          <Typography variant="h6" textAlign="center" sx={{ marginTop: 3 }}>
            {winner
              ? `Winner: ${winner}`
              : currentBoard.every(Boolean)
              ? "Draw!"
              : `Next Player: ${isXNext ? "X" : "O"}`}
          </Typography>
          <Box textAlign="center" marginTop={3}>
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
