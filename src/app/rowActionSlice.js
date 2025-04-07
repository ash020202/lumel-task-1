import { createSlice } from "@reduxjs/toolkit";
import sampleData from "../data/sampleData";
import { calculateOverallTotal, updateSingleRow } from "../lib/utils";

const initialState = {
  rows: sampleData.rows,
  overallTotal: calculateOverallTotal(sampleData.rows),
  inputValue: {},
};
const rowActionSlice = createSlice({
  name: "row-action",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      const { id, value } = action.payload;
      state.inputValue[id] = value;
    },
    updateRowValue: (state, action) => {
      const { id, newValue, isPercentage } = action.payload;
      const numericValue = newValue;
      // console.log(typeof numericValue);
      const updatedRows = updateSingleRow(
        state.rows,
        id,
        numericValue,
        isPercentage
      );
      state.rows = updatedRows;
      state.overallTotal = calculateOverallTotal(state.rows);
    },
  },
});

export const { setInputValue, updateRowValue } = rowActionSlice.actions;
export default rowActionSlice.reducer;
