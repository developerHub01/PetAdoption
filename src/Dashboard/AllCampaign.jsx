import React, { useState } from "react";
import { handleTimeFormatFromUTC, serverApi } from "../constant/constant";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import CampaignTable from "./CampaignTable";

const tableHeadingList = [
  "SN",
  "Pet name",
  "Author Email",
  "Pet Image",
  "Total Donation",
  "Max Donation",
  "Last Date",
  "status",
  "Action",
  "Delete",
];

const AllCampaign = () => {
  const numberOfUser = 8;
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch, isPreviousData } = useQuery({
    queryKey: ["campaign", page],
    queryFn: () =>
      fetch(
        `${serverApi}/campaign?numberOfUser=${numberOfUser}&page=${page}`
      ).then((res) => res.json()),
    keepPreviousData: true,
  });
  if (isLoading) return <h1>Loading..........</h1>;
  if (isError) return <h1>{isError.message}</h1>;
  const campaignList = data?.data;
  const totalCampaign = data?.total;
  console.log(totalCampaign);

  const handleDeleteCampaign = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${serverApi}/campaign/${_id}`)
          .then((res) => {
            res.data;
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully",
              icon: "success",
            });
            refetch();
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.response?.data?.message || error.message,
            })
          );
      }
    });
  };

  const handleActiveStatus = (_id, donationStatusActive) => {
    console.log(_id);
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
    <CampaignTable
      totalCampaign={totalCampaign}
      campaignList={campaignList}
      handleActiveStatus={handleActiveStatus}
      handleDeleteCampaign={handleDeleteCampaign}
      numberOfUser={numberOfUser}
      page={page}
      setPage={setPage}
      isPreviousData={isPreviousData}
    />
  );
};

export default AllCampaign;
