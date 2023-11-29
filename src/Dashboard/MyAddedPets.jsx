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

const tableHeadingList = [
  "pet Image",
  "Author Email",
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
    queryKey: ["pets", page],
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
    <div className="py-8">
      <Container>
        <h1 className="text-2xl text-center font-bold text-primaryColor">
          Users List ({data.length})
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm rtl:text-right text-white text-center rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-primaryColor border-b-2 border-white">
              <tr>
                {tableHeadingList.map((item, key) => (
                  <th key={key} className="px-6 py-3 whitespace-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pets.map(
                ({
                  _id,
                  petImage,
                  petAuthorEmail,
                  petAge,
                  petCategory,
                  petAdoptionStatus,
                }) => (
                  <tr
                    key={_id}
                    className="bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20 border-b"
                  >
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primaryColor mx-auto">
                        <img
                          src={petImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {petAuthorEmail}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {petAge}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {petCategory}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {petAdoptionStatus ? (
                        <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto">
                          Unadopted
                        </button>
                      ) : (
                        <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto">
                          Adopted
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <button
                        className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto"
                        onClick={() => handleChangePetAdoptionStatus(_id)}
                      >
                        {petAdoptionStatus
                          ? "Change to Adopt"
                          : "Change to Unadopt"}
                      </button>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <button
                        className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                        onClick={() => handlePetDelete(_id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <Link
                        to={`/dashboard/update/${_id}`}
                        className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                      >
                        <GrUpdate />
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full flex flex-wrap justify-between items-center gap-5">
          <button
            className={`text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer ${
              page || "pointer-events-none opacity-50"
            }`}
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
          >
            Prev
          </button>
          <span className="text-primaryColor">Current Page: {page + 1}</span>
          <button
            className={`text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer ${
              (isPreviousData || totalPet - (page + 1) * numberOfUser <= 0) &&
              "pointer-events-none opacity-50"
            }`}
            onClick={() => !isPreviousData && setPage((old) => old + 1)}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default MyAddedPets;
