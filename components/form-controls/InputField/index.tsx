// libs
import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

type InputField = {
  form: any;
  name: any;
  label: any;
  disabled?: any;
};

const InputField: React.FC<InputField> = ({ form, name, label, disabled }) => {
  const { errors } = form.formState;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          // de show error
          error={!!hasError}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};

export default InputField;
