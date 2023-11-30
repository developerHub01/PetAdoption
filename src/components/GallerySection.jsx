import React from "react";
import Container from "./Container";
import Heading from "./Heading";
import { galleryData } from "../constant/constant";
import InfiniteScrollCard from "./InfiniteScrollCard";

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
            <InfiniteScrollCard key={i}>
              <div className="w-full rounded-xl shadow-xl mb-5 overflow-hidden cursor-pointer border-4 border-transparent hover:border-white">
                <img src={item} alt="" className="w-full h-full object-cover" />
              </div>
            </InfiniteScrollCard>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GallerySection;
