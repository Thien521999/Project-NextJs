// libs
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, Container, CssBaseline, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// components
import PasswordField from "../../../form-controls/PasswordField";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffff",
    borderRadius: "6px",
    boxShadow: "0px 2px 6px -2px rgb(0 0 0 / 10%)",
  },
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

const ChangePasswordForm: React.FC<PropsType> = ({ onSubmit }) => {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        {/*đang submitting thi show linearProgress*/}
        {isSubmitting && <LinearProgress className={classes.progress} />}
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h2" variant="h5">
          CHANGE PASSWORD
        </Typography>

        {/* form.handleSubmit la cua thang form, handleSubmit la cua minh viet */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <PasswordField name="oldPassword" label="Password old" form={form} />
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
            <Button color="primary">Back to home page</Button>
          </Box>
        </Link>
      </div>
    </Container>
  );
};

export default ChangePasswordForm;
