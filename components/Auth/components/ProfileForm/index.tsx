// libs
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, Container, CssBaseline, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
// components
import InputField from "../../../form-controls/InputField";
import PasswordField from "../../../form-controls/PasswordField";
import { useSelector } from "react-redux";
import SelectField from "../../../form-controls/SelectField";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
}));

type PropsType = {
  onSubmit: any;
};

export type valueType = {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
};

const ProfileForm: React.FC<PropsType> = ({ onSubmit }) => {
  const classes = useStyles();
  const currentUser = useSelector((state: any) => state?.user?.current?.user);

  const schema = yup.object().shape({
    oldPassword: yup.string().required("Please enter your password old"),
    newPassword: yup.string().required("Please enter your password new").min(6, "Please enter at least 6 characters"),
    reNewPassword: yup
      .string()
      .required("Please enter your reNewPassword")
      .oneOf([yup.ref("newPassword")], "Password new does not match"),
  });

  const form = useForm({
    defaultValues: {
      fullname: "",
      oldPassword: "", //
      newPassword: "", //cần liệt kê tất cả các field ở đây nếu không nó sẽ xãy ra TH không hiểu or UnControl
      reNewPassword: "", //
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values: valueType) => {
    // console.log("TODO FORM: ", values);
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  //isSubmitting trong formState(react-hook-form)
  const { isSubmitting } = form.formState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/*đang submitting thi show linearProgress*/}
        {isSubmitting && <LinearProgress className={classes.progress} />}
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box component="div">
          <Image src={currentUser.profilepicture || "/images/avatar-02.png"} alt="" width="100" height="100" />
        </Box>

        {/* form.handleSubmit la cua thang form, handleSubmit la cua minh viet */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="fullname" label="Full name" form={form} />
          <SelectField name="gender" form={form} />
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
          <PasswordField name="newPassword" label="Password new" form={form} />
          <PasswordField name="reNewPassword" label="Confirm new password" form={form} />

          {/* Trong luc submit disable cái nút đi. */}
          <Button
            disabled={isSubmitting}
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Submit
          </Button>
        </form>
        <Link href="/" passHref>
          <Box textAlign="center">
            <Button color="primary">Back to homepage</Button>
          </Box>
        </Link>
      </div>
    </Container>
  );
};

export default ProfileForm;
