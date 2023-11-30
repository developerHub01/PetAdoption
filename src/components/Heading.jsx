import React from "react";

const Heading = ({ heading, description, className, theme = "light" }) => {
  return (
    <div
      className={`text-center flex flex-col gap-2 justify-center place-items-center ${className}`}
    >
      <h2
        className={`text-3xl font-semibold border-b-4 border-gray-200 p-2 ${
          theme === "light" ? "text-primaryColor" : "text-white"
        }`}
      >
        {heading}
      </h2>
      <p className={`text-base ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
        {description}
      </p>
    </div>
  );
};

export default Heading;
