// libs
import { Avatar } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React, { useContext, useRef, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

type PropsType = {
  url_image: string;
  post_content: string;
  obj_image: {
    base64: string;
    file: File | null;
  };
  onChangeDetailForm: (key: string, value: any) => void;
};

const PostDetailForm: React.FC<PropsType> = ({ url_image, post_content, obj_image, onChangeDetailForm }) => {
  const inputFileEl = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const { defaultLanguage } = useContext(LanguageContext);

  const handleOnChange = (key: string) => (e) => {
    const value = e.target.value;
    onChangeDetailForm(key, value);
  };

  const [objFile, setObjFile] = useState({
    file: "null",
    base64: "",
  });

  const handleChooseFile = () => {
    inputFileEl.current.click();
  };

  const handleChangeFile = (e: any) => {
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0];

    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          // console.log("base-64", reader.result);
          onChangeDetailForm("obj_image", { file, base64: reader.result as string });
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

  const imageUrl = url_image || obj_image.base64 || "/images/no_image_available.jpg";

  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group">
            <input
              value={url_image}
              onChange={handleOnChange("url_image")}
              type="text"
              className="form-control ttg-border-none"
              placeholder="https://"
            />
          </div>
          <div className="form-group">
            <textarea
              value={post_content}
              onChange={handleOnChange("post_content")}
              className="form-control ttg-border-none"
              placeholder={`${defaultLanguage.Description}...`}
              required
            />
          </div>
        </form>
        <input ref={inputFileEl} onChange={handleChangeFile} style={{ display: "none" }} type="file" />
        <div className="ass1-section__image">
          <a>
            <Avatar style={{ width: "100%", height: "100%" }} variant="square" alt="Image" src={imageUrl} />
          </a>
        </div>
        <Link href="https://memeful.com/">
          <a className="ass1-btn ass1-btn-meme" target="_blank">
            {defaultLanguage.Post_photos_from_meme}
          </a>
        </Link>
        <button onClick={handleChooseFile} className="ass1-btn ass1-btn-meme">
          {defaultLanguage.Post_pictures_from_the_computer}
        </button>
      </div>
    </div>
  );
};

export default PostDetailForm;
