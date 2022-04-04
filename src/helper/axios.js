import axios from "axios";
import { BASE_URL } from "../urlConfig";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  };
  return config;
});

export default axiosInstance;
