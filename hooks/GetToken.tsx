import React from "react";
import { useSelector } from "react-redux";

const GetToken = () => {
  const token = useSelector((state: any) => state.user.current?.token);
  return <></>;
};

export default GetToken;
