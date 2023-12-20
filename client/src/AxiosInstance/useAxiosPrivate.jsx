import React from "react";
import { serverApi } from "../constant/constant";
import axios from "axios";
const useAxiosPrivate = () => {
  const instance = axios.create({
    baseURL: serverApi,
  });
  return instance;
};

export default useAxiosPrivate;
