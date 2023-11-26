import React, { useContext } from "react";
import { AuthContext } from "../customProvider/AuthProvider";

const Home = () => {
  const data = useContext(AuthContext);
  console.log(data);
  return <div>home</div>;
};

export default Home;
