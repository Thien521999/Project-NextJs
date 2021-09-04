// // libs
// import { Avatar, Button, makeStyles } from "@material-ui/core";
// import Image from "next/image";
// import Link from "next/link";
// import { useSnackbar } from "notistack";
// import React, { useContext, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { LanguageContext } from "../../../context/LanguageContext";
// import InputField from "../../form-controls/InputField";
// import TextAreaField from "../../form-controls/TextAreaField";

// const useStyles = makeStyles((theme) => ({
//   input: {
//     display: "none",
//   },
// }));

// type PropsType = {
//   url_image: string;
//   post_content: string;
//   obj_image: {
//     base64: string;
//     file: File | null;
//   };
//   onChangeDetailForm: (key: string, value: any) => void;
// };

// const PostDetailForm: React.FC<PropsType> = ({ url_image, post_content, obj_image, onChangeDetailForm }) => {
//   const classes = useStyles();
//   const inputFileEl = useRef(null);
//   const { enqueueSnackbar } = useSnackbar();

//   const { defaultLanguage } = useContext(LanguageContext);

//   const handleOnChange = (key: string) => (e) => {
//     const value = e.target.value;
//     onChangeDetailForm(key, value);
//   };

//   const [objFile, setObjFile] = useState({
//     file: "null",
//     base64: "",
//   });

//   const handleChangeFile = (e: any) => {
//     const listFiles = e.target.files;
//     if (listFiles.length === 0) return;
//     const file = listFiles[0];

//     if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
//       const reader = new FileReader();
//       reader.addEventListener(
//         "load",
//         function () {
//           // convert image file to base64 string
//           // console.log("base-64", reader.result);
//           onChangeDetailForm("obj_image", { file, base64: reader.result as string });
//         },
//         false
//       );
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     } else {
//       enqueueSnackbar("Invalid File ", { variant: "error" });
//     }
//   };

//   const imageUrl = url_image || obj_image.base64 || "/images/no_image_available.jpg";

//   // react-hook-form

//   const form = useForm({
//     defaultValues: {
//       url_image,
//       description: post_content,
//     },
//   });

//   const handleSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="ass1-section ass1-section__edit-post">
//       <div className="ass1-section__content">
//         <form onSubmit={form.handleSubmit(handleSubmit)}>
//           <div className="form-group">
//             <InputField name="url_image" label="https://" form={form} />
//           </div>
//           <div className="form-group">
//             <TextAreaField name="description" form={form} />
//           </div>
//           <div className="ass1-section__image">
//             <a>
//               <Avatar style={{ width: "100%", height: "100%" }} variant="square" alt="Image" src={imageUrl} />
//             </a>
//           </div>
//           <Link href="https://memeful.com/" passHref>
//             <Button variant="contained" color="primary" component="span" style={{ marginTop: "5px" }}>
//               <a target="_blank">{defaultLanguage.Post_photos_from_meme}</a>
//             </Button>
//           </Link>
//           <input
//             accept="image/*"
//             className={classes.input}
//             id="contained-button-file"
//             multiple
//             type="file"
//             onChange={handleChangeFile}
//           />
//           <label htmlFor="contained-button-file">
//             <Button variant="contained" color="primary" component="span" style={{ margin: "5px 0 0 6px" }}>
//               {defaultLanguage.Post_pictures_from_the_computer}
//             </Button>
//           </label>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostDetailForm;

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
        <form>
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
