import axios from "axios";
import { BASE_URL } from "../../../constants/baseUrls";


export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {'Content-Type' : 'application/json'},
  withCredentials : true,
});


