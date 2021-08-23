import axiosClient from "./axiosClient";

const postApi = {
  getAll(params) {
    const url = "/post/getListPagination.php";
    return axiosClient.get(url, { params });
  },

  get(userid) {
    const url = `/post/getListPostUserID.php?userid=${userid}`;
    return axiosClient.get(url);
  }
};

export default postApi;
