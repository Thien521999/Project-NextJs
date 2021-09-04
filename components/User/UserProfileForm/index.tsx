// libs
import { Avatar, Box, Button, Container, CssBaseline, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ImageField from "../../form-controls/ImageField";
import InputField from "../../form-controls/InputField";
import SelectField from "../../form-controls/SelectField";
import TextAreaField from "../../form-controls/TextAreaField";
// others
import { LanguageContext } from "../../../context/LanguageContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffff",
    borderRadius: "6px",
    boxShadow: "0px 2px 6px -2px rgb(0 0 0 / 10%)",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(8, 4),
    padding: theme.spacing(6, 0),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  avatarImage: {
    display: "flex",
    margin: "auto",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const UserProfileForm = ({ onSubmit }) => {
  const classes = useStyles();
  const inputFileEl = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  // const { defaultLanguage } = useContext(LanguageContext);

  const currentUser = useSelector((state: any) => state?.user?.current?.user);

  const [user, setUser] = useState(currentUser);

  const [objFile, setObjFile] = useState({
    file: "null",
    base64URL: "",
  });

  const handleChooseFile = () => {
    inputFileEl.current.click();
  };

  const handleChangeFile = (e) => {
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0];

    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          console.log("base-64", reader.result);
          setObjFile({
            file,
            base64URL: reader.result as string,
          });
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      enqueueSnackbar("Invalid File ", { variant: "error" });
    }
  };

  const avatarUrl = objFile.base64URL || user?.profilepicture || "/images/avatar-02.png";

  const schema = yup.object().shape({
    fullname: yup.string().required("Please enter your full name"),
  });
  const form = useForm({
    defaultValues: {
      avatar: objFile.file,
      fullname: user?.fullname,
      gender: user?.gender,
      description: user?.description,
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: any) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        {/*đang submitting thi show linearProgress*/}
        {isSubmitting && <LinearProgress className={classes.progress} />}
        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        {/* form.handleSubmit la cua thang form, handleSubmit la cua minh viet */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <ImageField
            handleChooseFile={handleChooseFile}
            name="avatar"
            className={classes.avatarImage}
            user={user}
            avatarUrl={avatarUrl}
            form={form}
          />
          <InputField name="fullname" label="Full name" form={form} />
          <SelectField name="gender" form={form} />
          <TextAreaField name="description" form={form} />
          <input
            ref={inputFileEl}
            onChange={handleChangeFile}
            style={{ display: "none" }}
            type="file"
            name="avatar"
            placeholder="Ảnh đại diện"
            className="form-control"
          />

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

export default UserProfileForm;
