// libs
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
// components
import PostListItemSkeletonHomeSideBar from "../PostListItemSkeletonHomeSideBar";

const HomeSideBarSkeleton = ({ length }) => {
  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <Skeleton variant="text" height={40} width={260} />
      </div>
      <PostListItemSkeletonHomeSideBar length={2} />
    </aside>
  );
};

export default HomeSideBarSkeleton;
