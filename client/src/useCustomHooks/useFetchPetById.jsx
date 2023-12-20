import { useQuery } from "@tanstack/react-query";
import React from "react";
import { serverApi } from "../constant/constant";

const useFetchPetById = (_id) => {
  console.log(`${serverApi}/petById/${_id}`);
  const response = useQuery({
    queryKey: ["pets", _id],
    queryFn: () =>
      fetch(`${serverApi}/petById/${_id}`).then((res) => res.json()),
  });
  return response;
};

export default useFetchPetById;
