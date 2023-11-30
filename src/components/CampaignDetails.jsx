import React from "react";
import Container from "./Container";
import { handleTimeFormatFromUTC } from "../constant/constant";
import { BiDollar } from "react-icons/bi";

const CampaignDetails = ({
  _id,
  petName,
  date,
  donatedAmount,
  donationAuthorEmail,
  donationStatusActive,
  lastDate,
  petImage,
  petLongDescription,
  petShortDescription,
  maxDonationAmount,
  setCampaignFormStateOpen,
}) => {
  const progress = (maxDonationAmount, donatedAmount) =>
    (donatedAmount * 100) / maxDonationAmount;

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
            <div className="flex flex-col gap-5 justify-start items-start">
              <h2 className="text-primaryColor font-bold text-3xl">
                {petName}
              </h2>
              <ul className="flex flex-col gap-3 text-gray-700">
                <li className="flex gap-2 flex-wrap">
                  <strong className="text-primaryColor">Author Email:</strong>
                  {donationAuthorEmail}
                </li>
                <li className="flex gap-2 capitalize flex-wrap">
                  <strong className="text-primaryColor">
                    Campaign Created date:
                  </strong>
                  {handleTimeFormatFromUTC(date)}
                </li>
                <li className="flex gap-2 capitalize flex-wrap">
                  <strong className="text-primaryColor">
                    Last date of campaign:
                  </strong>
                  {handleTimeFormatFromUTC(lastDate)}
                </li>
                <li className="flex gap-2 capitalize flex-wrap">
                  <strong className="text-primaryColor">
                    Donation Amoutn:
                  </strong>
                  <span className="flex gap-1 justify-center items-center">
                    {donatedAmount}
                    <BiDollar className="text-lg" />
                  </span>
                </li>
                <li className="flex gap-2 capitalize flex-wrap">
                  <strong className="text-primaryColor">Progress:</strong>
                  <div className="flex gap-3 justify-center items-center">
                    <span className="block font-bold text-base flex-shrink-0">
                      {progress(maxDonationAmount, donatedAmount)} %
                    </span>
                    <span
                      className={`block w-full min-w-[180px] h-2 relative bg-primaryColor/25 rounded-full overflow-hidden z-0`}
                    >
                      <span
                        className={`absolute h-full block top-0 left-0 bg-primaryColor rounded-full z-20`}
                        style={{
                          width: `${progress(
                            maxDonationAmount,
                            donatedAmount
                          )}%`,
                        }}
                      ></span>
                    </span>
                  </div>
                </li>
                <li className="flex gap-2 flex-wrap">
                  <strong className="text-primaryColor">Summary:</strong>
                  {petShortDescription}
                </li>
              </ul>
              <span className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-5 capitalize cursor-auto">
                {donationStatusActive ? "Active" : "Paused"}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-4">
            <h3 className="text-primaryColor text-2xl font-bold pb-2 border-b-4 border-primaryColor">
              Details
            </h3>
            <p>{petLongDescription}</p>
          </div>
          {donationStatusActive && (
            <button
              className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-5 cursor-pointer capitalize"
              onClick={() => setCampaignFormStateOpen((prev) => !prev)}
            >
              Donate
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CampaignDetails;
