import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, updateRowValue } from "../app/rowActionSlice";

const RowActions = ({ rowId, variance }) => {
  const dispatch = useDispatch();
  const inputValue = useSelector(
    (state) => state.rowAction.inputValue[rowId] || ""
  );

  const handleInputChange = (value) => {
    dispatch(setInputValue({ id: rowId, value }));
    // console.log(typeof value);
  };

  const handleAllocationPercent = () => {
    const percentage = parseFloat(inputValue);
    if (!percentage || isNaN(percentage)) {
      alert("Please enter a valid percentage value.");
      return;
    }
    dispatch(
      updateRowValue({ id: rowId, newValue: percentage, isPercentage: true })
    );
    dispatch(setInputValue({ id: rowId, newValue: "", isPercentage: true }));
  };

  const handleAllocationVal = () => {
    const newValue = parseFloat(inputValue);
    if (!newValue || isNaN(newValue)) {
      alert("Please enter a valid value.");
      return;
    }
    dispatch(updateRowValue({ id: rowId, newValue, isPercentage: false }));
    dispatch(setInputValue({ id: rowId, newValue: "", isPercentage: false }));
  };

  return (
    <>
      <td className="p-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => handleInputChange(Number(e.target.value))}
          placeholder="Enter value to set"
        />
      </td>
      <td className="p-2">
        <button
          className="p-1 bg-blue-300 shadow-sm rounded hover:scale-90 cursor-pointer transition-all text-[12px] font-semibold"
          onClick={handleAllocationPercent}
        >
          Increase by %
        </button>
      </td>
      <td>
        <button
          className="p-1 bg-blue-300 shadow-sm rounded hover:scale-90 cursor-pointer transition-all text-[12px] font-semibold"
          onClick={handleAllocationVal}
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
        }`}
      >
        {variance ? `${Number(variance).toFixed(2)}%` : "0%"}
        {/* up and down arrow logic */}
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
