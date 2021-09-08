// libs
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const PostListItemSkeleton = ({ length }) => {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <div key={index}>
          <div className="ass1-section">
            <div className="ass1-section__head">
              <Skeleton variant="circle" height={70} width={70} />
              <div>
                <Skeleton variant="text" height={35} width={100} />
                <Skeleton variant="text" height={35} width={150} />
              </div>
            </div>
            <div className="ass1-section__content">
              <Skeleton variant="text" height={40} />
              <div className="ass1-section__image">
                <Skeleton variant="rect" width={670} height={500} />
              </div>
            </div>
            <div className="ass1-section__footer">
              <Skeleton variant="text" height={40} width={30} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostListItemSkeleton;
