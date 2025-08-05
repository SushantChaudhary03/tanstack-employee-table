// Filters.jsx
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FilterStyle } from "./TableStyle";
import HamburgerDots from "../assets/Svg/Hamburger";
import CollapsibleSection from "./CollapsibleSection";
import ColumnVisibilityToggle from "./ColumnVisibility";

export const TextFilter = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue() ?? {
    operator: "contains",
    value: "",
  };
  const [draft, setDraft] = useState(filterValue);
  const ref = useRef();
  const columnToggleRef = useRef();

  useEffect(() => {
    if (isOpen) setDraft(filterValue);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilter = () => {
    column.setFilterValue(draft);
    if (columnToggleRef.current) {
      columnToggleRef.current.submit();
    }
    setIsOpen(false);
    setDraft({ operator: "contains", value: "" });
  };

  const cancelFilter = () => {
    column.setFilterValue(undefined);
    setDraft({ operator: "contains", value: "" });
    setIsOpen(false);
  };

  const isCountryColumn = column.id?.toLowerCase() === "country";
  const showInput = draft.operator !== "empty" && draft.operator !== "notEmpty";
  const showCountryCheckboxList = isCountryColumn && draft.operator === "eq";

  return (
    <FilterStyle ref={ref}>
      <span className="hidden" onClick={() => setIsOpen((v) => !v)}>
        <HamburgerDots color="#fff" />
      </span>

      <div className={`dropdown-wrapper ${isOpen ? "open" : "closed"}`}>
        <div className="dropdown">
          <CollapsibleSection title="Filter">
            <select
              className="custom-select"
              value={draft.operator}
              onChange={(e) => {
                const operator = e.target.value;
                setDraft((prev) => ({
                  ...prev,
                  operator,
                  value:
                    operator === "empty" || operator === "notEmpty"
                      ? ""
                      : isCountryColumn && operator === "eq"
                      ? []
                      : "",
                }));
              }}
            >
              <option value="contains">contains</option>
              <option value="eq">equals</option>
              <option value="neq">not equals</option>
              <option value="empty">empty/null</option>
              <option value="notEmpty">not empty</option>
            </select>

            {showInput &&
              (showCountryCheckboxList ? (
                <div className="country">
                  {column.columnDef.meta?.countries.map((country) => (
                    <label key={country}>
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(draft.value) &&
                          draft.value.includes(country)
                        }
                        onChange={() => {
                          const current = Array.isArray(draft.value)
                            ? draft.value
                            : [];
                          const newValue = current.includes(country)
                            ? current.filter((c) => c !== country)
                            : [...current, country];
                          setDraft((prev) => ({ ...prev, value: newValue }));
                        }}
                      />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={draft.value ?? ""}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, value: e.target.value }))
                  }
                  placeholder="Search"
                />
              ))}
          </CollapsibleSection>

          <CollapsibleSection title="Show/hide columns">
            <ColumnVisibilityToggle ref={columnToggleRef} />
          </CollapsibleSection>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button id="submit" onClick={applyFilter}>
              APPLY
            </button>
            <button id="cancel" onClick={cancelFilter}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </FilterStyle>
  );
};

export const NumberFilter = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue() ?? { operator: "eq", value: "" };
  const [draft, setDraft] = useState(filterValue);
  const ref = useRef();
  const columnToggleRef = useRef();

  useEffect(() => {
    if (isOpen) setDraft(filterValue);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilter = () => {
    column.setFilterValue(draft);
    if (columnToggleRef.current) {
      columnToggleRef.current.submit();
    }
    setIsOpen(false);
  };

  const cancelFilter = () => {
    column.setFilterValue(undefined);
    setDraft({ operator: "eq", value: "" });
    setIsOpen(false);
  };

  return (
    <FilterStyle ref={ref}>
      <span
        className="hidden"
        onClick={() => setIsOpen((v) => !v)}
        style={{ cursor: "pointer" }}
      >
        <HamburgerDots color="#fff" />
      </span>

      <div className={`dropdown-wrapper ${isOpen ? "open" : "closed"}`}>
        <div className="dropdown last-dropdown">
          <CollapsibleSection title="Filter">
            <select
              value={draft.operator}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, operator: e.target.value }))
              }
            >
              <option value="eq">equals</option>
              <option value="neq">not equals</option>
              <option value="lt">less than</option>
              <option value="gt">greater than</option>
              <option value="empty">empty</option>
            </select>

            {draft.operator !== "empty" && (
              <input
                type="number"
                min="0"
                value={draft.value ?? ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, value: e.target.value }))
                }
                placeholder="Enter number"
              />
            )}
          </CollapsibleSection>

          <CollapsibleSection title="Show/hide columns">
            <ColumnVisibilityToggle ref={columnToggleRef} />
          </CollapsibleSection>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button id="submit" onClick={applyFilter}>
              APPLY
            </button>
            <button id="cancel" onClick={cancelFilter}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </FilterStyle>
  );
};

