// libs
import React from "react";
import { TextareaAutosize } from "@material-ui/core";
import { Controller } from "react-hook-form";

type TextAreaFieldProps = {
  form: any;
  name: any;
  onChange?: any;
  disabled?: any;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({ form, name, disabled }) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextareaAutosize
          {...field}
          aria-label="empty textarea"
          minRows={2}
          placeholder="Descriptions..."
          disabled={disabled}
          style={{ width: "100%", marginTop: "7px" }}
        />
      )}
    />
  );
};

export default TextAreaField;
