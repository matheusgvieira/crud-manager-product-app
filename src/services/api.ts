import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("@products-manager/token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
