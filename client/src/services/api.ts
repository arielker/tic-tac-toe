import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // your Express server URL
});

export const updateVictory = async (winner: string) => {
  const res = await API.post("/victory", { winner });
  return res.data;
};

export const getVictories = async () => {
  const res = await API.get("/victories");
  return res.data as { X: number; O: number };
};

export const getHistory = async () => {
  const res = await API.get("/history");
  return res.data as Array<"X" | "O">;
};
