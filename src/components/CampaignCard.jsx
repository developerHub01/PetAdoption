import React from "react";
import { handleTimeFormatFromUTC } from "../constant/constant";
import { Link } from "react-router-dom";

const CampaignCard = ({
  _id,
  petImage,
  petName,
  petShortDescription,
  lastDate,
}) => {
  return (
    <div className="w-full h-full shadow-xl grid place-items-center bg-white p-5 gap-2 rounded-xl cursor-pointer text-gray-700">
      <div className="w-full aspect-video border-4 border-primaryColor rounded-xl overflow-hidden">
        <img src={petImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-full flex flex-col gap-3">
        <h4 className="text-primaryColor capitalize text-2xl font-semibold">
          <Link to={`/campaign/${_id}`}>{petName}</Link>
        </h4>
        <p>{petShortDescription.slice(0, 80)}</p>
        <p>Last Date: {handleTimeFormatFromUTC(lastDate)}</p>
        <Link to={`/campaign/${_id}`}>
          <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
