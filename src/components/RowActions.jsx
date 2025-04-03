// RowActions.js
import React from "react";

const RowActions = ({
  rowId,
  inputValue,
  onInputChange,
  onPercentageChange,
  onValueChange,
  variance,
}) => {
  return (
    <>
      <td className="p-2">
        <input
          type="number"
          value={inputValue[rowId] || ""}
          onChange={(e) => onInputChange(rowId, e.target.value)}
          placeholder="Enter value to set"
        />
      </td>
      <td className="p-2">
        <button
          className="p-1 bg-blue-300 shadow-sm rounded hover:scale-90 cursor-pointer transition-all text-[12px] font-semibold"
          onClick={() => onPercentageChange(rowId)}
        >
          Increase by %
        </button>
      </td>
      <td>
        <button
          className="p-1 bg-blue-300 shadow-sm rounded hover:scale-90 cursor-pointer transition-all text-[12px] font-semibold"
          onClick={() => onValueChange(rowId)}
        >
          Set Value
        </button>
      </td>
      <td
        className={`${
          variance == undefined || variance == 0
            ? "text-black"
            : variance < 0
            ? "text-red-400"
            : "text-green-400"
        } `}
      >
        {variance ? `${variance.toFixed(2)}%` : "0%"}
        {variance == 0 || variance == undefined ? (
          <></>
        ) : variance < 0 ? (
          <span className="p-1 animate-bounce">&#8595;</span>
        ) : (
          <span className="p-1 animate-bounce">&#8593;</span>
        )}
      </td>
    </>
  );
};

export default RowActions;
