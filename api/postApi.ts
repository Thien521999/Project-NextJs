import axiosClient from "./axiosClient";

type ObjImage=  {
  base64: string;
  file: File | null;
}

type PostData = {
  post_content?: string;
  url_image?: string;
  category?: string[];
  obj_image?: ObjImage;
  postid?: string;
}

const postApi = {
  getAll(params) {
    const url = "/post/getListPagination.php";
    return axiosClient.get(url, { params });
  },

  get(userid) {
    const url = `/post/getListPostUserID.php?userid=${userid}`;
    return axiosClient.get(url);
  },

  getPostDetailByPostId(postId) {
    const url = `/post/post.php?postid=${postId}`;
    return axiosClient.get(url);
  },

  createNewPost(postData: PostData) {
    const data = new FormData();
    data.append("post_content", postData.post_content);
    data.append("url_image", postData.url_image);
    data.append("category", postData.category.toString());
    
    if (postData.obj_image) {
      data.append("obj_image", postData.obj_image as any);
    }
    const url = "/post/addNew.php";
    return axiosClient.post(url, data)
  },

  editPost(postData: PostData) {
    const data = new FormData();
    data.append("post_content", postData.post_content);
    data.append("url_image", postData.url_image);
    data.append("category", postData.category.toString());
    data.append("postid", postData.postid);

    if (postData.obj_image) {
      data.append("obj_image", postData.obj_image as any);
    }
    const url = "/post/edit.php";
    return axiosClient.post(url, data)
  },

  getCommentByPostId(postId) {
    const url = `/comment/comments.php?postid=${postId}`;
    return axiosClient.get(url);
  },

  postComment(data) {
    const url = `/comment/add_new.php`;
    return axiosClient.post(url, data)
  }
};

export default postApi;
