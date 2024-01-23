import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { colorService } from "./colorService";

export const getAllColors = createAsyncThunk(
  "color/getcolor",
  async (data, thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default colorSlice.reducer;
