import React, { useContext } from "react";
import { serverApi } from "../constant/constant";
import { AuthContext } from "../customProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../AxiosInstance/useAxiosPrivate";

const useFetchCartList = (email) => {
  const privateAxios = useAxiosPrivate();
  const response = useQuery({
    queryKey: ["cart", email],
    queryFn: () => privateAxios.get(`/donate/${email}`).then((res) => res.data),
  });
  return response;
};

export default useFetchCartList;
