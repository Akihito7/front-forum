import { getCookie } from "@/server-actions/cookies";
import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:4010',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await getCookie('@token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  })