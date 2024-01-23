import axios from "axios";
import { base_url } from "../../app/axiosConfig";

const getCategories = async (type) => {
  const response = await axios.get(base_url + "/category/get-all/" + type);
  if (response.data) {
    return response.data;
  }
};

export const categoryService = { getCategories };
