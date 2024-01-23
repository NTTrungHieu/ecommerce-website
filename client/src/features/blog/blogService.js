import axios from "axios";
import { base_url } from "../../app/axiosConfig";

const getBlogs = async (data) => {
  const url = data ? "?" + data : "";
  const response = await axios.get(base_url + "/blog" + url);
  if (response.data) {
    return response.data;
  }
};

const getBlogsPagination = async (data) => {
  const url = data ? "?" + data : "";
  const response = await axios.get(base_url + "/blog/pagination" + url);
  if (response.data) {
    return response.data;
  }
};

const getBlog = async (data) => {
  const response = await axios.get(base_url + "/blog/" + data);
  if (response.data) {
    return response.data;
  }
};

export const blogService = { getBlogs, getBlog, getBlogsPagination };
