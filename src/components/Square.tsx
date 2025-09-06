import { Button } from "@mui/material";

type SquareProps = {
  value: string | null;
  onClick: () => void;
  highlight?: boolean;
  size?: number; // new prop
};

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  highlight = false,
  size = 60,
}) => {
  const getColor = () => {
    if (value === "X") return "rgb(0, 51, 204)";
    if (value === "O") return "rgb(204, 0, 0)";
    return "inherit";
  };

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        fontSize: size / 1.5,
        color: getColor(),
        border: highlight ? "3px solid gold" : "2px solid #333",
        backgroundColor: highlight ? "rgba(255,215,0,0.2)" : "inherit",
        margin: 0.5,
      }}
    >
      {value}
    </Button>
  );
};
