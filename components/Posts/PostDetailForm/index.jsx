import Image from "next/image";
import Link from 'next/link'
import React from "react";

const PostDetailForm = () => {
    return (
        <div className="ass1-section ass1-section__edit-post">
            <div className="ass1-section__content">
                <form action="#">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control ttg-border-none"
                            placeholder="https://"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control ttg-border-none"
                            placeholder="Mô tả ..."
                            defaultValue={""}
                        />
                    </div>
                </form>
                <div className="ass1-section__image">
                    <a href="#">
                        <Image src="/images/no_image_available.jpg" alt="default" width={700} height={600} />
                    </a>
                </div>
                <Link href="https://memeful.com/">
                    <a className="ass1-btn ass1-btn-meme" target="_blank">Chế ảnh từ meme</a>
                </Link >
                <a href="#" className="ass1-btn ass1-btn-meme">
                    Đăng ảnh từ máy tính
                </a>
            </div>
        </div>
    );
};

export default PostDetailForm;
