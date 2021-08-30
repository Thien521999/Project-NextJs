// libs
import React, { useRef, useState } from "react";
import { PostType } from "../../../pages";
import DoneIcon from "@material-ui/icons/Done";
import { useSnackbar } from "notistack";

type PropsType = {
  detailPost: PostType;
  handleSubmitForm: (v: string) => void;
};

const PostCommentForm: React.FC<PropsType> = ({ detailPost, handleSubmitForm }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [commentValue, setCommentValue] = useState("");
  const [valueInput, setValueInput] = useState("");

  const typingTimeoutRef = useRef(null);

  const handleChangeComment = (e) => {
    if (e.target.value.length <= 180) {
      setCommentValue(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentValue.trim().length !== 0) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        handleSubmitForm(commentValue);
      }, 1000);
    } else {
      enqueueSnackbar("Vui long nhap noi dung binh luan", { variant: "error" });
    }
  };

  return (
    <div className="ass1-add-comment">
      <form>
        <input
          onChange={handleChangeComment}
          type="text"
          className="form-control ttg-border-none"
          placeholder="Thêm một bình luận"
        />
      </form>
      <div className="ass1-add-comment__content">
        <a className="ass1-add-comment__btn-save ass1-btn-icon">
          <span>{180 - commentValue.length}</span>
          <DoneIcon onClick={handleSubmit} />
        </a>
      </div>
    </div>
  );
};

export default PostCommentForm;
