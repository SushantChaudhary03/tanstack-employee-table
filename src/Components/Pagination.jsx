// Pagination.js
import React from "react";
import { PaginationWrapper } from "./TableStyle";
import DropLeft from "../assets/ArrowBtn/Left";
import DropRight from "../assets/ArrowBtn/Right";
import DoubleLeftButton from "../assets/ArrowBtn/DoubleLeftBtn";
import DoubleRightButton from "../assets/ArrowBtn/DoubleRightBtn";

const Pagination = ({ table, position = "bottomRight" }) => {
  return (
    <PaginationWrapper className={`pagination-${position}`}>
      <div className="page">
        <DoubleLeftButton
          onClick={() => table.setPageIndex(0)}
          color="#fff"
          disabled={!table.getCanPreviousPage()}
        />

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <DropLeft color="#fff" width="1.3rem" height="1.3rem" />
        </button>

        <span>
          <strong>{table.getState().pagination.pageIndex + 1}</strong>
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <DropRight color="#fff" width="1.3rem" height="1.3rem" />
        </button>

        <DoubleRightButton
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          color="#fff"
        />

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[20, 40, 80, 100, 150].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
