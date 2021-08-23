// libs
import React, { useState } from "react";
// components
import Register from "../../components/Auth/components/Register";
// hooks
import useAuthentication from "../../hooks/useAuthentication";

const RegisterPage = () => {
  useAuthentication();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return <Register closeDialog={handleClose} />;
};

export default RegisterPage;
