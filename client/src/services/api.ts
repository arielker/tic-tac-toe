import axios from "axios";
import { Player } from "../utils/calculateWinner";

export type VictoriesResponse = {
  victories: { X: number; O: number };
  allTimeVictories: { X: number; O: number };
};

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const updateVictory = async (
  winner: Player
): Promise<VictoriesResponse> => {
  const res = await API.post<VictoriesResponse>("/victory", { winner });
  return res.data;
};

export const getVictories = async (): Promise<{ X: number; O: number }> => {
  const res = await API.get("/victories");
  return res.data as { X: number; O: number };
};

export const getHistory = async (): Promise<Array<"X" | "O">> => {
  const res = await API.get("/history");
  return res.data as Array<"X" | "O">;
};
