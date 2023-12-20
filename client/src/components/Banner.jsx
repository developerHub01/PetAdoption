import React from "react";
import Container from "./Container";
import { backgroundImageDefaultStyle } from "../constant/constant";

const Banner = ({ title, bgImgLink }) => {
  return (
    <div
      style={{
        background: `url('${bgImgLink}')`,
        ...backgroundImageDefaultStyle,
      }}
      className="p-5 py-10 min-h-[70vh] grid place-items-center relative before:content-[''] before:bg-black/50 before:absolute before:top-0 before:left-0 before:w-full before:h-full select-none capitalize"
    >
      <Container>
        <h1 className="text-center text-white text-4xl md:text-6xl font-bold">
          {title}
        </h1>
      </Container>
    </div>
  );
};

export default Banner;
