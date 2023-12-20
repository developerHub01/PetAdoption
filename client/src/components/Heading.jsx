import React from "react";

const Heading = ({ heading, description, className, theme = "light" }) => {
  return (
    <div
      className={`text-center flex flex-col gap-2 justify-center place-items-center ${className}`}
    >
      <h2
        className={`text-3xl font-bold border-b-4 p-2 ${
          theme === "light"
            ? "text-primaryColor border-primaryColor"
            : "text-white border-white"
        }`}
      >
        {heading}
      </h2>
      <p
        className={`text-base ${
          theme === "light" ? "text-gray-700" : "text-gray-200"
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export default Heading;
