import React from "react";
import Container from "./Container";
import useFetchCampaignList from "../useCustomHooks/useFetchCampaignList";
import CampaignCard from "./CampaignCard";
import InfiniteScrollCard from "./InfiniteScrollCard";
import Loader from "./Loader";

const CampaignRecommendation = () => {
  const { data, isLoading } = useFetchCampaignList(3);

  if (isLoading) return <Loader />;

  const { data: campaignList, total } = data;
  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      {campaignList.map((item) => (
        <InfiniteScrollCard key={item._id}>
          <CampaignCard {...item} />
        </InfiniteScrollCard>
      ))}
    </div>
  );
};

export default CampaignRecommendation;
