import axiosClient from "./axiosClient";

const searchApi = {
    get(query) {
        const url = `/post/search.php?query=${query}`;
        return axiosClient.get(url);
    }
}
export default searchApi;