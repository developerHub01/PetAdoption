import React from "react";
import useFetchCampaignListWithoutThatId from "../useCustomHooks/useFetchCampaignListWithoutThatId";
import Loader from "./Loader";
import InfiniteScrollCard from "./InfiniteScrollCard";
import CampaignCard from "./CampaignCard";

const CampaignRecommendationWithOutASpecificId = ({_id}) => {
  const { data, isLoading } = useFetchCampaignListWithoutThatId(_id);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
      {data.map((item) => (
        <InfiniteScrollCard key={item._id}>
          <CampaignCard {...item} />
        </InfiniteScrollCard>
      ))}
    </div>
  );
};

export default CampaignRecommendationWithOutASpecificId;
