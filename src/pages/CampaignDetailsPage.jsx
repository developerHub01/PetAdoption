import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import PetDetails from "../components/PetDetails";
import PetAdoptForm from "../components/PetAdoptForm";
import CampaignDetails from "../components/CampaignDetails";
import useFetchCampaignById from "../useCustomHooks/useFetchCampaignById";
import CampaignRecommendation from "../components/CampaignRecommendation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import PetCampaignForm from "../components/PetCampaignForm";
import Loader from "../components/Loader";

const CampaignDetailsPage = () => {
  const { _id } = useParams();
  const { data, isLoading } = useFetchCampaignById(_id);

  const [campaignFormStateOpen, setCampaignFormStateOpen] = useState(false);
  if (isLoading) return <Loader />;

  const { petImage, petName } = data;
  return (
    <>
      <Banner title={petName} bgImgLink={petImage} />
      <CampaignDetails
        {...data}
        setCampaignFormStateOpen={setCampaignFormStateOpen}
      />
      <div className="py-14">
        <Container>
          <Heading
            heading="Recommended Campaigns"
            description="Recommended campaigns that started recently"
          />
          <CampaignRecommendation />
        </Container>
      </div>
      {campaignFormStateOpen && (
        <PetCampaignForm
          campaignId={_id}
          setCampaignFormStateOpen={setCampaignFormStateOpen}
        />
      )}
    </>
  );
};

export default CampaignDetailsPage;
