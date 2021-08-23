// libs
import Axios from "axios";
import getConfig from "next/config";
import { BASE_URL } from "../constants/BASE_URL";


Axios.defaults.baseURL = BASE_URL;

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
