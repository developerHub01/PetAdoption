import React from "react";
import Banner from "../components/Banner";
import useFetchCampaignList from "../useCustomHooks/useFetchCampaignList";
import InfiniteScrollCard from "../components/InfiniteScrollCard";
import CampaignCard from "../components/CampaignCard";
import Container from "../components/Container";
import Loader from "../components/Loader";

const CampaignPage = () => {
  const { data, isLoading } = useFetchCampaignList();
  if (isLoading) return <Loader />;
  const { data: campaignList, total } = data;
  return (
    <>
      <Banner
        title="All Campaigns"
        bgImgLink={
          campaignList[Math.floor(Math.random() * campaignList.length)].petImage
        }
      />
      <Container>
        <section className="py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {campaignList.map((item) => (
            <InfiniteScrollCard key={item._id}>
              <CampaignCard {...item} />
            </InfiniteScrollCard>
          ))}
        </section>
      </Container>
    </>
  );
};

export default CampaignPage;
