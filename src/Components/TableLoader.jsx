import React, { useEffect, useState } from 'react';
import Table from './Table';
import { TextFilter, NumberFilter, DateFilter } from './Filters';

const TableLoader = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/employeesData/employees.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const columns = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'middleName',
      header: 'Middle Name',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'age',
      header: 'Age',
      filterFn: 'number',
      meta: {
        Filter: NumberFilter,
        totalType: 'avg'      // Types 'sum', 'avg', 'min', 'max', 'product'
      },
    },
    {
      accessorKey: 'address',
      header: 'Address',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'position',
      header: 'Position',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'department',
      header: 'Department',
      filterFn: 'text',
      meta: { Filter: TextFilter },
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      filterFn: 'date',
      cell: info =>
        info.getValue()
          ? new Date(info.getValue()).toLocaleDateString()
          : '',
      meta: { Filter: DateFilter },
    },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      settings={{ filter: true, pagination: true }}
    />
  );
};

export default TableLoader;
