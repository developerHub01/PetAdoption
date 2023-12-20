import React, { useContext } from "react";
import { AuthContext } from "../customProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  if (userLoading) <Loader />;
  if (userLoading || user) return children;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
