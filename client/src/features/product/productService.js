import axios from "axios";
import { base_url } from "../../app/axiosConfig";

const getProducts = async (data) => {
  const url = data ? "?" + data : "";
  const response = await axios.get(base_url + "/product" + url);
  if (response.data) {
    return response.data;
  }
};

const getProductsPagination = async (data) => {
  const url = data ? "?" + data : "";
  const response = await axios.get(base_url + "/product/pagination" + url);
  if (response.data) {
    return response.data;
  }
};

const rate = async (token, data) => {
  var config = {
    method: "put",
    url: `${base_url}/product/rate/${data.id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data.body,
  };

  const response = await axios(config);
  if (response.data) {
    return response.data;
  }
};

export const productService = { getProducts, rate, getProductsPagination };
