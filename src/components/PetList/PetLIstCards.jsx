import React, { useEffect, useRef } from "react";
import "./PetList.css";
import { Link } from "react-router-dom";
const PetLIstCards = ({
  _id,
  petImage,
  petName,
  petAge,
  petCategory,
  petLocation,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) cardRef.current.classList.add("activeAnim");
          else cardRef.current.classList.remove("activeAnim");
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      key={_id}
      ref={cardRef}
      className="w-full h-full shadow-xl grid place-items-center bg-white p-5 gap-2 rounded-xl cursor-pointer hover:scale-95 hover:shadow-2xl opacity-50 scale-50 transition-all duration-150"
    >
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
        <Link to="/">
          <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetLIstCards;
