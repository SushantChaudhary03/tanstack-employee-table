import React, { useEffect, useState, useMemo } from "react";
import Table from "./Table";
import { TextFilter, NumberFilter, DateFilter } from "./Filters";


// Column metadata
const columnsMeta = {
  "Order Date": {
    data_type: 4,
    db_column: "sampla.order_date",
    display_value: "Order Date",
  },
  Country: {
    data_type: 5,
    db_column: "sampla.country",
    display_value: "Country",
  },
  "Item Type": {
    data_type: 5,
    db_column: "sampla.item_type",
    display_value: "Item Type",
  },
  Region: {
    data_type: 5,
    db_column: "sampla.region",
    display_value: "Region",
  },
  "Order Id": {
    data_type: 5,
    db_column: "sampla.order_id",
    display_value: "Order Id",
  },
  "Sales Channel": {
    data_type: 5,
    db_column: "sampla.sales_channel",
    display_value: "Sales Channel",
  },
  "Total Cost": {
    data_type: 1,
    db_column: "sampla.total_cost",
    display_value: "Total Cost",
    totalType: "sum",
  },
  "Total Profit": {
    data_type: 1,
    db_column: "sampla.total_profit",
    display_value: "Total Profit",
    totalType: "avg",
  },
};

const textFilterFn = (row, columnId, filterValue) => {
  const { operator, value } = filterValue;
  const rowValue = row.getValue(columnId);

  if (operator === "eq") {
    if (Array.isArray(value)) {
      return value.includes(rowValue);
    }
    return rowValue === value;
  }

  if (operator === "contains") {
    return rowValue?.toLowerCase?.().includes(value?.toLowerCase?.());
  }

  if (operator === "neq") {
    return rowValue !== value;
  }

  if (operator === "empty") return !rowValue;
  if (operator === "notEmpty") return !!rowValue;

  return true;
};

const TableLoader = () => {
  const [data, setData] = useState([]);
  const [columnSizing, setColumnSizing] = useState({});
  const [globalCountries, setGlobalCountries] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setData(json);

        // Extract unique countries after data is set
        const setOfCountries = new Set();
        json.forEach((row) => {
          if (row.Country) setOfCountries.add(row.Country);
        });
        const unique = Array.from(setOfCountries).sort();
        setGlobalCountries(unique);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(() => {
    return Object.entries(columnsMeta).map(([label, meta]) => {
      const isNumber = meta.data_type === 1;
      const isDate = meta.data_type === 4;
      const isText = meta.data_type === 5;

      const filterFn =
        isNumber || isDate ? (isNumber ? "number" : "date") : textFilterFn;

      return {
        accessorKey: label,
        header: meta.display_value || label,
        enableColumnFilter: true,
        enableSorting: true,
        filterFn,
        meta: {
          align: isNumber ? "right" : "left",
          filterComponent: isNumber
            ? NumberFilter
            : isDate
            ? DateFilter
            : TextFilter,
          totalType: meta.totalType || null,
          isNumber,
          countries: label === "Country" ? globalCountries : [],
        },
        cell: (info) => {
          const val = info.getValue();
          if (isNumber && typeof val === "number") {
            return val.toLocaleString();
          }
          if (isDate && val) {
            return new Date(val).toLocaleDateString();
          }
          return val;
        },
      };
    });
  }, [globalCountries]);

  return (
    <Table
      data={data}
      columns={columns}
      columnSizing={columnSizing}
       columnVisibility={columnVisibility}
       onColumnVisibilityChange={setColumnVisibility}
      settings={{
        filter: true,
        columnBorders: true,
        pagination: {
          pageSize: 10,
          position: "bottomLeft",
        },
      }}
    />
  );
};

export default TableLoader;
