import React from "react";
import CategorySection from "../components/CategorySection";
import BannerSection from "../components/BannerSection";
import CampaignSection from "../components/CampaignSection";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <>
      <BannerSection />
      <AboutSection />
      <CategorySection />
      <CampaignSection />
      <GallerySection />
      <CTA />
    </>
  );
};

export default Home;
