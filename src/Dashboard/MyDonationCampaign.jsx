import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { serverApi } from "../constant/constant";
import CampaignTable from "./CampaignTable";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../customProvider/AuthProvider";
import CampaignDonator from "./CampaignDonator";

const tableHeadingList = [
  "sn",
  "pet name",
  "author email",
  "pet image",
  "total donation",
  "max donation",
  "progress",
  "last date",
  "status",
  "action",
  "update",
];

const MyDonationCampaign = () => {
  const { user } = useContext(AuthContext);
  const [CampaignDonatorStatusOpen, setCampaignDonatorStatusOpen] =
    useState(false);

  if (!user) return;
  const { email } = user;
  const numberOfUser = 8;
  const [page, setPage] = useState(0);
  console.log(
    `${serverApi}/campaign?email=${email}&numberOfUser=${numberOfUser}&page=${page}`
  );
  const { data, isLoading, isError, refetch, isPreviousData } = useQuery({
    queryKey: ["users", page, email],
    queryFn: () =>
      fetch(
        `${serverApi}/campaign?email=${email}&numberOfUser=${numberOfUser}&page=${page}`
      ).then((res) => res.json()),
    keepPreviousData: true,
  });
  if (isLoading) return <h1>Loading..........</h1>;
  if (isError) return <h1>{isError.message}</h1>;
  const campaignList = data?.data;
  const totalCampaign = data?.total;

  const handleActiveStatus = (_id, donationStatusActive) => {
    axios
      .patch(`${serverApi}/campaign/donationStatusActive/${_id}`)
      .then((res) => {
        res.data;
        refetch();

        Swal.fire({
          title: "Success",
          text: `${donationStatusActive ? "Paused" : "Activated"} Successfully`,
          icon: "success",
        });
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || error.message,
        })
      );
  };
  return (
    <div className="py-8 flex flex-col gap-10">
      <CampaignTable
        totalCampaign={totalCampaign}
        campaignList={campaignList}
        handleActiveStatus={handleActiveStatus}
        numberOfUser={numberOfUser}
        page={page}
        setPage={setPage}
        isPreviousData={isPreviousData}
        tableHeadingList={tableHeadingList}
      />
      <button
        className="px-6 py-2 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
        onClick={() => setCampaignDonatorStatusOpen((prev) => !prev)}
      >
        Donator List
      </button>
      {CampaignDonatorStatusOpen && (
        <CampaignDonator
          setCampaignDonatorStatusOpen={setCampaignDonatorStatusOpen}
        />
      )}
    </div>
  );
};

export default MyDonationCampaign;
