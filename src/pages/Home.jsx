import React from "react";
import CategorySection from "../components/CategorySection";
import BannerSection from "../components/BannerSection";
import CampaignSection from "../components/CampaignSection";
import AboutSection from "../components/AboutSection";

const Home = () => {
  return (
    <>
      <BannerSection />
      <AboutSection />
      <CategorySection />
      <CampaignSection />
    </>
  );
};

export default Home;
