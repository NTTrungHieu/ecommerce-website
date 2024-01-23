import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../app/axiosConfig";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(base_url + "/user/login", userData);
      localStorage.setItem("hieseu-admin-token", data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// AsyncThunk: getUserDetails
export const getUserDetails = createAsyncThunk(
  "user/profile",
  async (arg, thunkAPI) => {
    // <-- destructure getState method
    const state = thunkAPI.getState(); // <-- invoke and access state object
    try {
      var config = {
        method: "get",
        url: `${base_url}/user/profile`,
        headers: {
          Authorization: "Bearer " + state.auth.userToken,
        },
      };
      const response = await axios(config);
      const data = await response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
