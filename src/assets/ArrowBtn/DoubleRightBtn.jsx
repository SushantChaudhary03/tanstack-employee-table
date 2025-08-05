import React from 'react';
import { ChevronRight } from 'lucide-react';

const DoubleRightButton = ({
  onClick,
  size = 16,
  color = '#000',
  label = '',
  style = {},
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3rem',
        height: '2rem',
        background: "linear-gradient(to right, #3e9eff, #737dff)",
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        gap: '2px',
        padding: '4px 6px',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {label && (
        <span style={{ marginRight: '0.3rem', fontSize: size, color }}>{label}</span>
      )}
      <ChevronRight size={size} color={color} />
      <ChevronRight size={size} color={color} style={{ marginLeft: '-6px' }} />
    </button>
  );
};

export default DoubleRightButton;
