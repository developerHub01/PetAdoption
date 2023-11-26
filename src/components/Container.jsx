import React from "react";

const Container = ({ mxw = "max-w-6xl", children }) => {
  return (
    <div
      className={`w-[95%] md:w-[90%] ${mxw} mx-auto flex flex-col gap-5 relative z-10`}
    >
      {children}
    </div>
  );
};

export default Container;
