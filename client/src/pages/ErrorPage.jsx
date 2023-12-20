import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="w-full min-h-screen p-5 grid place-content-center gap-5 text-center">
      <h2 className="text-4xl font-black text-primaryColor uppercase">
        404 Page not found
      </h2>
      <Link
        to="/"
        className="inline-block capitalize py-2 px-5 bg-primaryColor text-white rounded-md shadow-lg"
      >
        Go To home Page
      </Link>
    </section>
  );
};

export default ErrorPage;
