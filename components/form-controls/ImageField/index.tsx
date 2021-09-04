// libs
import { Avatar } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

type ImageFieldProps = {
  form: any;
  name: any;
  user?: any;
  avatarUrl: any;
  handleChooseFile: any;
  className?: any;
};

const ImageField: React.FC<ImageFieldProps> = ({ form, name, user, avatarUrl, handleChooseFile, className }) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Avatar {...field} onClick={handleChooseFile} alt={user.fullname} src={avatarUrl} className={className} />
      )}
    />
  );
};

export default ImageField;
