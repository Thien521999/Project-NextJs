// libs
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { PostType } from "..";
import userApi from "../../api/userApi";
// components
import UserDetailInfo from "../../components/User/UserDetailInfo";
import UserDetailPost from "../../components/User/UserDetailPost";
// hooks
import useNotAuthentication from "../../hooks/useNotAuthentication";

// type PropsType = {
//   userDetailInfo: any;
//   userDetailPost: PostType[];
// };

const UserDetail = () => {
  useNotAuthentication();
  const router = useRouter();
  const userId = router?.query?.userId;

  const { enqueueSnackbar } = useSnackbar();

  const [userDetailInfo, setUserDetailInfo] = useState([]);
  const [userDetailPost, setUserDetailPost] = useState([]);

  useEffect(() => {
    (async () => {
      const userInfoDetailPos = userApi.getUser(userId);
      const userPostDetailPos = userApi.getListPostUser(userId);

      const [userInfoDetailRes, userPostDetailRes] = await Promise.all([userInfoDetailPos, userPostDetailPos]);

      if (userInfoDetailRes?.data?.status === 500) {
        alert("User does not exist");
        // enqueueSnackbar("User does not exist", { variant: "error" });
        router.push("/");
      }
      setUserDetailInfo(userInfoDetailRes?.data?.user);
      setUserDetailPost(userPostDetailRes?.data?.posts);
    })();
  }, [userId]);

  return (
    <div className="container">
      <UserDetailInfo userDetailInfo={userDetailInfo} postCount={userDetailPost?.length} />
      <UserDetailPost userDetailPost={userDetailPost} userDetailInfo={userDetailInfo} />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log("---", context.query);

//   const initialState = {
//     userDetailInfo: null,
//     userDetailPost: [],
//   };
//   return {
//     props: initialState,
//   };
// };

export default UserDetail;
