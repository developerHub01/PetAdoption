import React from "react";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant";

const useFetchAdoptionListSendByMe = (email) => {
  const response = useQuery({
    queryKey: ["adoptionRequestByMe", email],
    queryFn: () =>
      fetch(`${serverApi}/adoption?email=${email}`).then((res) => res.json()),
  });
  return response;
};

export default useFetchAdoptionListSendByMe;
