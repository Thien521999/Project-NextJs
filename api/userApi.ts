import axiosClient from "./axiosClient";
import { login } from "../store/actions/Login";

type ProfileData = {
  fullname: string;
  gender?: string;
  description?: string;
  avatar?: string | null;
}

const userApi = {
  register(data) {
    const url = "/member/register.php";
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = "/member/login.php";
    return axiosClient.post(url, data);
  },

  getUser(userId) {
    if(!userId) return null;
    const url = `/member/member.php?userid=${userId}`;
    return axiosClient.get(url);
  },

  getListPostUser(userId) {
    const url = `post/getListPostUserID.php?userid=${userId}`;
    return axiosClient.get(url);
  },

  getChangePassword(data) {
    const url = "/member/password.php";
    return axiosClient.post(url, data);
  },

  updateProfile(profileData:ProfileData) {
    const data = new FormData();
    data.append("fullname", profileData.fullname);
    data.append("gender", profileData.gender);
    data.append("description", profileData.description);
    if (profileData.avatar) {
      data.append("avatar", profileData.avatar);
    }
    const url= "/member/update.php";
    return axiosClient.post(url, data);
  }
};

export default userApi;
