import React from 'react';
import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;

  .table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    position: relative;
    font-family: 'Lato';

    thead {
      tr {
      background: linear-gradient(to right, #3E9EFF, #737DFF);

         th {
          color: #fff;
          padding: 0.5rem;
          width: 60%;
          text-align: center;
          font-size: 1rem;

          .table-header{
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 12rem;

          .sorting-buttons button{
           color: #fff;
           border: none;
          }

            button{
            cursor: pointer;
            background: none;
            border: none;
            }
          }
         }
      }
    }

    tbody {
      tr {
        td {
          text-align: center;
          height: 10vh;
        }
      }

      tr:nth-child(2n){
        background-color: #f5f5f5;
      }
    }

    tfoot {
      tr {
        td {
          padding: 0.5rem;
          border: 1px solid #ccc;
          background-color: #fff;
          text-align: center;
        }
      }
    }
  }
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  position: sticky;
  background: none;
  z-index: 9;

  &.pagination-topLeft,
  &.pagination-topRight,
  &.pagination-center {
    top: 0;
  }

  &.pagination-bottomLeft,
  &.pagination-bottomRight {
    bottom: 0;
  }

  &.pagination-topLeft,
  &.pagination-bottomLeft {
    justify-content: flex-start;
  }

  &.pagination-topRight,
  &.pagination-bottomRight {
    justify-content: flex-end;
  }

  &.pagination-center {
    justify-content: center;
  }

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .page {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    background: #e2e2e2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    align-items: center;

    button {
      background: linear-gradient(to right, #3E9EFF, #737DFF);
      color: #fff;
      border: none;
      padding: 0.4rem 0.75rem;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: 0.9rem;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background-color: #0056b3;
      }
    }
  }

  span {
    border: 1px solid #333;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    background-color: #6eb4ff;
    font-size: 0.85rem;
  }

  select {
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.85rem;
    margin-left: 0.5rem;
  }
`;


export const FilterStyle = styled.div`
  position: relative;
  display: inline-block;

  span{
    cursor: pointer;
  }

  .dropdown{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 1rem;
    gap: 1rem;
    position: fixed;
    top: 30%;
    left: 40%;
    border: 1px solid #ccc;
    border-radius: 8px;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    select{
      width: 100%;
      padding: 0.4rem 0.2rem;
      border-radius: 6px;
      outline: none;

      &:focus{
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

    }

    input{
      padding: 0.3rem 0.4rem;
      font-size: 0.8rem;
      border-radius: 4px;
      height: 1.2rem;
      border: 1px solid #ccc;
      outline: none;

      &:focus{
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
    }

    #submit{
      background: linear-gradient(to right, #3E9EFF, #737DFF);
      color: #fff;
      margin: 0.4rem 0;
      width: 50%;
      padding: 5px;
      border-radius: 4px;

      &:hover{
        background: linear-gradient(to right, #3282d3, #555edd);
      }
    }
  }
`;
