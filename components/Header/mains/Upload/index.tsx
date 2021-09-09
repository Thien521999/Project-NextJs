// libs
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";

const Upload = () => {
  const router = useRouter();

  const { defaultLanguage } = useContext(LanguageContext);
  const handleClickUpload = () => {
    router.push("/posts/create");
  };
  return (
    <Button color="inherit" onClick={handleClickUpload}>
      <span>{defaultLanguage.UPLOAD}</span>
    </Button>
  );
};

export default Upload;
