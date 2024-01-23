import axios from "axios";
import { base_url } from "../../app/axiosConfig";
import { cartService } from "../cart/cartService";

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
  await cartService.clearCart(token);
  if (response.data) {
    return response.data;
  }
};

const getOrder = async (token, data) => {
  var config = {
    method: "get",
    url: `${base_url}/order/user-orders`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

export const orderService = { checkout, getOrder };
