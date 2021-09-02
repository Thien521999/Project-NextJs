// libs
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
  CssBaseline,
  Paper,
  Box,
} from "@material-ui/core";
import Link from "next/link";
import { LockOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// components
import InputField from "../../../form-controls/InputField";
import PasswordField from "../../../form-controls/PasswordField";
import { LanguageContext } from "../../../../context/LanguageContext";

const useStyles = makeStyles((theme) => ({
  roots: {
    height: "100vh",
    width: "100%",
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0), //tren phai duoi trai
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit }) {
  const classes = useStyles();

  const { defaultLanguage } = useContext(LanguageContext);

  const schema = yup.object().shape({
    email: yup.string().required("Please enter your email").email("Please enter a valid email address."),
    password: yup.string().required("Please enter your password"),
  });

  const form = useForm({
    defaultValues: {
      email: "", //cần liệt kê tất cả các field ở đây nếu không nó sẽ xãy ra TH không hiểu or  UnControl
      password: "", //cần liệt kê tất cả các field ở đây nếu không nó sẽ xãy ra TH không hiểu or  UnControl
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    // console.log("TODO FORM: ", values);
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Grid container component="main" className={classes.roots}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {isSubmitting && <LinearProgress className={classes.progress} />}{" "}{/*dang submitting thi show linearProgress*/}
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {defaultLanguage.SIGN_IN}
          </Typography>
          <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="Password" form={form} />

            <Button
              disabled={isSubmitting}
              type="submit"
              className={classes.submit}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              {defaultLanguage.SIGN_IN}
            </Button>
          </form>
          <Link href="/register" passHref>
            <Box textAlign="center">
              <Button color="primary">{defaultLanguage.Do_not_have_an_account_Register_here}.</Button>
            </Box>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
