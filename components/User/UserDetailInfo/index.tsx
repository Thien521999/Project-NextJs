// libs
import React, { useContext } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { LanguageContext } from "../../../context/LanguageContext";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 0 15px 0",
    width: "100%",
  },
  media: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 140,
  },
  avatar: {
    margin: "10px auto",
    width: "150px",
    height: "150px",
  },
  name: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "4px 10px",
  },
}));

type PropsType = {
  userDetailInfo: any;
  postCount: number;
};

const UserDetailInfo: React.FC<PropsType> = ({ userDetailInfo, postCount }) => {
  const classes = useStyles();

  const currentUser = useSelector((state: any) => state.user.current?.user);

  const { defaultLanguage } = useContext(LanguageContext);

  if (!userDetailInfo) return null;

  const isCheck = currentUser?.USERID === userDetailInfo?.USERID;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia className={classes.media} image="/images/cat-1634369_1920.jpg" title="Contemplative Reptile" /> */}
        <Avatar
          className={classes.avatar}
          alt={userDetailInfo.fullname}
          src={userDetailInfo.profilepicture || "/images/cat-1634369_1920.jpg"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
            {userDetailInfo.fullname}
          </Typography>
          <Box component="div" className={classes.info}>
            <div className="icon">
              <PostAddIcon />
              <span>
                {defaultLanguage.Posts}: {postCount}
              </span>
            </div>
            <div className="icon">
              <PersonAddOutlinedIcon />
              <span>
                {defaultLanguage.Follow}: {userDetailInfo?.yourviewed}
              </span>
            </div>
            <div className="icon">
              <PersonOutlineOutlinedIcon />
              <span>
                {defaultLanguage.Followed}: {userDetailInfo?.youviewed}
              </span>
            </div>
          </Box>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {userDetailInfo.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        {isCheck ? (
          <>
            <Link href="/users/password" passHref>
              <Button variant="outlined" size="small" color="primary">
                {defaultLanguage.Change_password}
              </Button>
            </Link>
            <Link href="/users/profile" passHref>
              <Button variant="outlined" size="small" color="primary">
                {defaultLanguage.Profile}
              </Button>
            </Link>
          </>
        ) : (
          <Button variant="outlined" size="small" color="primary">
            Follow
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default UserDetailInfo;
