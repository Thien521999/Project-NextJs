import React, { useEffect } from "react";
import { Storekeys } from "../constants/Login";
import jwt_decode from "jwt-decode";
import router from "next/router";
import { useSelector } from "react-redux";

type userToken = {
  id: string;
  email: string;
};

const useNotAuthentication = () => {
  const token = useSelector((state: any) => state.user?.current?.token);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return <></>;
};

export default useNotAuthentication;
