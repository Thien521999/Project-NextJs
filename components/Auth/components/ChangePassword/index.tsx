// libs
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../userSlice";
// components
import ChangePasswordForm, { valueType } from "../ChangePasswordForm";
// others

const ChangePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: valueType) => {
    // console.log("Form submit:", values);

    try {
      const action = changePassword(values);
      const resultAction: any = await dispatch(action);
      const data = unwrapResult(resultAction);

      if (data?.status === 200) {
        enqueueSnackbar(data?.message, { variant: "success" });
        router.push("/login");
      }
    } catch (error) {
      enqueueSnackbar("Mật khẩu cũ không đúng. Vui lòng nhập lại", { variant: "error" });
    }
  };
  return <ChangePasswordForm onSubmit={handleSubmit} />;
};

export default ChangePassword;
