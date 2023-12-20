import React, { useContext } from "react";
import { AuthContext } from "../customProvider/AuthProvider";
import Loader from "../components/Loader";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Loader />;
  return (
    <section className="w-full h-full p-5 grid place-items-center text-4xl font-extrabold text-center text-primaryColor leading-relaxed">
      Welcome {user?.displayName}
    </section>
  );
};

export default DashboardHome;
