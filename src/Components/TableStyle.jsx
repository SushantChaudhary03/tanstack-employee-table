import React from "react";
import styled, { keyframes, css } from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;

  .table-wrapper {
    width: 100%;
    max-height: 535px;
    overflow-y: auto;
    overflow-x: auto;
    position: relative;
  }

  .table.with-column-borders td,
  .table.with-column-borders th {
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }

  .table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    background-color: #fff;
    font-family: ${({ $rowFont }) => $rowFont?.family || "Lato"};
    position: relative;

    thead {
      position: sticky;
      top: 0;
      z-index: 2;

      tr {
        background: ${({ $headerColor }) =>
          $headerColor || "linear-gradient(to right, #3e9eff, #737dff)"};

        th {
          color: ${({ $headerFont }) => $headerFont?.textColor || "#fff"};
          padding: 0.5rem 5px;
          text-align: center;
          font-size: ${({ $headerFont }) => $headerFont?.size || "1rem"};
          font-family: ${({ $headerFont }) => $headerFont?.family || "Lato"};
          font-weight: ${({ $headerFont }) => $headerFont?.weight || "bold"};
          height: ${({ $headerFont }) => $headerFont?.height || "auto"};
          background-color: inherit;

          .table-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 3rem;

            .sorting-buttons {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 10px;
            }

            .sorting-buttons button {
              padding: 0;
              margin: 0;
              border: none;
              background: transparent;
              line-height: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              height: 10px;
            }

            .sorting-buttons svg {
              display: block;
              line-height: 1;
              margin: 0;
              padding: 0;
            }
          }

          .resizer {
            cursor: col-resize;
            user-select: none;
            touch-action: none;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 5px;
            z-index: 1;
          }
        }

        th .hidden {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        th:hover .hidden {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    tbody {
      tr {
        background-color: ${({ $primaryRowColor, $secondaryRowColor, index }) =>
          index % 2 !== 0
            ? $primaryRowColor || "#fff"
            : $secondaryRowColor || "#f5f5f5"};
        position: relative;

        td {
          padding: 0.8rem 1rem;
          height: ${({ $rowFont }) => $rowFont?.height || "10vh"};
          font-family: ${({ $rowFont }) => $rowFont?.family || "Lato"};
          font-size: ${({ $rowFont }) => $rowFont?.size || "1rem"};
          font-weight: ${({ $rowFont }) => $rowFont?.weight || "normal"};
        }

        .align-left {
          text-align: left;
        }

        .align-right {
          text-align: right;
        }

        &:hover {
          box-shadow: rgb(163, 163, 209) 4px 3px 10px 0px;
          z-index: 1;
        }
      }

      tr:nth-child(2n) {
        background-color: ${({ $secondaryRowColor }) =>
          $secondaryRowColor || "#f5f5f5"};
      }
    }

    tfoot {
      position: sticky;
      bottom: 0;
      z-index: 1;

      tr {
        td {
          padding-left: ${({ $align }) => ($align === "start" ? "1.2rem" : "")};
          border: 1px solid #ccc;
          background-color: #fff;
          padding: 1rem 0rem;
          text-align: ${({ $align }) =>
            $align === "start" ? "start" : "center"};
        }
      }
    }

    td.text-left,
    th.text-left {
      text-align: left;
    }

    td.text-right,
    th.text-right {
      text-align: right;
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
      background: linear-gradient(to right, #3e9eff, #737dff);
      color: #fff;
      border: none;
      padding: 0.2rem 0.3rem;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: 0.9rem;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background: linear-gradient(
          to right,
          #2a80ff,
          #596dff
        ); /* deeper hover */
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.4);
        transform: translateY(-1px);
      }
    }
  }

  span {
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

  span {
    cursor: pointer;
  }

  // dropdown animation

  .dropdown-wrapper {
    transform-origin: top;
    transform: scaleY(0);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .dropdown-wrapper.open {
    transform: scaleY(1);
    opacity: 1;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 12rem;
    min-height: 12rem;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 90%;
    border-radius: 8px;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    select {
      width: 100%;
      padding: 0.4rem 0.2rem;
      border-radius: 6px;
      outline: none;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
    }

    input {
      padding: 0.3rem 0.4rem;
      font-size: 0.8rem;
      border-radius: 4px;
      height: 1.2rem;
      border: 1px solid #ccc;
      outline: none;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }
    }

    .country {
      max-height: 150px;
      width: 18rem;
      overflow-y: auto;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      color: #000;
    }

    .country label {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 4px;
      color: #000;
      transition: background 0.2s ease;
    }

    .country label:hover {
      background-color: #eef;
    }

    .country input[type="checkbox"] {
      margin-right: 8px;
    }

    #submit {
      background: linear-gradient(to right, #3e9eff, #737dff);
      color: #fff;
      margin: 0.9rem auto;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      display: block;
    }

    #submit:hover {
      background: linear-gradient(to right, #3282d3, #555edd);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    #cancel {
      background-color: #f3f4f6;
      color: #1f2937;
      margin: 0.9rem auto;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      display: block;
    }

    #cancel:hover {
      background: #e5e7eb;
    }
  }

  .last-dropdown {
    position: absolute;
    left: -12vw;
  }
`;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
  to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-8px);
  }
`;

export const CollapsibleSectionWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  overflow: hidden;

  .collapsible-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    span {
      color: black;
      font-weight: bold;
    }
  }
`;

export const CollapsibleContent = styled.div`
  overflow: hidden;
  padding: ${({ $isOpen }) => ($isOpen ? "8px 12px" : "0 12px")};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  font-size: 14px;
  color: #2d3748;
  box-sizing: border-box;
  width: 100%;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideDown} 0.5s ease forwards
        `
      : css`
          ${slideUp} 0.5s ease forwards
        `};
`;
