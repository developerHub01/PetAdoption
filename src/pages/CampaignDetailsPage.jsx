import React, { useState } from "react";
import useFetchPetById from "../useCustomHooks/useFetchPetById";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import PetDetails from "../components/PetDetails";
import PetAdoptForm from "../components/PetAdoptForm";

const CampaignDetailsPage = () => {
  const { _id } = useParams();
  const { data, isLoading } = useFetchPetById(_id);

  const [adoptFormStateOpen, setAdoptFormStateOpen] = useState(false);

  if (isLoading) return <h1>Loading...........</h1>;

  const { petImage, petName } = data;
  return (
    <>
      <Banner title={petName} bgImgLink={petImage} />
      <CampaignDetails
        {...data}
        setAdoptFormStateOpen={setAdoptFormStateOpen}
      />
      {/* {adoptFormStateOpen && (
        <PetAdoptForm
          petId={_id}
          setAdoptFormStateOpen={setAdoptFormStateOpen}
        />
      )} */}
    </>
  );
};

export default CampaignDetailsPage;
