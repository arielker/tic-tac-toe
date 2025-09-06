// components/Square.tsx
import React from "react";
import { Button } from "@mui/material";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

export const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  const getColor = () => {
    if (value === "X") return "rgb(0, 51, 204)"; // Blue
    if (value === "O") return "rgb(204, 0, 0)"; // Red
    return "inherit";
  };

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        width: 60,
        height: 60,
        fontSize: "2rem",
        minWidth: 60,
        minHeight: 60,
        color: getColor(),
        border: "2px solid #333",
        margin: 0.5,
      }}
    >
      {value}
    </Button>
  );
};
