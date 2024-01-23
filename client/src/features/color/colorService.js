import axios from "axios";
import { base_url } from "../../app/axiosConfig";

const getColors = async (data = "") => {
  const response = await axios.get(base_url + "/color" + data);
  if (response.data) {
    return response.data;
  }
};

export const colorService = { getColors };
