import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "./orderService";
import { toast } from "react-toastify";

export const getUserOrder = createAsyncThunk(
  "order/getUserOrder",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await orderService.getOrder(state.auth.userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkout = createAsyncThunk(
  "order/checkout",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await orderService.checkout(state.auth.userToken, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  order: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        getUserOrder();
        toast.success("THANK YOU FOR YOUR PURCHASE!");
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default orderSlice.reducer;
