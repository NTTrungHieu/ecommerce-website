import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: true,
};

export const tableSlice = createSlice({
  name: "table",
  initialState: initialState,
  reducers: {
    refresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { refresh } = tableSlice.actions;
export default tableSlice.reducer;
