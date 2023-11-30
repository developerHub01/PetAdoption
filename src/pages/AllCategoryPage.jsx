import React from "react";
import CategorySection from "../components/CategorySection";
import Banner from "../components/Banner";
import { categoryList } from "../constant/constant";

const AllCategoryPage = () => {
  return (
    <>
      <Banner
        title="Our All Categories"
        bgImgLink={
          categoryList[Math.floor(Math.random() * categoryList.length)].imgLink
        }
      />
      <CategorySection />
    </>
  );
};

export default AllCategoryPage;
