import { useState, useEffect } from "react";
import { calculateWinner, Player } from "../utils/calculateWinner";

export function useGame() {
  const [history, setHistory] = useState<Array<Array<Player | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState<Player | null>(null);

  const currentBoard = history[currentMove];
  const isXNext = currentMove % 2 === 0;

  const handleClick = (index: number) => {
    if (currentBoard[index] || winner) return;

    const newBoard = [...currentBoard];
    newBoard[index] = isXNext ? "X" : "O";

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newBoard]);
    setCurrentMove(newHistory.length);
  };

  const jumpTo = (move: number) => setCurrentMove(move);

  useEffect(() => {
    const newWinner = calculateWinner(currentBoard);
    if (newWinner && winner !== newWinner) setWinner(newWinner);
  }, [currentBoard, winner]);

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
  };

  return {
    history,
    currentBoard,
    currentMove,
    isXNext,
    winner,
    handleClick,
    jumpTo,
    resetGame,
  };
}
export default useGame;
