// libs
import { Box, Button } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
// components
import LoginForm from "../LoginForm";
import { login } from "../../userSlice";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleSubmit = async (values) => {
    // console.log("Form submit:", values);

    try {
      const action = login(values); //values : là những giá trị trên form value
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // console.log('New user:', user);

      //sau khi dang ky xong có the lam tiep cac buoc nhu :dong cửa sổ ,hiển thị message success... có thể làm tiếp dưới này
      //close dialog
      if (!closeDialog) return;
      closeDialog();
      if (user?.status === 200) {
        router.push("/");
      } else {
        enqueueSnackbar(user?.error, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default Login;
