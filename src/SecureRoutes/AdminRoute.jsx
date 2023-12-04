import React, { useContext } from "react";
import useAxiosAdmin from "../AxiosInstance/useAxiosAdmin";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../customProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigator = useNavigate();
  const axiosAdmin = useAxiosAdmin(localStorage.getItem("token"));
  if (!user) return <Navigate to="/login" replace={true} />;
  const { isLoading, error, data } = useQuery({
    queryKey: ["adminCheck"],
    queryFn: () =>
      axiosAdmin
        .get("/adminCheck")
        .then((res) => res.data)
        .catch((error) => {
          return error;
        }),
  });
  if (isLoading) return <Loader />;
  return children;
};

export default AdminRoute;
