// libs
import React, { useState } from "react";
// components
import Login from "../../components/Auth/components/Login";
// hooks
import useAuthentication from "../../hooks/useAuthentication";

const LoginPage = () => {
  useAuthentication();
  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return <Login />;
};
{
  /* <Login closeDialog={handleClose} /> */
}

export default LoginPage;

// // libs
// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { BASE_URL } from "../../constants/BASE_URL";
// import { useSnackbar } from "notistack";
// import { Box, Button, DialogContent, IconButton, makeStyles } from "@material-ui/core";
// import { Close } from "@material-ui/icons";
// // components
// import DialogMigrate from "../../components/Header/mains/DialogMigrate";
// import Login from "../../components/Auth/components/Login";
// // hooks
// import useAuthentication from "../../hooks/useAuthentication";

// interface FormLogin {
//   email: string;
//   password: string;
// }

// const initFormData = {
//   email: "",
//   password: "",
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   closeButton: {
//     position: "absolute",
//     top: theme.spacing(1),
//     right: theme.spacing(1),
//     color: theme.palette.grey[500],
//     zIndex: 1,
//   },
// }));

// const MODE = {
//   LOGIN: "login",
//   REGISTER: "register",
// };

// const LoginPage = () => {
//   useAuthentication();

//   const classes = useStyles();

//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState(MODE.LOGIN);
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   // formData co kieu la FormLogin
//   const [formData, setFormData] = useState<FormLogin>(initFormData);
//   const router = useRouter();

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Cách 1: hơi dài ,ko tân dụng lại dc
//   // const handleOnChangeEmail = (evt) => {
//   //   console.log(evt.target.value);
//   //   setFormData({
//   //     ...formData,
//   //     email: evt.target.value,
//   //   });
//   // };

//   // const handleOnChangePassword = (evt) => {
//   //   console.log(evt.target.value);
//   //   setFormData({
//   //     ...formData,
//   //     password: evt.target.value,
//   //   });
//   // };

//   // Cách 2: viết dùng lại cho lần sau(gôp 2 hàm)m, key là email or password
//   // Dùng Clouse trong javascript
//   const handleOnChange = (key: string) => (evt: any) => {
//     const value = evt.target.value;
//     setFormData({
//       ...formData,
//       [key]: value,
//     });
//   };

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     // const url = `${BASE_URL}/member/login.php`;
//     const url = `/api/login.php`;

//     // Cookie.set("name3", Math.floor(Math.random() * 10000), { expires: 7 });
//     // Cookie.remove("name3");

//     axios({
//       method: "post",
//       url,
//       data: JSON.stringify(formData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (res?.data?.status === 200) {
//           Cookies.set("token", res?.data?.token, { expires: 30 });
//           // enqueueSnackbar(res?.data?.message, { variant: "success" });
//           router.push("/");
//         } else {
//           Cookies.set("token", res?.data?.token, { expires: 30 });
//           enqueueSnackbar(res?.data?.error, { variant: "error" });
//         }
//       })
//       .catch((err) => console.log("error =", err));
//   };

//   return (
//     <div className="ass1-login">
//       <div className="ass1-login__logo">
//         <a href="index.html" className="ass1-logo">
//           ZendVn Meme
//         </a>
//       </div>

//       <DialogMigrate open={open} disableBackdropClick disableEscapeKeyDown onClose={handleClose}>
//         <IconButton className={classes.closeButton} onClick={handleClose}>
//           <Close />
//         </IconButton>

//         <DialogContent>
//           {mode === MODE.LOGIN && (
//             <>
//               <Login closeDialog={handleClose} />
//               <Box textAlign="center">
//                 <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
//                   Do not have an account.Register here.
//                 </Button>
//               </Box>
//             </>
//           )}
//         </DialogContent>
//       </DialogMigrate>

//       <div className="ass1-login__content">
//         <p>Đăng nhập</p>
//         <div className="ass1-login__form">
//           <form onSubmit={handleSubmit}>
//             <input
//               value={formData.email}
//               onChange={handleOnChange("email")}
//               type="text"
//               className="form-control"
//               placeholder="Email"
//               required
//             />
//             <input
//               value={formData.password}
//               onChange={handleOnChange("password")}
//               type="password"
//               className="form-control"
//               placeholder="Mật khẩu"
//               required
//             />
//             <div className="ass1-login__send">
//               <a href="dang-ky.html">Đăng ký một tài khoản</a>
//               <button type="submit" className="ass1-btn">
//                 Đăng nhập
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
