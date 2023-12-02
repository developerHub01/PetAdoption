import React from "react";
import { serverApi } from "../constant/constant";
const instance = axios.create({
  baseURL: serverApi,
});
const useAxiosAdmin = () => {
  return [instance];
};

export default useAxiosAdmin;
