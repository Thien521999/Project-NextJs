// libs
import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";

const Upload = () => {
  const { defaultLanguage } = useContext(LanguageContext);
  return (
    <Button color="inherit">
      <Link href="/posts/create" passHref>
        <span style={{ color: "#fff" }}>{defaultLanguage.UPLOAD}</span>
      </Link>
    </Button>
  );
};

export default Upload;
