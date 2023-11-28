import React from "react";

const Heading = ({ heading, description }) => {
  return (
    <div className="text-center flex flex-col gap-2 justify-center place-items-center">
      <h2 className="text-3xl font-semibold border-b-4 border-gray-200 p-2">
        {heading}
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default Heading;
