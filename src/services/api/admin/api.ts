import axios from "axios";
import { BASE_URL } from "../../../constants/baseUrls";
import { store } from "../../../utils/context/store";

export const adminApi = axios.create({
  baseURL: `${BASE_URL}/api`,
});

adminApi.interceptors.request.use(
  async (config) => {

    const state = store.getState();
    const authToken = state.adminAuth.token;


  
      config.headers['Authorization'] = `Bearer ${authToken}`;
  

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  })