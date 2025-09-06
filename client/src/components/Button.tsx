import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
};
