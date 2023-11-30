import React from "react";
import Container from "./Container";
import Heading from "./Heading";
import useFetchCampaignList from "../useCustomHooks/useFetchCampaignList";
import { Link } from "react-router-dom";
import { handleTimeFormatFromUTC } from "../constant/constant";
import CampaignCard from "./CampaignCard";
const CampaignSection = () => {
  const { data, isLoading } = useFetchCampaignList(3);

  if (isLoading) return <h1>Loading....</h1>;

  const { data: campaignList, total } = data;

  return (
    <section className="py-14">
      <Container>
        <Heading
          heading="Recent Campaign"
          description="Recent Campaign"
          className=""
        />
        <div className="w-full flex flex-col gap-8 justify-center items-center">
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {campaignList.map((item) => (
              <CampaignCard key={item._id} {...item} />
            ))}
          </div>
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
