// libs
import { Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

const TitleHeader = () => {
  return (
    <Link href="/" passHref>
      <Typography variant="h5" component="h4" color="primary" style={{ cursor: "pointer" }}>
        SocialNet
      </Typography>
    </Link>
  );
};

export default TitleHeader;
