import axios from "axios";
import { BASE_URL } from "../../../constants/baseUrls";
// import { userAuth } from "../const/localStorage";


export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {'Content-Type' : 'application/json'},
  withCredentials : true,
});

// api.interceptors.request.use(
//   async (config) => {
//     config.headers["Authorization"] = localStorage.getItem(userAuth);
//     return config;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );

