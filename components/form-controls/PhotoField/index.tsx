// libs
import React, { useContext, useRef } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@material-ui/core";
import { LanguageContext } from "../../../context/LanguageContext";
import Link from "next/link";
import { useSnackbar } from "notistack";

type PhotoFieldProps = {
  form: any;
  name: string;
  disabled?: boolean;
};

const PhotoField: React.FC<PhotoFieldProps> = ({ form, name, disabled }) => {
  // const { errors, watch, formState } = form;

  const { defaultLanguage } = useContext(LanguageContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files.length > 0 ? e.target.files[0] : null;
    if (!selectedFile) return;

    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(selectedFile.type)) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        form.setValue(name, { file: selectedFile, base64: reader.result as string });
      });
      reader.readAsDataURL(selectedFile);
    } else {
      enqueueSnackbar("Invalid File ", { variant: "error" });
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "10px", alignItems: "center", justifyContent: "center" }}>
      {/* <Link href="https://memeful.com/" passHref>
        <Button variant="contained" color="primary" component="span" style={{ marginTop: "5px" }}>
          <a target="_blank">{defaultLanguage.Post_photos_from_meme}</a>
        </Button>
      </Link> */}
      <Controller
        name={name}
        control={form.control}
        render={() => (
          <input
            hidden
            id="contained-button-file"
            type="file"
            name={name}
            accept="image/*"
            multiple
            disabled={disabled}
            onChange={handleFileChange}
          />
        )}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" style={{ backgroundColor: "#03DAC5" }}>
          {defaultLanguage.Post_pictures_from_the_computer}
        </Button>
      </label>
    </div>
  );
};

export default PhotoField;
