import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlogs = createAsyncThunk(
  "blog/get",
  async (data, thunkAPI) => {
    try {
      return await blogService.getBlogs(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (data, thunkAPI) => {
    try {
      return await blogService.getBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBlogsPagination = createAsyncThunk(
  "blog/getAllBlogsPagination",
  async (data, thunkAPI) => {
    try {
      return await blogService.getBlogsPagination(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogs: [],
  blog: {},
  totalBlogs: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllBlogsPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogsPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload.Blogs;
        state.totalBlogs = action.payload.TotalBlogs;
      })
      .addCase(getAllBlogsPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
