import React, { useState } from "react";
import useFetchPetById from "../useCustomHooks/useFetchPetById";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import Container from "../components/Container";
import PetDetails from "../components/PetDetails";
import PetAdoptForm from "../components/PetAdoptForm";

const PetDetailsPage = () => {
  const { _id } = useParams();
  const { data, isLoading } = useFetchPetById(_id);

  const [adoptFormStateOpen, setAdoptFormStateOpen] = useState(false);

  if (isLoading) return <h1>Loading...........</h1>;

  console.log(data);
  const {
    date,
    petAdoptionStatus,
    petAge,
    petAuthorEmail,
    petCategory,
    petImage,
    petLocation,
    petLongDescription,
    petName,
    petShortDescription,
  } = data;
  return (
    <>
      <Banner title={petName} bgImgLink={petImage} />
      <PetDetails {...data} setAdoptFormStateOpen={setAdoptFormStateOpen} />
      {adoptFormStateOpen && <PetAdoptForm />}
    </>
  );
};

export default PetDetailsPage;
