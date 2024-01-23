import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "./cartService";

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await cartService.getCart(state.auth.userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await cartService.addToCart(
        state.auth.userToken,
        state.cart.cart,
        data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await cartService.updateCart(
        state.auth.userToken,
        state.cart.cart,
        data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default cartSlice.reducer;
