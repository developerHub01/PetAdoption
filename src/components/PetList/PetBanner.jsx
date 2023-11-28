import React from "react";
import Container from "../Container";

const petBannerImg =
  "https://images.unsplash.com/photo-1496284427489-f59461d8a8e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const PetBanner = () => {
  return (
    <div
      style={{
        background: `url('${petBannerImg}')`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="p-5 py-10 min-h-[50vh] grid place-items-center relative before:content-[''] before:bg-black/50 before:absolute before:top-0 before:left-0 before:w-full before:h-full select-none"
    >
      <Container>
        <h1 className="text-center text-white text-4xl font-bold">
          Out Pet List
        </h1>
      </Container>
    </div>
  );
};

export default PetBanner;
