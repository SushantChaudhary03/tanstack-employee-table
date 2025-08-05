// DoubleLeftButton.jsx
import React from "react";
import { ChevronLeft } from "lucide-react";

const DoubleLeftButton = ({
  onClick,
  size = 16,
  color = "#000",
  label = "",
  style = {},
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '3rem',
        height: '2rem',
        background: "linear-gradient(to right, #3e9eff, #737dff)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        gap: "2px",
        padding: "4px 6px",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <ChevronLeft size={size} color={color} />
      <ChevronLeft size={size} color={color} style={{ marginLeft: "-6px" }} />
      {label && (
        <span style={{ marginLeft: "0.3rem", fontSize: size, color }}>{label}</span>
      )}
    </button>
  );
};

export default DoubleLeftButton;
