import { Paper, Typography } from "@mui/material";

interface ScoreboardProps {
  sessionVictories: { X: number; O: number };
  allTimeVictories: { X: number; O: number };
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  sessionVictories,
  allTimeVictories,
}) => (
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
      X Wins: {allTimeVictories.X}
    </Typography>
    <Typography sx={{ color: "#A50044", fontWeight: "bold" }}>
      O Wins: {allTimeVictories.O}
    </Typography>
  </Paper>
);
export default Scoreboard;
