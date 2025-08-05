import React, { useState } from "react";
import { CollapsibleSectionWrapper, CollapsibleContent } from "./TableStyle";

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CollapsibleSectionWrapper>
      <div
        className="collapsible-section"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: isOpen ? "#f9fafb" : "#fff" }}
      >
        <span>{title}</span>

        {/* SVG Arrow */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            color: "#a0aec0",
          }}
        >
          <path
            d="M5 8L10 13L15 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <CollapsibleContent $isOpen={isOpen}>{children}</CollapsibleContent>
      )}
    </CollapsibleSectionWrapper>
  );
};

export default CollapsibleSection;
