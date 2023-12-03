import React from "react";
import { serverApi } from "../constant/constant";
import axios from "axios";
const useAxiosAdmin = (token) => {
  const instance = axios.create({
    baseURL: serverApi,
    headers: {
      token: token || localStorage.getItem("token"),
    },
  });
  return instance;
};

export default useAxiosAdmin;
