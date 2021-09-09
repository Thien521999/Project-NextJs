// libs
import { makeStyles } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
// components
import UserProfileForm from "../../components/User/UserProfileForm";
// others
import { updateProfile } from "../../components/Auth/userSlice";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  avatarImage: {
    display: "flex",
    margin: "auto",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    const action = updateProfile(values);
    const resultAction: any = await dispatch(action);
    const profile = unwrapResult(resultAction);

    enqueueSnackbar("Cập nhật thành công", { variant: "success" });
    router.push("/login");
  };
  return <UserProfileForm onSubmit={handleSubmit} />;
};

export default UserProfile;

// // libs
// import { Avatar, Box, makeStyles } from "@material-ui/core";
// import { unwrapResult } from "@reduxjs/toolkit";
// import Image from "next/image";
// import { useSnackbar } from "notistack";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import userApi from "../../api/userApi";
// import { updateProfile } from "../../components/Auth/userSlice";

// const useStyles = makeStyles((theme) => ({
//   avatarImage: {
//     display: "flex",
//     margin: "auto",
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));

// const UserProfile = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const inputFileEl = useRef(null);
//   const currentUser = useSelector((state: any) => state?.user?.current?.user);
//   const [user, setUser] = useState(currentUser);
//   const [objFile, setObjFile] = useState({
//     file: "null",
//     base64URL: "",
//   });
//   const { enqueueSnackbar } = useSnackbar();

//   const handleOnChange = (key: string) => (e) => {
//     const value = e.target.value;
//     setUser({
//       ...user,
//       [key]: value,
//     });
//   };

//   const handleChooseFile = () => {
//     inputFileEl.current.click();
//   };

//   const handleChangeFile = (e) => {
//     const listFiles = e.target.files;
//     if (listFiles.length === 0) return;
//     const file = listFiles[0];

//     if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
//       const reader = new FileReader();
//       reader.addEventListener(
//         "load",
//         function () {
//           // convert image file to base64 string
//           console.log("base-64", reader.result);
//           setObjFile({
//             file,
//             base64URL: reader.result as string,
//           });
//         },
//         false
//       );
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     } else {
//       enqueueSnackbar("Invalid File ", { variant: "error" });
//     }
//   };

//   const avatarUrl = objFile.base64URL || user.profilepicture || "/images/avatar-02.png";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       fullname: user.fullname,
//       gender: user.gender,
//       description: user.description,
//       avatar: objFile.file,
//     };
//     const action = updateProfile(data);
//     const resultAction: any = await dispatch(action);
//     const profile = unwrapResult(resultAction);
//     console.log(profile);
//   };

//   return (
//     <div className="ass1-login">
//       <div className="ass1-login__content">
//         <p>Profile</p>
//         <div className="ass1-login__form">
//           <Avatar onClick={handleChooseFile} alt={user.fullname} src={avatarUrl} className={classes.avatarImage} />
//           <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
//             <input
//               value={user.fullname}
//               onChange={handleOnChange("fullname")}
//               type="text"
//               className="form-control"
//               placeholder="Tên ..."
//               required
//             />
//             <select value={user.gender} onChange={handleOnChange("gender")} className="form-control">
//               <option value="">Giới tính</option>
//               <option value="Nam">Nam</option>
//               <option value="Nữ">Nữ</option>
//             </select>
//             <input
//               ref={inputFileEl}
//               onChange={handleChangeFile}
//               style={{ display: "none" }}
//               type="file"
//               name="avatar"
//               placeholder="Ảnh đại diện"
//               className="form-control"
//             />
//             <textarea
//               value={user.description}
//               onChange={handleOnChange("description")}
//               className="form-control"
//               cols={30}
//               rows={5}
//               placeholder="Mô tả ngắn ..."
//             />
//             <div className="ass1-login__send justify-content-center">
//               <button type="submit" className="ass1-btn">
//                 Cập nhật
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
