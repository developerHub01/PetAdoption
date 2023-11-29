import React from "react";
import Container from "./Container";

const PetDetails = ({
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
  setAdoptFormStateOpen,
}) => {
  return (
    <section className="py-14 text-gray-700">
      <Container>
        <div className="w-full flex flex-col gap-5 justify-center items-start">
          <div className="grid md:grid-cols-2 gap-7">
            <div className="w-full h-full shadow-xl rounded-lg overflow-hidden">
              <img
                src={petImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
              <h2 className="text-primaryColor font-bold text-2xl">
                {petName}
              </h2>
              <ul className="flex flex-col gap-3 text-gray-700">
                <li>
                  <strong className="text-primaryColor">Age:</strong> {petAge}{" "}
                  years
                </li>
                <li>
                  <strong className="text-primaryColor">Category:</strong>{" "}
                  {petCategory} years
                </li>
                <li>
                  <strong className="text-primaryColor">Author Email:</strong>{" "}
                  {petAuthorEmail} years
                </li>
                <li>
                  <strong className="text-primaryColor">Location:</strong>{" "}
                  {petLocation}
                </li>
                <li>
                  <strong className="text-primaryColor">Summary:</strong>{" "}
                  {petShortDescription}
                </li>
              </ul>
              <span className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer capitalize">
                {petAdoptionStatus ? "Not adopted" : "adopted"}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-4">
            <h3 className="text-primaryColor text-2xl font-bold pb-2 border-b-4 border-primaryColor">
              Details
            </h3>
            <p>{petLongDescription}</p>
          </div>
          {petAdoptionStatus && (
            <button
              className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer capitalize"
              onClick={() => setAdoptFormStateOpen((prev) => !prev)}
            >
              Adopt
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PetDetails;
