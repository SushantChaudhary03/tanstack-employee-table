// ColumnVisibilityToggle.jsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useTable } from "./TableContext";

const ColumnVisibilityToggle = forwardRef((props, ref) => {
  const table = useTable();
  const columns = table.getAllLeafColumns();

  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    const initial = {};
    columns.forEach((col) => {
      initial[col.id] = col.getIsVisible();
    });
    setColumnVisibility(initial);
  }, [columns]);

  const handleCheckboxChange = (columnId) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  // Expose submit() method
  useImperativeHandle(ref, () => ({
    submit: () => {
      columns.forEach((col) => {
        col.toggleVisibility(columnVisibility[col.id]);
      });
    },
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {columns.map((column) => (
        <label key={column.id} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            type="checkbox"
            checked={columnVisibility[column.id] ?? true}
            onChange={() => handleCheckboxChange(column.id)}
          />
          {column.columnDef.header || column.id}
        </label>
      ))}
    </div>
  );
});

export default ColumnVisibilityToggle;
