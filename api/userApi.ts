import axiosClient from "./axiosClient";
import { login } from "../store/actions/Login";

const userApi = {
  register(data) {
    const url = "/member/register.php";
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = "/member/login.php";
    return axiosClient.post(url, data);
  },
};

export default userApi;
