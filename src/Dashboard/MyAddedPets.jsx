import React, { useContext, useState } from "react";
import useFetchPets from "../useCustomHooks/useFetchPets";
import axios from "axios";
import { serverApi } from "../constant/constant";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AuthContext } from "../customProvider/AuthProvider";
import PetListTable from "./PetListTable";

const tableHeadingList = [
  "pet Image",
  "Author Email",
  "pet Name",
  "pet Age",
  "pet Category",
  "pet Status",
  "Adoption Action",
  "Remove",
  "Update",
];

const MyAddedPets = () => {
  const {
    user: { email },
  } = useContext(AuthContext);
  const numberOfUser = 8;
  const [page, setPage] = useState(0);
  const { refetch: refetchAllPets } = useFetchPets();
  const { data, isLoading, isError, refetch, isPreviousData } = useQuery({
    queryKey: ["pets", page, email],
    queryFn: () =>
      fetch(
        `${serverApi}/pet/${email}?numberOfUser=${numberOfUser}&page=${page}`
      ).then((res) => res.json()),
    keepPreviousData: true,
  });
  const pets = data?.data;
  const totalPet = data?.total;
  if (isLoading) return <h1>Loading..........</h1>;
  if (isError) return <h1>{isError.message}</h1>;

  const handleChangePetAdoptionStatus = (_id) => {
    axios
      .patch(`${serverApi}/pet/adoptionStatusByAdmin/${_id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Changed adoption status",
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
        axios
          .delete(`${serverApi}/pet/deleteAdmin/${_id}`)
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

export default MyAddedPets;
