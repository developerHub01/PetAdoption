import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

const bannerImg =
  "https://i.ibb.co/GHpKtzh/cute-animals-group-white-background-2-1-1.png";

const BannerSection = () => {
  return (
    <section className="bg-primaryColor text-white">
      <Container>
        <div className="grid lg:grid-cols-2 items-center min-h-[80vh] py-14 gap-7">
          <Container mxw="max-w-lg">
            <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl font-bold">Find Your Furry Friend</h1>
              <p className="text-gray-200">
                Discover the joy of companionship and unconditional love by
                adopting a pet. Our diverse selection of adorable animals is
                waiting to become a cherished member of your family. Browse
                through the profiles, and let your journey to a lifetime of
                friendship begin
              </p>
              <Link
                to="/"
                className="text-base bg-white rounded-full text-primaryColor grid place-items-center py-1 px-4 cursor-pointer"
              >
                View All Category
              </Link>
            </div>
          </Container>
          <Container mxw="max-w-lg">
            <img src={bannerImg} alt="" />
          </Container>
        </div>
      </Container>
    </section>
  );
};

export default BannerSection;
