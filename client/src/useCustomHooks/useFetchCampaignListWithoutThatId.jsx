import React from "react";
import useAxiosPublic from "../AxiosInstance/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useFetchCampaignListWithoutThatId = (_id) => {
  let searchQuery = `/campaignWithOutThat/${_id}`;
  const publicAxios = useAxiosPublic();
  const response = useQuery({
    queryKey: ["recommendCampaign"],
    queryFn: () =>
      publicAxios.get(searchQuery).then((res) => {
        return res.data;
      }),
  });
  return response;
};

export default useFetchCampaignListWithoutThatId;
