import axios, { type AxiosRequestConfig, type Method } from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const request = async <T = any>(
  url: string,
  method: Method = "GET",
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api({ url, method, data, ...config });
  return response.data;
};