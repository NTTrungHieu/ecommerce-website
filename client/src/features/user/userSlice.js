import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

const userToken = localStorage.getItem("hieseu-token")
  ? localStorage.getItem("hieseu-token")
  : null;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await authService.updateInfo(state.auth.userToken, userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await authService.updatePassword(state.auth.userToken, userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  "auth/wishlist",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await authService.getWishlist(state.auth.userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "auth/addtowishlist",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await authService.addToWishlist(state.auth.userToken, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/userinfo",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      return await authService.userDetails(state.auth.userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: "",
  userToken: userToken,
  wishlist: [],
  compareList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("hieseu-token"); // deletes token from storage
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
      state.userToken = null;
      window.location.reload();
    },
    addToCompare: (state, action) => {
      let index = -1;
      let item = action.payload;
      state.compareList.forEach((e, i) => {
        if (e._id === item._id) {
          index = i;
        }
      });
      if (index === -1) {
        state.compareList.push(item);
      } else {
        state.compareList.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        toast.info("User Created Successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("User Created Failed");
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.userToken = action.payload.token;
        localStorage.setItem("hieseu-token", action.payload.token);
        toast.info("User Logged in Successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("User Logged in Failed");
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        localStorage.removeItem("hieseu-token"); // deletes token from storage
        state.user = null;
        state.message = action.error;
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload || [];
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Changed Account Informations Successfully!");
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        toast.success("Changed Account Informations Failed!");
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Changed Password Successfully!");
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.error);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Your new password is sent. Please check your email");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        toast.error(action.error);
      });
  },
});

export const { logout, addToCompare } = authSlice.actions;
export default authSlice.reducer;
