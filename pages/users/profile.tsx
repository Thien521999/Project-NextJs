// libs
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Profile</p>
        <div className="ass1-login__form">
          <div className="avatar">
            <Image
              src="/images/avatar-02.png"
              alt=""
              width="100"
              height="100"
            />
          </div>
          <form action="#">
            <input
              type="text"
              className="form-control"
              placeholder="Tên ..."
              required
            />
            <select className="form-control">
              <option value="">Giới tính</option>
              <option value={1}>Nam</option>
              <option value={0}>Nữ</option>
            </select>
            <input
              type="file"
              name="avatar"
              placeholder="Ảnh đại diện"
              className="form-control"
            />
            <textarea
              className="form-control"
              cols={30}
              rows={5}
              placeholder="Mô tả ngắn ..."
              defaultValue={""}
            />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
