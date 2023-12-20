import React from "react";
import Heading from "./Heading";
import Container from "./Container";
import { Link } from "react-router-dom";
import { categoryList } from "../constant/constant";
import InfiniteScrollCard from "./InfiniteScrollCard";

const CategorySection = () => {
  return (
    <section className="py-14 bg-primaryColor text-white">
      <Container>
        <Heading
          heading="Category"
          description="This is all of the category of pets we have"
          theme="dark"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categoryList.map(({ title, imgLink, path }) => (
            <InfiniteScrollCard key={path}>
              <div className="w-full h-full shadow-xl grid place-items-center bg-white p-5 gap-2 text-center rounded-xl cursor-pointer hover:scale-95 transition-all duration-75 hover:shadow-2xl">
                <div className="w-40 h-40 border-4 border-primaryColor rounded-xl overflow-hidden">
                  <img
                    src={imgLink}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <h4 className="text-primaryColor capitalize text-2xl font-semibold">
                    {title}
                  </h4>
                  <Link to={path}>
                    <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer">
                      View All
                    </button>
                  </Link>
                </div>
              </div>
            </InfiniteScrollCard>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
