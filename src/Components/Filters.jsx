// Filters.jsx
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FilterStyle } from './TableStyle';


export const TextFilter = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue() ?? { operator: 'contains', value: '' };
  const [draft, setDraft] = useState(filterValue);
  const ref = useRef();

  useEffect(() => {
    if (isOpen) setDraft(filterValue);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyFilter = () => {
    column.setFilterValue(draft);
    setIsOpen(false);
  };

  return (
    <FilterStyle ref={ref}>
      <span onClick={() => setIsOpen((v) => !v)}>🔍</span>
      {isOpen && (
        <div className='dropdown'>
          <select value={draft.operator} onChange={(e) => setDraft(prev => ({ ...prev, operator: e.target.value }))}>
            <option value="contains">contains</option>
            <option value="eq">equals</option>
            <option value="neq">not equals</option>
            <option value="empty">empty/null</option>
            <option value="notEmpty">not empty</option>
          </select>
          {(draft.operator !== 'empty' && draft.operator !== 'notEmpty') && (
            <input
              type="text"
              value={draft.value ?? ''}
              onChange={(e) => setDraft(prev => ({ ...prev, value: e.target.value }))}
              placeholder="Enter text"
            />
          )}
          <button id='submit' onClick={applyFilter}>Submit</button>
        </div>
      )}
    </FilterStyle>
  );
};

export const NumberFilter = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue() ?? { operator: 'eq', value: '' };
  const [draft, setDraft] = useState(filterValue);
  const ref = useRef();

  useEffect(() => {
    if (isOpen) setDraft(filterValue);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyFilter = () => {
    column.setFilterValue(draft);
    setIsOpen(false);
  };

  return (
    <FilterStyle ref={ref}>
      <span onClick={() => setIsOpen(v => !v)} style={{ cursor: 'pointer' }}>🔢</span>
      {isOpen && (
        <div className='dropdown'>
          <select value={draft.operator} onChange={(e) => setDraft(prev => ({ ...prev, operator: e.target.value }))}>
            <option value="eq">equals</option>
            <option value="neq">not equals</option>
            <option value="lt">less than</option>
            <option value="gt">greater than</option>
            <option value="empty">empty</option>
          </select>
          {draft.operator !== 'empty' && (
            <input
              type="number"
              value={draft.value ?? ''}
              onChange={(e) => setDraft(prev => ({ ...prev, value: e.target.value }))}
              placeholder="Enter number"
            />
          )}
          <button id='submit' onClick={applyFilter}>Submit</button>
        </div>
      )}
    </FilterStyle>
  );
};

export const DateFilter = ({ column }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterValue = column.getFilterValue() ?? { operator: 'eq', value: null };
  const [draft, setDraft] = useState(filterValue);
  const ref = useRef();

  useEffect(() => {
    if (isOpen) setDraft(filterValue);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyFilter = () => {
    column.setFilterValue(draft);
    setIsOpen(false);
  };

  return (
    <FilterStyle ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <span onClick={() => setIsOpen((v) => !v)} style={{ cursor: 'pointer' }}>📅</span>
      {isOpen && (
        <div className='dropdown'>
          <select
            value={draft.operator}
            onChange={(e) => setDraft(prev => ({ ...prev, operator: e.target.value }))}
          >
            <option value="eq">equals</option>
            <option value="before">before</option>
            <option value="after">after</option>
            <option value="between">between</option>
            <option value="empty">empty</option>
          </select>

          {draft.operator === 'between' ? (
            <>
              <DatePicker
                selected={draft.startDate}
                onChange={(d) => setDraft(prev => ({ ...prev, startDate: d }))}
                placeholderText="Start date"
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                selected={draft.endDate}
                onChange={(d) => setDraft(prev => ({ ...prev, endDate: d }))}
                placeholderText="End date"
                dateFormat="dd/MM/yyyy"
              />
            </>
          ) : draft.operator !== 'empty' ? (
            <DatePicker
              selected={draft.value}
              onChange={(d) => setDraft(prev => ({ ...prev, value: d }))}
              placeholderText="Pick date"
              dateFormat="dd/MM/yyyy"
            />
          ) : null}

          <button id='submit' onClick={applyFilter} style={{ backgroundColor: 'skyblue' }}>Submit</button>
        </div>
      )}
    </FilterStyle>
  );
};
