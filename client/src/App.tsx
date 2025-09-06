import React, { useEffect, useState } from "react";
import { Board } from "./components/Board";
import { calculateWinner, Player } from "./utils/calculateWinner";
import { Box, Button, Typography, Paper, List, ListItem } from "@mui/material";
import { getWinningSquares } from "./utils/getWinningSquares";
import { updateVictory, getHistory } from "./services/api";

const App: React.FC = () => {
  const [history, setHistory] = useState<Array<Array<Player | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState<Player | null>(null);

  const currentBoard = history[currentMove];
  const isXNext = currentMove % 2 === 0;

  // Handle square click
  const handleClick = (index: number) => {
    if (currentBoard[index] || winner) return;

    const newBoard = [...currentBoard];
    newBoard[index] = isXNext ? "X" : "O";

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newBoard]);
    setCurrentMove(newHistory.length);
  };

  const jumpTo = (move: number) => setCurrentMove(move);

  const winningSquares = winner ? getWinningSquares(currentBoard) : [];

  // Session victories
  const [sessionVictories, setSessionVictories] = useState<{
    X: number;
    O: number;
  }>({
    X: 0,
    O: 0,
  });

  // All-time victories from server
  const [allTimeVictories, setAllTimeVictories] = useState<{
    X: number;
    O: number;
  }>({
    X: 0,
    O: 0,
  });

  // Detect winner and update session + server
  useEffect(() => {
    const newWinner = calculateWinner(currentBoard);
    if (newWinner && winner !== newWinner) {
      setWinner(newWinner);

      // Update session victories
      setSessionVictories((prev) => ({
        ...prev,
        [newWinner]: prev[newWinner] + 1,
      }));

      // Update server (all-time)
      updateVictory(newWinner)
        .then((data) => {
          if (data?.allTimeVictories) {
            setAllTimeVictories({
              X: data.allTimeVictories.X ?? 0,
              O: data.allTimeVictories.O ?? 0,
            });
          }
        })
        .catch((err) => console.error("Error updating victory:", err));
    }
  }, [currentBoard, winner]);

  // Poll all-time victories every 3 seconds
  useEffect(() => {
    const fetchAllTime = async () => {
      try {
        const data = await getHistory();
        setAllTimeVictories({
          X: data?.filter((res) => res === "X").length ?? 0,
          O: data?.filter((res) => res === "O").length ?? 0,
        });
      } catch (err) {
        console.error("Error fetching all-time victories:", err);
      }
    };

    fetchAllTime(); // initial fetch
    const interval = setInterval(fetchAllTime, 3000);
    return () => clearInterval(interval);
  }, []);

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
        {/* Scoreboard */}
        <Paper sx={{ padding: 3, textAlign: "center" }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Session Scoreboard
          </Typography>
          <Typography sx={{ color: "#004D98", fontWeight: "bold" }}>
            X Wins: {sessionVictories.X}
          </Typography>
          <Typography sx={{ color: "#A50044", fontWeight: "bold" }}>
            O Wins: {sessionVictories.O}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            All-Time Scoreboard
          </Typography>
          <Typography sx={{ color: "#004D98", fontWeight: "bold" }}>
            X Wins: {allTimeVictories?.X ?? 0}
          </Typography>
          <Typography sx={{ color: "#A50044", fontWeight: "bold" }}>
            O Wins: {allTimeVictories?.O ?? 0}
          </Typography>
        </Paper>

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
          <Typography variant="h6" textAlign="center" sx={{ mt: 3 }}>
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
                setWinner(null);
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
