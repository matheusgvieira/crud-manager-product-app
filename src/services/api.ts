import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("@products-manager/token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
