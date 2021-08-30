import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(params) {
    const url = "/post/getListByCategory.php";
    return axiosClient.get(url, {params});
  },
  get(){
    const url = "/categories/index.php";
    return axiosClient.get(url);
  }
};

export default categoryApi;
