import React from "react";
import Container from "./Container";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import CampaignRecommendation from "./CampaignRecommendation";
const CampaignSection = () => {
  return (
    <section className="py-14">
      <Container>
        <Heading
          heading="Recent Campaign"
          description="Recent Campaign"
          className=""
        />
        <div className="w-full flex flex-col gap-8 justify-center items-center">
          <CampaignRecommendation />
          <Link
            to="/campaign"
            className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer"
          >
            View All campaign
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CampaignSection;
