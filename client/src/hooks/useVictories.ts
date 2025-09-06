import { useState, useEffect } from "react";
import { updateVictory, getHistory } from "../services/api";
import { Player } from "../utils/calculateWinner";

export function useVictories(winner: Player | null) {
  const [sessionVictories, setSessionVictories] = useState<{
    X: number;
    O: number;
  }>({ X: 0, O: 0 });
  const [allTimeVictories, setAllTimeVictories] = useState<{
    X: number;
    O: number;
  }>({ X: 0, O: 0 });

  // Update victories when winner changes
  useEffect(() => {
    if (!winner) return;

    // Update session
    setSessionVictories((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));

    // Update server
    updateVictory(winner)
      .then((data) => {
        if (data?.allTimeVictories) setAllTimeVictories(data.allTimeVictories);
      })
      .catch(console.error);
  }, [winner]);

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
        console.error(err);
      }
    };

    fetchAllTime();
    const interval = setInterval(fetchAllTime, 3000);
    return () => clearInterval(interval);
  }, []);

  return { sessionVictories, allTimeVictories };
}
export default useVictories;
