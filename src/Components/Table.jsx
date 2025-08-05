import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import Pagination from "./Pagination";
import { defaultSettings } from "../default";
import { TableWrapper } from "./TableStyle"; // styled-component wrapper
import SortingBtn from "../assets/SortingButtons/SortingDown";
import SortingBtnUp from "../assets/SortingButtons/SortingUp";
import { TableContext } from "./TableContext";

const Table = ({
  data,
  columns,
  columnVisibility,
  onColumnVisibilityChange,
  settings = {},
}) => {
  const finalSettings = {
    ...defaultSettings,
    ...settings,
  };

  const [columnSizing, setColumnSizing] = useState(() => {
    return JSON.parse(localStorage.getItem("columnSizing") || "{}");
  });

  const paginationPosition = finalSettings.pagination?.position;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize:
      finalSettings.pagination?.pageSize ||
      defaultSettings.pagination.rowsPerPage,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    state: {
      pagination,
      columnFilters,
      sorting,
      columnSizing,
      columnVisibility,
    },
    onColumnVisibilityChange,

    onColumnSizingChange: (updater) => {
      const newSizing =
        typeof updater === "function" ? updater(columnSizing) : updater;
      setColumnSizing(newSizing);
      localStorage.setItem("columnSizing", JSON.stringify(newSizing));
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,

    filterFns: {
      text: (row, columnId, filterValue) => {
        const cellValue = (row.getValue(columnId) || "")
          .toString()
          .toLowerCase();
        if (!filterValue || typeof filterValue !== "object") return true;
        const { operator, value } = filterValue;

        switch (operator) {
          case "contains":
            return value ? cellValue.includes(value.toLowerCase()) : true;
          case "eq":
            return value ? cellValue === value.toLowerCase() : true;
          case "neq":
            return value ? cellValue !== value.toLowerCase() : true;
          case "empty":
            return !cellValue;
          case "notEmpty":
            return !!cellValue;
          default:
            return true;
        }
      },
      number: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        if (!filterValue || typeof filterValue !== "object") return true;
        const { operator, value } = filterValue;

        switch (operator) {
          case "eq":
            return value !== undefined ? cellValue === Number(value) : true;
          case "neq":
            return value !== undefined ? cellValue !== Number(value) : true;
          case "lt":
            return value !== undefined ? cellValue < Number(value) : true;
          case "lte":
            return value !== undefined ? cellValue <= Number(value) : true;
          case "gt":
            return value !== undefined ? cellValue > Number(value) : true;
          case "gte":
            return value !== undefined ? cellValue >= Number(value) : true;
          case "empty":
            return (
              cellValue === null || cellValue === undefined || cellValue === ""
            );
          case "notEmpty":
            return (
              cellValue !== null && cellValue !== undefined && cellValue !== ""
            );
          default:
            return true;
        }
      },
      date: (row, columnId, filterValue) => {
        const cellDate = new Date(row.getValue(columnId));
        if (!filterValue || typeof filterValue !== "object") return true;

        const { operator, value, startDate, endDate } = filterValue;

        if (isNaN(cellDate.getTime())) return false;

        switch (operator) {
          case "eq":
            return value
              ? cellDate.toDateString() === new Date(value).toDateString()
              : true;
          case "before":
            return value ? cellDate < new Date(value) : true;
          case "after":
            return value ? cellDate > new Date(value) : true;
          case "between":
          case "month":
          case "year":
            if (!startDate || !endDate) return true;
            return (
              cellDate >= new Date(startDate) && cellDate <= new Date(endDate)
            );
          case "empty":
            return !row.getValue(columnId);
          case "notEmpty":
            return !!row.getValue(columnId);
          default:
            return true;
        }
      },
    },
  });

  return (
    <TableContext.Provider value={table}>
      <TableWrapper
        $primaryRowColor={finalSettings.colors?.primaryRow}
        $secondaryRowColor={finalSettings.colors?.secondaryRow}
        $headerColor={finalSettings.colors?.headers?.[0]}
        $headerFont={finalSettings.fonts?.headers?.[0]}
        $rowFont={finalSettings.fonts?.rows}
      >
        {finalSettings.pagination &&
          (paginationPosition === "topLeft" ||
            paginationPosition === "topRight") && (
            <Pagination table={table} position={paginationPosition} />
          )}
        {/* <ColumnVisibilityToggle table={table}/> */}
        <div className="table-wrapper">
          <table
            className={`table ${
              finalSettings.columnBorders ? "with-column-borders" : ""
            }`}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const FilterComponent =
                      header.column.columnDef.meta?.filterComponent;

                    return (
                      <th
                        key={header.id}
                        style={{ width: header.column.getSize() }}
                      >
                        <div className="table-header">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              {header.column.columnDef.header}
                            </div>
                            {table
                              .getPrePaginationRowModel()
                              .rows.some((row) => {
                                const val = row.getValue(header.column.id);
                                return (
                                  val !== null &&
                                  val !== undefined &&
                                  val !== ""
                                );
                              }) && (
                              <div className="sorting-buttons hidden">
                                <button
                                  onClick={() =>
                                    header.column.toggleSorting(false)
                                  }
                                >
                                  <SortingBtnUp
                                    color={
                                      header.column.getIsSorted() === "asc"
                                        ? "#1f2937"
                                        : "#fff"
                                    }
                                    width="0.6rem"
                                    height="0.6rem"
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    header.column.toggleSorting(true)
                                  }
                                >
                                  <SortingBtn
                                    color={
                                      header.column.getIsSorted() === "desc"
                                        ? "#1f2937"
                                        : "#fff"
                                    }
                                    width="0.6rem"
                                    height="0.6rem"
                                  />
                                </button>
                              </div>
                            )}

                            {finalSettings.filter &&
                              header.column.getCanFilter() &&
                              FilterComponent && (
                                <div style={{ marginTop: 5 }}>
                                  <FilterComponent column={header.column} />
                                </div>
                              )}
                          </div>
                        </div>
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className="resizer"
                          />
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {cell.column.columnDef.cell
                          ? cell.column.columnDef.cell(cell.getContext())
                          : cell.getValue()}
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getPreFilteredRowModel().rows.length > 0 ? (
                <tr>
                  <td
                    colSpan={table.getAllLeafColumns().length}
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      fontStyle: "italic",
                      color: "#999",
                    }}
                  >
                    No matching results. Try changing the filter or search.
                  </td>
                </tr>
              ) : null}
            </tbody>

            {table
              .getHeaderGroups()[0]
              .headers.some(
                (header) => header.column.columnDef.meta?.totalType
              ) && (
              <tfoot>
                <tr>
                  {table.getHeaderGroups()[0].headers.map((header) => {
                    const { totalType } = header.column.columnDef.meta || {};
                    const columnId = header.column.id;

                    if (!totalType) return <td key={columnId}></td>;

                    const values = table
                      .getFilteredRowModel()
                      .rows.map((row) => row.getValue(columnId));
                    const numericValues = values.filter(
                      (v) => typeof v === "number"
                    );

                    let total;
                    switch (totalType) {
                      case "sum":
                        total = numericValues.reduce((a, b) => a + b, 0);
                        break;
                      case "avg":
                        total = numericValues.length
                          ? numericValues.reduce((a, b) => a + b, 0) /
                            numericValues.length
                          : 0;
                        break;
                      case "min":
                        total = numericValues.length
                          ? Math.min(...numericValues)
                          : "";
                        break;
                      case "max":
                        total = numericValues.length
                          ? Math.max(...numericValues)
                          : "";
                        break;
                      case "product":
                        total = numericValues.reduce((a, b) => a * b, 1);
                        break;
                      default:
                        total = "";
                    }

                    return (
                      <td
                        key={columnId}
                        style={{ fontWeight: "bold", background: "#f5f5f5" }}
                      >
                        {total}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        {finalSettings.pagination &&
          (paginationPosition === "bottomLeft" ||
            paginationPosition === "bottomRight") && (
            <Pagination table={table} position={paginationPosition} />
          )}
      </TableWrapper>
    </TableContext.Provider>
  );
};

export default Table;
