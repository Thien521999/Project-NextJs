// libs
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Link from "next/link";
import React from "react";

const Upload = () => {
  return (
    <Link href="/posts/create">
      <a style={{ color: "#fff" }}>
        <Button variant="contained" color="primary" startIcon={<CloudUploadIcon style={{ color: "#fff" }} />}>
          Upload
        </Button>
      </a>
    </Link>
  );
};

export default Upload;
