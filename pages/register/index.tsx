// libs
import React, { useState } from "react";
// components
import Register from "../../components/Auth/components/Register";
// hooks
import useAuthentication from "../../hooks/useAuthentication";

const RegisterPage = () => {
  useAuthentication();

  return <Register />;
};

export default RegisterPage;
