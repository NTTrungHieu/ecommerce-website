import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  action: "",
  dataForm: {},
};

export const ADD_DATA = "Add";
export const EDIT_DATA = "Edit";
export const SEE_DETAIL = "See Detail";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: initialState,
  reducers: {
    showDrawer: (state, action) => {
      state.show = true;
      state.action = action.payload?.action;
      state.dataForm = action.payload?.data;
    },
    closeDrawer: (state) => {
      state.show = false;
      state.action = initialState.action;
      state.dataForm = {};
    },
    updateDataForm: (state, action) => {
      state.dataForm = action.payload?.data;
    },
  },
});

export const { showDrawer, closeDrawer, updateDataForm } = drawerSlice.actions;
export default drawerSlice.reducer;
