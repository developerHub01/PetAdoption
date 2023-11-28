import React from "react";
import { useParams } from "react-router-dom";
import { serverApi } from "../constant/constant";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import Banner from "../components/Banner";
import PetCards from "../components/PetCards";

const CategoryPage = () => {
  const { category } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["pets", category],
    queryFn: () =>
      fetch(
        `${serverApi}/petDataByQuery?petCategory=${category
          ?.toLowerCase()
          ?.trim()}`
      ).then((res) => res.json()),
  });

  if (isLoading) return <h1>Loading..........</h1>;

  return (
    <div>
      <Banner
        title={category}
        bgImgLink={data[Math.floor(Math.random() * data?.length)]?.petImage}
      />
      <Container>
        <div className="w-full py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.map((item) => (
            <PetCards key={item._id} {...item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
