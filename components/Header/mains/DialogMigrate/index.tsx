// libs
import { Dialog } from "@material-ui/core";
import React, { useState } from "react";

const DialogMigrate = ({
  children,
  open,
  disableBackdropClick,
  disableEscapeKeyDown,
  onClose,
}) => {
  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return false;
    }

    if (disableEscapeKeyDown && reason === "escapeKeyDown") {
      return false;
    }

    if (typeof onClose === "function") {
      onClose();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown
      aria-labelledby="form-dialog-title"
    >
      {children}
    </Dialog>
  );
};

export default DialogMigrate;
