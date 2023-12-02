import React from "react";
import { serverApi } from "../constant/constant";
const instance = axios.create({
  baseURL: serverApi,
});
const useAxiosPrivate = () => {
  return [instance];
};

export default useAxiosPrivate;
