// libs
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
// components
import PostDetailForm from "../../components/Posts/PostDetailForm";
import { createNewPost } from "../../components/Posts/PostSlice";
// hooks
import useNotAuthentication from "../../hooks/useNotAuthentication";

const initialState = {
  url_image: "",
  post_content: "",
  category: [],
  obj_image: {
    file: null,
    base64: "",
  },
};

const PostCreate = () => {
  useNotAuthentication();
  const router = useRouter();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);

  const onChangeCategory = (newCategory: string[]) => {
    setPostData({
      ...postData,
      category: newCategory,
    });
  };

  const handleSubmit = async (values) => {
    console.log("form submit:", values);

    (async () => {
      const action = createNewPost({ ...values, category: postData.category });
      const data: any = await dispatch(action);
      const resultAction = unwrapResult(data);

      router.push("/");
    })();
  };

  return (
    <div className="container">
      <PostDetailForm
        url_image={postData.url_image}
        post_content={postData.post_content}
        obj_image={postData.obj_image}
        category={postData.category}
        onChangeCategory={onChangeCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PostCreate;

// // libs
// import React, { useState } from "react";
// import { Storekeys } from "../../constants/Login";
// import { useSnackbar } from "notistack";
// import { useDispatch } from "react-redux";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { useRouter } from "next/router";
// // components
// import PostDetail from "./[postId]";
// import PostDetailForm from "../../components/Posts/PostDetailForm";
// import PostDetailSideBar from "../../components/Posts/PostDetailSideBar";
// import useNotAuthentication from "../../hooks/useNotAuthentication";
// import { createNewPost } from "../../components/Posts/PostSlice";
// // others
// import postApi from "../../api/postApi";

// const initialState = {
//   url_image: "",
//   post_content: "",
//   category: [],
//   obj_image: {
//     file: null,
//     base64: "",
//   },
// };

// const PostCreate = () => {
//   useNotAuthentication();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();
//   const [postData, setPostData] = useState(initialState);
//   const token = localStorage.getItem(Storekeys?.TOKEN);

//   const onChangeCategory = (newCategory: string[]) => {
//     console.log(newCategory);

//     setPostData({
//       ...postData,
//       category: newCategory,
//     });
//   };

//   // const onChangeDetailForm = (values) => {
//   //   console.log(values);

//   //   setPostData({
//   //     ...postData,
//   //     ...values,
//   //   });
//   // };

//   const onChangeDetailForm = (key: string, value: any) => {
//     console.log("key: " + key + "--" + "value: " + value);

//     setPostData({
//       ...postData,
//       [key]: value,
//     });
//   };

//   const handleSubmitPost = () => {
//     (async () => {
//       console.log(postData);

//       const action = createNewPost(postData);
//       const data: any = await dispatch(action);
//       const resultAction = unwrapResult(data);
//       console.log(resultAction);

//       // router.push("/");
//     })();
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-lg-8">
//           <PostDetailForm
//             url_image={postData.url_image}
//             post_content={postData.post_content}
//             obj_image={postData.obj_image}
//             onChangeDetailForm={onChangeDetailForm}
//           />
//         </div>
//         <div className="col-lg-4">
//           <PostDetailSideBar
//             category={postData.category}
//             onChangeCategory={onChangeCategory}
//             handleSubmitPost={handleSubmitPost}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCreate;
