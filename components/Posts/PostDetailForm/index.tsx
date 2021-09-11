// libs
import { Avatar, Button, makeStyles } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// context
import { LanguageContext } from "../../../context/LanguageContext";
// components
import CheckboxField from "../../form-controls/CheckboxField";
import InputField from "../../form-controls/InputField";
import PhotoField from "../../form-controls/PhotoField";
import TextAreaField from "../../form-controls/TextAreaField";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  text: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    fontSize: "22px",
    color: "#000",
    // fontWeight: "400",
  },
}));

type PropsType = {
  url_image?: string;
  post_content: string;
  obj_image: {
    file: File | null;
    base64: string;
  };
  category: string[];
  onChangeCategory: (a: string[]) => void;
  onSubmit: (a: any) => void;
};

const PostDetailForm: React.FC<PropsType> = ({
  url_image,
  post_content,
  obj_image,
  category,
  onChangeCategory,
  onSubmit,
}) => {
  const classes = useStyles();

  const listCategory = useSelector((state: any) => state.category.dataCategory);

  const schema = yup.object().shape({
    url_image: yup.string().required("Please enter your url_mage"),
    post_content: yup.string().required("Please enter your description"),
  });

  const imageUrl = url_image || obj_image.base64 || "/images/no_image_available.jpg";

  const { defaultLanguage } = useContext(LanguageContext);

  const form = useForm({
    defaultValues: {
      url_image,
      post_content,
      category,
      obj_image,

      // url_image,
      // post_content,
      // category: [],
      // obj_image: {
      //   base64: "",
      //   file: null,
      // },
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <div className="ass1-section ass1-section__edit-post">
            <div className="ass1-section__content">
              <div className="form-group">
                <InputField name="url_image" label="https://" form={form} defaultValue={url_image} />
              </div>
              <div className="form-group">
                <TextAreaField name="post_content" form={form} />
              </div>
              <div className="ass1-section__image">
                <a>
                  <Avatar style={{ width: "100%", height: "100%" }} variant="square" alt="Image" src={imageUrl} />
                </a>
              </div>
              <PhotoField name="obj_image" form={form} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <aside className="ass1-aside ass1-aside__edit-post">
            <div className="ass1-aside__edit-post-head">
              <span className={classes.text}>{defaultLanguage.Choose_category}</span>
              {listCategory.map((cate) => (
                <label className="ass1-checkbox" key={cate.id}>
                  <CheckboxField
                    name="category"
                    form={form}
                    category={category}
                    cate={cate}
                    onChangeCategory={onChangeCategory}
                  />
                  <span />
                  <p>{cate.text}</p>
                </label>
              ))}
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                // size="large"
                style={{ backgroundColor: "#03DAC5" }}
              >
                {defaultLanguage.Post}
              </Button>
            </div>

            <div className="ass1-aside__get-code">
              <p>{defaultLanguage.Share_link}</p>
            </div>
            <div className="ass1-aside__social">
              <Link href="https://www.facebook.com/">
                <a className=" ass1-btn-social">
                  <FacebookIcon />
                </a>
              </Link>
              <Link href="https://twitter.com/">
                <a className=" ass1-btn-social">
                  <TwitterIcon />
                </a>
              </Link>
              <Link href="https://translate.google.com/">
                <a className=" ass1-btn-social">
                  <GTranslateIcon />
                </a>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
};

export default PostDetailForm;

// // libs
// import { Avatar } from "@material-ui/core";
// import Image from "next/image";
// import Link from "next/link";
// import { useSnackbar } from "notistack";
// import React, { useContext, useRef, useState } from "react";
// import { LanguageContext } from "../../../context/LanguageContext";

// type PropsType = {
//   url_image: string;
//   post_content: string;
//   obj_image: {
//     file: File | null;
//     base64: string;
//   };
//   onChangeDetailForm: (key: string, value: any) => void;
// };

// const PostDetailForm: React.FC<PropsType> = ({ url_image, post_content, obj_image, onChangeDetailForm }) => {
//   const inputFileEl = useRef(null);
//   const { enqueueSnackbar } = useSnackbar();

//   const { defaultLanguage } = useContext(LanguageContext);

//   const handleOnChange = (key: string) => (e) => {
//     const value = e.target.value;
//     console.log(value);

//     onChangeDetailForm(key, value);
//   };

//   // const [objFile, setObjFile] = useState({
//   //   file: "null",
//   //   base64: "",
//   // });

//   const handleChooseFile = () => {
//     inputFileEl.current.click();
//   };

//   const handleChangeFile = (e: any) => {
//     const listFiles = e.target.files;
//     if (listFiles.length === 0) return;
//     const file = listFiles[0];

//     console.log(listFiles);
//     console.log(file);

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

//   console.log(obj_image.base64);

//   const imageUrl = url_image || obj_image.base64 || "/images/no_image_available.jpg";

//   return (
//     <div className="ass1-section ass1-section__edit-post">
//       <div className="ass1-section__content">
//         <form>
//           <div className="form-group">
//             <input
//               value={url_image}
//               onChange={handleOnChange("url_image")}
//               type="text"
//               className="form-control ttg-border-none"
//               placeholder="https://"
//             />
//           </div>
//           <div className="form-group">
//             <textarea
//               value={post_content}
//               onChange={handleOnChange("post_content")}
//               className="form-control ttg-border-none"
//               placeholder={`${defaultLanguage.Description}...`}
//               required
//             />
//           </div>
//         </form>
//         <input ref={inputFileEl} onChange={handleChangeFile} style={{ display: "none" }} type="file" />
//         <div className="ass1-section__image">
//           <a>
//             <Avatar style={{ width: "100%", height: "100%" }} variant="square" alt="Image" src={imageUrl} />
//           </a>
//         </div>
//         <Link href="https://memeful.com/">
//           <a className="ass1-btn ass1-btn-meme" target="_blank">
//             {defaultLanguage.Post_photos_from_meme}
//           </a>
//         </Link>
//         <button onClick={handleChooseFile} className="ass1-btn ass1-btn-meme">
//           {defaultLanguage.Post_pictures_from_the_computer}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostDetailForm;
