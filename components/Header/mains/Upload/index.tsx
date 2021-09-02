// libs
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Link from "next/link";
import React, { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";

const Upload = () => {
  const { defaultLanguage } = useContext(LanguageContext);
  return (
    <Link href="/posts/create" passHref>
      <Button variant="contained" color="primary" startIcon={<CloudUploadIcon style={{ color: "#fff" }} />}>
        <span style={{ color: "#fff" }}>{defaultLanguage.UPLOAD}</span>
      </Button>
    </Link>
  );
};

export default Upload;
