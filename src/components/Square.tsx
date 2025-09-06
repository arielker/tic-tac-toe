// components/Square.tsx
import React from "react";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

export const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    style={{
      width: "60px",
      height: "60px",
      fontSize: "2rem",
      margin: "4px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {value}
  </button>
);
