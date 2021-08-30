// libs
import { Box, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// others
import { logout } from "../../../Auth/userSlice";

const UserInformation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [anchorEL, setAnchorEL] = useState(null);

  const currentUser = useSelector((state: any) => state?.user?.current?.user);
  const loggedInUser = useSelector((state: any) => state?.user?.current?.user);

  //neu có id tức là đã đăng nhập và nguoc lai
  const isLoggedIn = !!loggedInUser?.USERID;

  const handleClickOpen = () => {
    router.push("/login");
  };

  const handleUserClick = (e) => {
    setAnchorEL(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEL(null);
    router.push(`/users/${currentUser?.USERID}`);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEL(null);
    router.push("/login");
  };

  return (
    <div className="wrapper-user">
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
        <>
          <Typography>
            <Link href="/users/[userId]" as={`/users/${currentUser?.USERID}`}>
              {currentUser?.fullname}
            </Link>
          </Typography>
          <IconButton color="inherit" onClick={handleUserClick}>
            <AccountCircle />
          </IconButton>
        </>
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
        style={{ top: "20px" }}
      >
        {/* <Link href="/users/[userId]" as={`/users/${currentUser?.USERID}`} passHref> */}
        <MenuItem onClick={handleCloseMenu}>MY ACCOUNT</MenuItem>
        {/* </Link> */}
        <MenuItem onClick={handleLogoutClick}>LOGOUT</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInformation;
