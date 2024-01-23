import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllProductsPagination = createAsyncThunk(
  "product/getProductsPagination",
  async (data, thunkAPI) => {
    try {
      return await productService.getProductsPagination(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getproduct",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRelativeProduct = createAsyncThunk(
  "product/getrelativeproduct",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(`Category=${data}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPopularProduct = createAsyncThunk(
  "product/getpopularproduct",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(`sort=-AverageRating${data}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHotProduct = createAsyncThunk(
  "product/getHotproduct",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(`sort=-Sold${data}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const rateProduct = createAsyncThunk(
  "product/rateProduct",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await productService.rate(state.auth.userToken, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  product: {},
  hotProducts: [],
  popularProducts: [],
  relativeProducts: [],
  totalProducts: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllProductsPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.Products;
        state.totalProducts = action.payload.TotalProducts;
      })
      .addCase(getAllProductsPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload[0];
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getPopularProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.popularProducts = [...action.payload];
      })
      .addCase(getPopularProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getHotProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotProducts = [...action.payload];
      })
      .addCase(getHotProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getRelativeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelativeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.relativeProducts = [...action.payload];
      })
      .addCase(getRelativeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        // state.product = [...action.payload];
      })
      .addCase(rateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
