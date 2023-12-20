import React from "react";
import { Link } from "react-router-dom";

const UnauthorizeToken = ({ children }) => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-xl md:text-5xl font-bold text-red-700">
        Unauthorize Token
      </h1>
      <Link
        to="/"
        className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer"
      >
        Move to home page
      </Link>
    </section>
  );
};

export default UnauthorizeToken;
