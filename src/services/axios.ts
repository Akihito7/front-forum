import { deleteCookie, getCookie } from "@/server-actions/cookies";
import axios from "axios";
import { toast } from "sonner";

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
  });


api.interceptors.response.use(
  async (config) => {
    const token = await getCookie('@token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {

    const statusCode = error.response.status;

    if (statusCode === 401) {
      await deleteCookie('@token');
      window.location.href = '/login';
    };

    return Promise.reject(error);
  });


