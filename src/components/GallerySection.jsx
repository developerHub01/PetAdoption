import React from "react";
import Container from "./Container";
import Heading from "./Heading";
import { galleryData } from "../constant/constant";

const GallerySection = () => {
  return (
    <section className="bg-primaryColor py-14">
      <Container>
        <Heading
          heading="Gallery"
          description="Some of our memories"
          theme="dark"
        />
        <div className="w-full sm:columns-2 md:columns-3 gap-5 overflow-hidden">
          {galleryData.map((item, i) => (
            <div
              key={i}
              className="w-full rounded-md shadow-xl mb-5 overflow-hidden"
            >
              <img src={item} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GallerySection;
