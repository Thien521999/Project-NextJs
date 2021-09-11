// libs
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
// components
import PostDetailForm from "../../../components/Posts/PostDetailForm";
import { editPost } from "../../../components/Posts/PostSlice";
// hooks
import useNotAuthentication from "../../../hooks/useNotAuthentication";
// others
import postApi from "../../../api/postApi";
import { PostType } from "../..";
import { TypeCategory } from ".";

type PostEditDataProps = {
  postDetailData: PostType[];
  postCategories: TypeCategory[];
};

type PostEditProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostEdit: PostEditProps = () => {
  useNotAuthentication();
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const postId = router.query.postId;

  const [detailPost, setDetailPost] = useState({
    PID: "",
    USERID: "",
    post_content: "",
    status: "",
    time_added: "",
    url_image: "",
    postid: "",
  });
  const [categoryPost, setCategoryPost] = useState([]);

  const [postData, setPostData] = useState(() => {
    return {
      postid: postId,
      url_image: detailPost?.url_image,
      post_content: detailPost?.post_content,
      category: categoryPost?.map((cate) => cate.tag_index),
      obj_image: {
        file: null,
        base64: "",
      },
    };
  });

  useEffect(() => {
    (async () => {
      const postDetailRes = await postApi.getPostDetailByPostId(postId);

      setDetailPost(postDetailRes?.data?.data?.post);
      setCategoryPost(postDetailRes?.data?.data?.categories);

      setPostData({
        url_image: postDetailRes?.data?.data?.post?.url_image,
        post_content: postDetailRes?.data?.data?.post?.post_content,
        postid: postDetailRes?.data?.data?.post?.PID,
        category: postDetailRes?.data?.data?.categories?.map((cate) => cate.tag_index),
        obj_image: {
          file: null,
          base64: "",
        },
      });
    })();
  }, []);

  const onChangeCategory = (newCategory: string[]) => {
    setPostData({
      ...postData,
      category: newCategory,
    });
  };

  const handleSubmit = (values) => {
    (async () => {
      const action = editPost({ ...postData, url_image: values.url_image, post_content: values.post_content });
      const data: any = await dispatch(action);
      const resultAction = unwrapResult(data);

      setPostData({
        ...postData,
        url_image: postData.url_image,
        obj_image: {
          file: null,
          base64: "",
        },
      });

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

export const getServerSideProps: GetServerSideProps<PostEditDataProps> = async (context) => {
  // console.log("---", context.query.postId);
  // const postId = context?.query?.postId;
  // const postDetailPros = await postApi.getPostDetailByPostId(postId);
  // console.log("api-----", postDetailPros);

  const props = {
    postDetailData: [],
    postCategories: [],
  };

  return {
    props,
  };
};

export default PostEdit;

// // libs
// import React, { useEffect, useState } from "react";
// import useNotAuthentication from "../../../hooks/useNotAuthentication";
// import postApi from "../../../api/postApi";
// import { useSnackbar } from "notistack";
// import { useDispatch } from "react-redux";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { useRouter } from "next/router";
// import { InferGetServerSidePropsType, GetServerSideProps } from "next";
// // components
// import { PostType } from "../..";
// import { TypeCategory } from ".";
// import PostDetailForm from "../../../components/Posts/PostDetailForm";
// import PostDetailSideBar from "../../../components/Posts/PostDetailSideBar";
// import { createNewPost, editPost } from "../../../components/Posts/PostSlice";

// // const initialState = {
// //   url_image: "",
// //   post_content: "",
// //   category: [],
// //   obj_image: {
// //     file: null,
// //     base64: "",
// //   },
// // };

// type PostEditDataProps = {
//   postDetailData: PostType[];
//   postCategories: TypeCategory[];
// };

// type PostEditProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

// const PostEdit: PostEditProps = () => {
//   useNotAuthentication();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();
//   const postId = router.query.postId;

//   const [detailPost, setDetailPost] = useState({
//     PID: "",
//     USERID: "",
//     post_content: "",
//     status: "",
//     time_added: "",
//     url_image: "",
//     postid: "",
//   });
//   const [categoryPost, setCategoryPost] = useState([]);

//   const [postData, setPostData] = useState(() => {
//     return {
//       postid: postId,
//       url_image: detailPost?.url_image,
//       post_content: detailPost?.post_content,
//       category: categoryPost?.map((cate) => cate.tag_index),
//       obj_image: {
//         file: null,
//         base64: "",
//       },
//     };
//   });

//   useEffect(() => {
//     (async () => {
//       const postDetailRes = await postApi.getPostDetailByPostId(postId);

//       setDetailPost(postDetailRes?.data?.data?.post);
//       setCategoryPost(postDetailRes?.data?.data?.categories);

//       setPostData({
//         url_image: postDetailRes?.data?.data?.post?.url_image,
//         post_content: postDetailRes?.data?.data?.post?.post_content,
//         postid: postDetailRes?.data?.data?.post?.PID,
//         category: postDetailRes?.data?.data?.categories?.map((cate) => cate.tag_index),
//         obj_image: {
//           file: null,
//           base64: "",
//         },
//       });
//     })();
//   }, []);

//   const onChangeCategory = (newCategory: string[]) => {
//     setPostData({
//       ...postData,
//       category: newCategory,
//     });
//   };

//   const onChangeDetailForm = (key: string, value: any) => {
//     if (key === "obj_image") {
//       setPostData({
//         ...postData,
//         [key]: value,
//         url_image: "",
//       });
//     }
//     setPostData({
//       ...postData,
//       [key]: value,
//     });
//   };

//   const handleSubmitPost = () => {
//     (async () => {
//       const action = editPost(postData);
//       const data: any = await dispatch(action);
//       const resultAction = unwrapResult(data);
//       // console.log(resultAction);

//       setPostData({
//         ...postData,
//         url_image: postData.url_image,
//         obj_image: {
//           file: null,
//           base64: "",
//         },
//       });

//       router.push("/");
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

// export const getServerSideProps: GetServerSideProps<PostEditDataProps> = async (context) => {
//   // console.log("---", context.query.postId);
//   // const postId = context?.query?.postId;
//   // const postDetailPros = await postApi.getPostDetailByPostId(postId);
//   // console.log("api-----", postDetailPros);

//   const props = {
//     postDetailData: [],
//     postCategories: [],
//   };

//   return {
//     props,
//   };
// };

// export default PostEdit;
