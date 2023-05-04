import axios from "axios";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.token = token;
  }

  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    const { error } = err.response.data;
    return Promise.reject(new Error(error));
  }
);

export default service;
