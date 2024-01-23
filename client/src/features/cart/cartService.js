import axios from "axios";
import { base_url } from "../../app/axiosConfig";

const getCart = async (token, data) => {
  var config = {
    method: "get",
    url: `${base_url}/cart`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (token, cart, product) => {
  let arr = [];
  let isExisted = false;
  if (cart && cart.Products.length > 0) {
    cart.Products.forEach((e) => {
      arr.push({
        _id: e.Product._id,
        Quantity: e.Quantity,
        Color: e.Color,
      });
      if (e.Product._id === product._id && e.Color === product.Color) {
        arr[arr.length - 1].Quantity += product.Quantity;
        isExisted = true;
      }
    });
    if (!isExisted) arr.push(product);
  } else arr = [product];

  var config = {
    method: "post",
    url: `${base_url}/cart`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      cart: arr,
    },
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const updateCart = async (token, cart, product) => {
  let arr = [];

  cart.Products.forEach((e) => {
    let obj = {
      _id: e.Product._id,
      Quantity: e.Quantity,
      Color: e.Color,
    };
    if (e.Product._id === product._id && e.Color === product.Color) {
      if (product.type === "update") {
        obj.Quantity = product.Quantity;
      }
      if (product.type === "delete") {
        return;
      }
    }
    arr.push(obj);
  });

  var config = {
    method: "post",
    url: `${base_url}/cart`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      cart: arr,
    },
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

const checkout = async (token, data) => {
  var config = {
    method: "post",
    url: `${base_url}/order`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      ShippingInfo: data,
    },
  };

  const response = await axios(config);
  await clearCart();
  if (response.data) {
    return response.data;
  }
};

const clearCart = async (token, data) => {
  var config = {
    method: "delete",
    url: `${base_url}/cart`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await axios(config);
};

export const cartService = {
  getCart,
  addToCart,
  updateCart,
  checkout,
  clearCart,
};
