import React, { useContext } from "react";
import { serverApi } from "../constant/constant";
import axios from "axios";
import { AuthContext } from "../customProvider/AuthProvider";
import Loader from "../components/Loader";
const useAxiosAdmin = (token) => {
  const { user, userLoading } = useContext(AuthContext);
  if (userLoading) return <Loader />;
  if (!user) return;
  const instance = axios.create({
    baseURL: serverApi,
    headers: {
      token: token || localStorage.getItem("token"),
      email: user?.email,
    },
  });
  return instance;
};

export default useAxiosAdmin;
