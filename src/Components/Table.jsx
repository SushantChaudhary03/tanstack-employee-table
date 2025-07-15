import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import Pagination from './Pagination';
import { defaultSettings } from '../default';
import { TableWrapper } from './TableStyle';

const Table = ({ data, columns, settings = {} }) => {
  const finalSettings = {
    ...defaultSettings,
    ...settings,
  };

  const paginationPosition = finalSettings.pagination?.position;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: finalSettings.pagination?.pageSize || defaultSettings.pagination.rowsPerPage,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      text: (row, columnId, filterValue) => {
        const cellValue = (row.getValue(columnId) || '').toString().toLowerCase();
        if (!filterValue || typeof filterValue !== 'object') return true;

        const { operator, value } = filterValue;

        switch (operator) {
          case 'contains':
            return value ? cellValue.includes(value.toLowerCase()) : true;
          case 'eq':
            return value ? cellValue === value.toLowerCase() : true;
          case 'neq':
            return value ? cellValue !== value.toLowerCase() : true;
          case 'empty':
            return !cellValue;
          case 'notEmpty':
            return !!cellValue;
          default:
            return true;
        }
      },
      number: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        if (!filterValue || typeof filterValue !== 'object') return true;

        const { operator, value } = filterValue;

        switch (operator) {
          case 'eq':
            return value !== undefined ? cellValue === Number(value) : true;
          case 'neq':
            return value !== undefined ? cellValue !== Number(value) : true;
          case 'lt':
            return value !== undefined ? cellValue < Number(value) : true;
          case 'lte':
            return value !== undefined ? cellValue <= Number(value) : true;
          case 'gt':
            return value !== undefined ? cellValue > Number(value) : true;
          case 'gte':
            return value !== undefined ? cellValue >= Number(value) : true;
          case 'empty':
            return cellValue === null || cellValue === undefined || cellValue === '';
          case 'notEmpty':
            return cellValue !== null && cellValue !== undefined && cellValue !== '';
          default:
            return true;
        }
      },
      date: (row, columnId, filterValue) => {
        const cellDate = new Date(row.getValue(columnId));
        if (!filterValue || typeof filterValue !== 'object') return true;

        const { operator, value, startDate, endDate } = filterValue;

        if (isNaN(cellDate.getTime())) return false;

        switch (operator) {
          case 'eq':
            return value ? cellDate.toDateString() === new Date(value).toDateString() : true;
          case 'before':
            return value ? cellDate < new Date(value) : true;
          case 'after':
            return value ? cellDate > new Date(value) : true;
          case 'between':
            if (!startDate || !endDate) return true;
            return cellDate >= new Date(startDate) && cellDate <= new Date(endDate);
          case 'empty':
            return !row.getValue(columnId);
          default:
            return true;
        }
      },
    },
  });

  return (
    <TableWrapper>
      {/* Top Pagination */}
      {finalSettings.pagination &&
        (paginationPosition === 'topLeft' || paginationPosition === 'topRight') && (
          <Pagination table={table} position={paginationPosition} />
        )}

      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const FilterComponent = header.column.columnDef.meta?.Filter;
                return (
                  <th key={header.id}>
                    <div className="table-header">
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      <div className="sorting-buttons">
                        <button onClick={() => header.column.toggleSorting(false)}>▲</button><br />
                        <button onClick={() => header.column.toggleSorting(true)}>▼</button>
                      </div>
                      {finalSettings.filter &&
                        header.column.getCanFilter() &&
                        FilterComponent && (
                          <div style={{ marginTop: 4 }}>
                            <FilterComponent column={header.column} />
                          </div>
                        )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* Footer Totals Row */}
        {table.getHeaderGroups()[0].headers.some(
          (header) => header.column.columnDef.meta?.totalType
        ) && (
            <tfoot>
              <tr>
                {table.getHeaderGroups()[0].headers.map((header) => {
                  const { totalType } = header.column.columnDef.meta || {};
                  const columnId = header.column.id;

                  if (!totalType) return <td key={columnId}></td>;

                  const values = table.getFilteredRowModel().rows.map((row) =>
                    row.getValue(columnId)
                  );
                  const numericValues = values.filter((v) => typeof v === 'number');

                  let total;
                  switch (totalType) {
                    case 'sum':
                      total = numericValues.reduce((a, b) => a + b, 0);
                      break;
                    case 'avg':
                      total = numericValues.length
                        ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length
                        : 0;
                      break;
                    case 'min':
                      total = numericValues.length ? Math.min(...numericValues) : '';
                      break;
                    case 'max':
                      total = numericValues.length ? Math.max(...numericValues) : '';
                      break;
                    case 'product':
                      total = numericValues.reduce((a, b) => a * b, 1);
                      break;
                    default:
                      total = '';
                  }

                  return (
                    <td key={columnId} style={{ fontWeight: 'bold', background: '#f5f5f5' }}>
                      {total}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          )}
      </table>

      {/* Bottom Pagination */}
      {finalSettings.pagination &&
        (paginationPosition === 'bottomLeft' || paginationPosition === 'bottomRight') && (
          <Pagination table={table} position={paginationPosition} />
        )}
    </TableWrapper>
  );
};

Table.whyDidYouRender = true;
export default Table;
