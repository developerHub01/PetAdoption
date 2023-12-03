import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { serverApi } from "../constant/constant";
import axios from "axios";
import useFetchPets from "../useCustomHooks/useFetchPets";
import Swal from "sweetalert2";
import PetListTable from "./PetListTable";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import useAxiosAdmin from "../AxiosInstance/useAxiosAdmin";

const AllPets = () => {
  const numberOfUser = 8;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const { refetch: refetchAllPets } = useFetchPets();
  const adminAxios = useAxiosAdmin(localStorage.getItem("token"));
  const { data, isLoading, isError, refetch, isPreviousData } = useQuery({
    queryKey: ["pets", page],
    queryFn: () =>
      adminAxios
        .get(`/pet?numberOfUser=${numberOfUser}&page=${page}`)
        .then((res) => res.data)
        .catch((error) => {
          navigate("/unauthorizeToken", { replace: true });
        }),
    keepPreviousData: true,
  });
  const pets = data?.data;
  const totalPet = data?.total;
  if (isLoading) return <Loader />;
  if (isError) return <h1>{isError.message}</h1>;

  const handleChangePetAdoptionStatus = (_id) => {
    adminAxios
      .patch(`/pet/adoptionStatusByAdmin/${_id}`)
      .then((res) => {
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
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
  const handlePetDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        adminAxios
          .delete(`/pet/deleteAdmin/${_id}`)
          .then((res) => {
            console.log(res.data);
            refetch();
            refetchAllPets();
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

  return (
    <PetListTable
      pets={pets}
      totalPet={totalPet}
      setPage={setPage}
      page={page}
      numberOfUser={numberOfUser}
      isPreviousData={isPreviousData}
      handleChangePetAdoptionStatus={handleChangePetAdoptionStatus}
      handlePetDelete={handlePetDelete}
    />
  );
};

export default AllPets;
