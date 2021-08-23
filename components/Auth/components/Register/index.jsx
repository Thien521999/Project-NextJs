// libs
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
// components
import RegisterForm from "../RegisterForm";
import { register } from "../../userSlice";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register({ closeDialog }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    // console.log("Form submit:", values);

    try {
      //auto set username = email
      // values.username = values.email;

      const action = register(values); //values : là những giá trị trên form
      const resultAction = await dispatch(action); //resultAction:là action object
      const user = unwrapResult(resultAction); //unwrapResult : tra ve kết quả payload nếu success là fullfiled ,throw error nếu rejected
      // console.log('New user:', user);

      //close dialog khi dang ky thanh cong
      if (closeDialog) closeDialog();

      //show thong báo khi dang ky thanh cong
      if (user?.status === 200) {
        router.push("/");
      } else {
        enqueueSnackbar(user?.error, { variant: "error" });
      }
    } catch (error) {
      console.log("Failed to register:", error);
      //show thong báo khi dang ky thất bại
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}

export default Register;