export const DateFilter = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue() ?? {
    operator: "eq",
    value: null,
  };
  const [draft, setDraft] = useState(filterValue);
  const ref = useRef();
  const columnToggleRef = useRef();

  useEffect(() => {
    if (isOpen) setDraft(filterValue);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilter = () => {
    column.setFilterValue(draft);
    if (columnToggleRef.current) {
      columnToggleRef.current.submit();
    }
    setIsOpen(false);
  };

  const cancelFilter = () => {
    column.setFilterValue(undefined);
    setDraft({ operator: "eq", value: "" });
    setIsOpen(false);
  };

  const handleMonthSelect = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setDraft({ operator: "month", startDate: start, endDate: end });
  };

  const handleYearSelect = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const end = new Date(date.getFullYear(), 11, 31);
    setDraft({ operator: "year", startDate: start, endDate: end });
  };

  return (
    <FilterStyle
      ref={ref}
      style={{ position: "relative", display: "inline-block" }}
    >
      <span
        className="hidden"
        onClick={() => setIsOpen((v) => !v)}
        style={{ cursor: "pointer" }}
      >
        <HamburgerDots color="#fff" />
      </span>

      <div className={`dropdown-wrapper ${isOpen ? "open" : "closed"}`}>
        <div className="dropdown">
          {/* FILTER SECTION */}
          <CollapsibleSection title="Filter">
            <select
              value={draft.operator}
              onChange={(e) =>
                setDraft({ operator: e.target.value, value: null })
              }
            >
              <option value="eq">equals</option>
              <option value="before">before</option>
              <option value="after">after</option>
              <option value="between">between</option>
              <option value="month">month</option>
              <option value="year">year</option>
              <option value="empty">empty</option>
            </select>

            {draft.operator === "between" ? (
              <>
                <DatePicker
                  selected={draft.startDate}
                  onChange={(d) =>
                    setDraft((prev) => ({ ...prev, startDate: d }))
                  }
                  placeholderText="Start date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  selected={draft.endDate}
                  onChange={(d) =>
                    setDraft((prev) => ({ ...prev, endDate: d }))
                  }
                  placeholderText="End date"
                  dateFormat="dd/MM/yyyy"
                />
              </>
            ) : draft.operator === "month" ? (
              <DatePicker
                selected={draft.startDate}
                onChange={handleMonthSelect}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Select month"
              />
            ) : draft.operator === "year" ? (
              <DatePicker
                selected={draft.startDate}
                onChange={handleYearSelect}
                dateFormat="yyyy"
                showYearPicker
                placeholderText="Select year"
              />
            ) : draft.operator !== "empty" ? (
              <DatePicker
                selected={draft.value}
                onChange={(d) => setDraft((prev) => ({ ...prev, value: d }))}
                placeholderText="Pick date"
                dateFormat="dd/MM/yyyy"
              />
            ) : null}
          </CollapsibleSection>

          {/* COLUMN TOGGLE SECTION */}
          <CollapsibleSection title="Show/hide columns">
            <ColumnVisibilityToggle ref={columnToggleRef} />
          </CollapsibleSection>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button id="submit" onClick={applyFilter}>
              APPLY
            </button>
            <button id="cancel" onClick={cancelFilter}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </FilterStyle>
  );
};

