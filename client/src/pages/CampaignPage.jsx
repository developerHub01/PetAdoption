import React from "react";
import Banner from "../components/Banner";
import useFetchCampaignList from "../useCustomHooks/useFetchCampaignList";
import InfiniteScrollCard from "../components/InfiniteScrollCard";
import CampaignCard from "../components/CampaignCard";
import Container from "../components/Container";
import Loader from "../components/Loader";

const campaignBannerBg =
  "https://images.unsplash.com/photo-1494947665470-20322015e3a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CampaignPage = () => {
  const { data, isLoading } = useFetchCampaignList();
  if (isLoading) return <Loader />;
  const { data: campaignList, total } = data;
  console.log(campaignList);
  return (
    <>
      <Banner title="All Campaigns" bgImgLink={campaignBannerBg} />
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
