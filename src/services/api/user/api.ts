import axios from "axios";
import { BASE_URL } from "../../../constants/baseUrls";
import { store } from "../../../utils/context/store";




export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {'Content-Type' : 'application/json'},
  withCredentials : true,
});

api.interceptors.request.use(
  async (config) => {

    const state = store.getState();
    const authToken = state.auth.token;


  
      config.headers['Authorization'] = `Bearer ${authToken}`;
  

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);