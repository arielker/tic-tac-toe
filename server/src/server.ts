import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for victories
const victories: Record<"X" | "O", number> = {
  X: 0,
  O: 0,
};

// Route 1: Update victories
// POST /victory { winner: "X" } or { winner: "O" }
app.post("/victory", (req: Request, res: Response) => {
  const { winner } = req.body as { winner: "X" | "O" };

  if (winner !== "X" && winner !== "O") {
    return res.status(400).json({ error: "Winner must be 'X' or 'O'" });
  }

  victories[winner] += 1;

  return res.json({ message: `${winner} victory recorded`, victories });
});

// Route 2: Get current victories
// GET /victories
app.get("/victories", (_req: Request, res: Response) => {
  return res.json(victories);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
