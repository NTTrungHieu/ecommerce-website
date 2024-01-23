import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserDetails, loginUser } from "./userActions";

const userToken = localStorage.getItem("hieseu-admin-token")
  ? localStorage.getItem("hieseu-admin-token")
  : null;

const initialState = {
  user: null,
  userToken: userToken,
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
      localStorage.removeItem("hieseu-admin-token"); // deletes token from storage
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        state.userToken = payload.token;
        toast.success("User Logged in Successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        toast.error("User Logged in Failed");
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.userToken = null;
        localStorage.removeItem("hieseu-admin-token"); // deletes token from storage
        toast.error("Your session token has expired");
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
