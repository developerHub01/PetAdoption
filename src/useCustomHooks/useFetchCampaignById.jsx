import React from "react";
import { serverApi } from "../constant/constant";
import { useQuery } from "@tanstack/react-query";

const useFetchCampaignById = (_id) => {
  console.log(`${serverApi}/petById/${_id}`);
  const response = useQuery({
    queryKey: ["campaign", _id],
    queryFn: () =>
      fetch(`${serverApi}/campaign/${_id}`).then((res) => res.json()),
  });
  return response;
};

export default useFetchCampaignById;
