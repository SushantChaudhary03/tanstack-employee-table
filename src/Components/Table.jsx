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
import { TextFilter, NumberFilter, DateFilter } from './Filters';

const Table = ({ data, columns, settings = {} }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const finalSettings = {
    ...defaultSettings,
    ...settings,
  };

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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
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
            return value !== undefined ? cellValue === value : true;
          case 'neq':
            return value !== undefined ? cellValue !== value : true;
          case 'lt':
            return value !== undefined ? cellValue < value : true;
          case 'lte':
            return value !== undefined ? cellValue <= value : true;
          case 'gt':
            return value !== undefined ? cellValue > value : true;
          case 'gte':
            return value !== undefined ? cellValue >= value : true;
          case 'empty':
            return cellValue === null || cellValue === undefined || cellValue === '';
          case 'notEmpty':
            return cellValue !== null && cellValue !== undefined && cellValue !== '';
          default:
            return true;
        }
      },
    },
  });

  return (
    <div className="table-wrapper">
      {finalSettings.pagination && <Pagination table={table} />}

      <table
        border="1"
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          position: 'relative',
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: '8px' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <div
                    className="soriting"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: 'pointer' }}
                  >
                    {header.column.getIsSorted() === 'asc' && '⬆️'}
                    {header.column.getIsSorted() === 'desc' && '⬇️'}
                    {header.column.getIsSorted() === false && '➡️'}
                  </div>

                  {finalSettings.filter &&
                    header.column.getCanFilter() &&
                    header.column.columnDef.meta?.Filter && (
                      <div style={{ marginTop: 4 }}>
                        <header.column.columnDef.meta.Filter column={header.column} />
                      </div>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: '8px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* ✅ Total Row Footer - Only if at least one totalType is defined */}
        {table.getHeaderGroups()[0].headers.some(
          (header) => header.column.columnDef.meta?.totalType
        ) && (
          <tfoot>
            <tr>
              {table.getHeaderGroups()[0].headers.map((header) => {
                const { totalType } = header.column.columnDef.meta || {};
                const columnId = header.column.id;

                if (!totalType) return <td key={columnId}></td>;

                const values = table.getFilteredRowModel().rows.map(row =>
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
    </div>
  );
};

Table.whyDidYouRender = true;
export default Table;
