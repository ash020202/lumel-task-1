import React from "react";
import RowComponent from "./RowComponent";
import { useSelector } from "react-redux";

const TableComponent = () => {
  const rows = useSelector((state) => state.rowAction.rows);
  const overallTotal = useSelector((state) => state.rowAction.overallTotal);

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
            <RowComponent key={index} row={item} />
          ))}
          <tr className="bg-black text-white font-semibold capitalize">
            <td>overall total</td>
            <td>{Number(overallTotal).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
