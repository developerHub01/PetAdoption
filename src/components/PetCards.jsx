import React from "react";
import { Link } from "react-router-dom";
import InfiniteScrollCard from "./InfiniteScrollCard";
const PetCards = ({
  _id,
  petImage,
  petName,
  petAge,
  petCategory,
  petLocation,
}) => {
  return (
    <InfiniteScrollCard key={_id}>
      <div className="w-full h-full shadow-xl grid place-items-center bg-white p-5 gap-2 rounded-xl cursor-pointer transition-all duration-150">
        <div className="w-full aspect-video border-4 border-primaryColor rounded-xl overflow-hidden">
          <img src={petImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-full flex flex-col gap-3">
          <h4 className="text-primaryColor capitalize text-2xl font-semibold">
            {petName}
          </h4>
          <p>
            <strong className="text-primaryColor">Age:</strong> {petAge}
          </p>
          <p>
            <strong className="text-primaryColor">Location:</strong>{" "}
            {petLocation.slice(0, 30)}
          </p>
          <Link to={`/petdetails/${_id}`}>
            <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </InfiniteScrollCard>
  );
};

export default PetCards;
