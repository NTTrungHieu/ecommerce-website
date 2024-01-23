import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";

export const getAllProductCategories = createAsyncThunk(
  "category/getproduct",
  async (data, thunkAPI) => {
    try {
      return await categoryService.getCategories("product");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBlogCategories = createAsyncThunk(
  "category/getblog",
  async (data, thunkAPI) => {
    try {
      return await categoryService.getCategories("blog");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  productCategories: "",
  blogCategories: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
      })
      .addCase(getAllProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(getAllBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default categorySlice.reducer;
