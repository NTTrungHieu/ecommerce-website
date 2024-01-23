import axios from "axios";
import { base_url } from "../../app/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(base_url + "/user/register", userData);
  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(base_url + "/user/login", userData);
  if (response.data) {
    return response.data;
  }
};

const getWishlist = async (token) => {
  var config = {
    method: "get",
    url: `${base_url}/user/wishlist`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (token, data) => {
  var config = {
    method: "put",
    url: `${base_url}/product/wishlist/${data}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const updateInfo = async (token, data) => {
  var config = {
    method: "put",
    url: `${base_url}/user/edit-user`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };
  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const updatePassword = async (token, data) => {
  var config = {
    method: "put",
    url: `${base_url}/user/password`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };
  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const userDetails = async (token) => {
  var config = {
    method: "get",
    url: `${base_url}/user/profile`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const forgotPassword = async (data) => {
  var config = {
    method: "post",
    url: `${base_url}/user/forgot-password-token`,
    data: {
      email: data,
    },
  };
  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  userDetails,
  getWishlist,
  addToWishlist,
  updateInfo,
  updatePassword,
  forgotPassword,
};
