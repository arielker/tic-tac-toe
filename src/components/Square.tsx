import { Button } from "@mui/material";

type SquareProps = {
  value: string | null;
  onClick: () => void;
  highlight?: boolean;
};

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  highlight = false,
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
        width: 60,
        height: 60,
        fontSize: "2rem",
        minWidth: 60,
        minHeight: 60,
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
