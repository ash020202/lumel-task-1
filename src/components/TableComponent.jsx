import React, { useEffect, useState } from "react";
import sampleData from "../data/sampleData";
import RowComponent from "./RowComponent";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, updateRowValue } from "../app/rowActionSlice";

const TableComponent = () => {
  const inputValue = useSelector((state) => state.rowAction.inputValue);
  const rows = useSelector((state) => state.rowAction.rows);
  const dispatch = useDispatch();
  const handleInputValue = (id, value) => {
    dispatch(setInputValue({ id, value }));
  };

  const handleAllocationPercent = (id) => {
    const percentage = parseFloat(inputValue[id]);
    if (!percentage || isNaN(percentage)) {
      alert("Please enter a valid percentage value.");
      return; // Return early if the value is empty or invalid
    }
    dispatch(updateRowValue({ id, newValue: percentage, isPercentage: true }));
  };

  const handleAllocationVal = (id) => {
    const newValue = parseFloat(inputValue[id]);
    if (!newValue || isNaN(newValue)) {
      alert("Please enter a valid value.");
      return;
    }
    dispatch(updateRowValue({ id, newValue, isPercentage: false }));
  };

  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <table className="p-2 bg-white shadow-lg rounded-lg overflow-hidden text-sm">
        <thead>
          <tr className="p-1">
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Value</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {rows?.map((item, index) => (
            <RowComponent
              key={index}
              row={item}
              inputValue={inputValue}
              onInputChange={handleInputValue}
              onPercentageChange={handleAllocationPercent}
              onValueChange={handleAllocationVal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
