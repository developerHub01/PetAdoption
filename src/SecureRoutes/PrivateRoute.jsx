import React, { useContext } from "react";
import { AuthContext } from "../customProvider/AuthProvider";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!user) return <Navigate to="/login" replace={true} />;
  return children;
};

export default PrivateRoute;
