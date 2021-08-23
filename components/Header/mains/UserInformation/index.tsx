// libs
import { Box, Button, IconButton, Link, MenuItem, Menu } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../../Auth/userSlice";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  dialog: {
    top: theme.spacing(2),
  },
}));

const UserInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [anchorEL, setAnchorEL] = useState(null);

  const loggedInUser = useSelector((state: any) => state?.user?.current?.user);
  // console.log(loggedInUser);

  const isLoggedIn = !!loggedInUser?.USERID; //neu có id tức là đã đănng nhập và nguoc lai

  const handleClickOpen = () => {
    router.push("/login");
  };

  const handleUserClick = (e) => {
    setAnchorEL(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEL(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEL(null);
    router.push("/login");
  };

  return (
    <div className="wrapper-user">
      {/* {isLoggedIn && (
        <a className="user-header">
          <span className="avatar">
            <Image
              src="/images/avatar-02.png"
              alt="avatar"
              width="20"
              height="20"
            />
          </span>
          <span className="email">{loggedInUser.email}</span>
        </a>
      )} */}

      {/* <div className="logout">Logout</div> */}
      {/* {!isLoggedIn && (
        <Link href="/login">
          <a className="ass1-header__btn-upload ass1-btn">Login</a>
        </Link>
      )} */}

      {/* Chưa đăng nhập */}
      {!isLoggedIn && (
        <Box component="span" className="icon-login">
          <Button color="inherit" onClick={handleClickOpen}>
            LOGIN
          </Button>
        </Box>
      )}

      {/*show Icon đã đăng nhập */}
      {isLoggedIn && (
        <IconButton color="inherit" onClick={handleUserClick}>
          <AccountCircle />
        </IconButton>
      )}

      {/* dialog - log out - My Account */}
      <Menu
        id="demo-positioned-menu"
        keepMounted
        anchorEl={anchorEL}
        open={Boolean(anchorEL)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom", //theo chieu doc
          horizontal: "right", //nam ngang
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
        className={classes.dialog}
      >
        <MenuItem onClick={handleCloseMenu}>MY ACCOUNT</MenuItem>
        <MenuItem onClick={handleLogoutClick}>LOGOUT</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInformation;
