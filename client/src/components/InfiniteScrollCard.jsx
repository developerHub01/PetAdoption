import React, { useEffect, useRef } from "react";
import "./PetCards.css";
const InfiniteScrollCard = ({ children }) => {
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting)
            cardRef?.current?.classList.add("activeAnim");
          else cardRef?.current?.classList.remove("activeAnim");
        });
      },
      { threshold: 0.4 }
    );

    if (cardRef?.current) {
      observer.observe(cardRef?.current);
    }

    return () => {
      if (cardRef?.current) {
        observer.unobserve(cardRef?.current);
      }
    };
  }, []);
  return (
    <div
      ref={cardRef}
      className="opacity-0 scale-95 hover:scale-95 hover:shadow-2xl rounded-xl transition-all duration-200"
    >
      {children}
    </div>
  );
};

export default InfiniteScrollCard;
