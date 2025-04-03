import { createSlice } from "@reduxjs/toolkit";
import sampleData from "../data/sampleData";
import { updateSingleRow } from "../lib/utils";

const initialState = {
  rows: sampleData.rows,
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
      const updatedRows = updateSingleRow(
        state.rows,
        id,
        newValue,
        isPercentage
      );
      state.rows = updatedRows;
    },
  },
});

export const { setInputValue, updateRowValue } = rowActionSlice.actions;
export default rowActionSlice.reducer;
