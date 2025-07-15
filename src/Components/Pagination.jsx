// Pagination.js
import React from 'react';
import { PaginationWrapper } from './TableStyle';

const Pagination = ({ table, position = 'bottomRight' }) => {
  return (
    <PaginationWrapper className={`pagination-${position}`}>
      <div className='page'>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>

        <span>
          <strong>{table.getState().pagination.pageIndex + 1}</strong>
        </span>

        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>{'>>'}</button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[20, 40, 80, 100, 150].map((size) => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
