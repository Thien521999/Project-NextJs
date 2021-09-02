// libs
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, Container, CssBaseline, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
// components
import InputField from "../../../form-controls/InputField";
import PasswordField from "../../../form-controls/PasswordField";
import { LanguageContext } from "../../../../context/LanguageContext";

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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required("Please enter your full name") // nhung dinh nghia(rule) co san
      .test("should has at least two words", "Please enter at least two words", (value) => {
        return value.split(" ").length >= 2;
      }), //nhung custom rule do mình tu DN ra
    email: yup.string().required("Please enter your email").email("Please enter a valid email address."),
    password: yup.string().required("Please enter your password").min(6, "Please enter at least 6 characters"),
    repassword: yup
      .string()
      .required("Please enter your reTypePassword")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  const form = useForm({
    defaultValues: {
      fullname: "", //
      email: "", //cần liệt kê tất cả các field ở đây nếu không nó sẽ xãy ra TH không hiểu or  UnControl
      password: "", //
      repassword: "", //
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    //console.log('TODO FORM: ', values);
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  //isSubmitting trong formState(react-hook-form)
  const { isSubmitting } = form.formState;

  const { defaultLanguage } = useContext(LanguageContext);

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
          {defaultLanguage.SIGN_UP}
        </Typography>

        {/* form.handleSubmit la cua thang form, handleSubmit la cua minh viet */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="fullname" label="Full Name" form={form} />
          <InputField name="email" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <PasswordField name="repassword" label="Retype Password" form={form} />

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
            {defaultLanguage.Create_an_account}
          </Button>
        </form>
        <Link href="/login" passHref>
          <Box textAlign="center">
            <Button color="primary">{defaultLanguage.Already_have_an_account_Sign_in}</Button>
          </Box>
        </Link>
      </div>
    </Container>
  );
}

export default RegisterForm;
