import React, { useState } from "react";
import { serverApi } from "../constant/constant";
import Container from "../components/Container";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import useAxiosAdmin from "../AxiosInstance/useAxiosAdmin";
import { useNavigate } from "react-router-dom";

const tableHeadingList = [
  "Product name",
  "email",
  "profile picture",
  "Role",
  "Make Admin",
  "Ban",
];

const Users = () => {
  const numberOfUser = 8;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const adminAxios = useAxiosAdmin();
  const { data, isLoading, isError, refetch, isPreviousData } = useQuery({
    queryKey: ["users", page],
    queryFn: () =>
      adminAxios
        .get(`/users?numberOfUser=${numberOfUser}&page=${page}`)
        .then((res) => res.data),
    keepPreviousData: true,
  });
  const users = data?.data;
  const totalUser = data?.total;
  if (isLoading) return <Loader />;
  if (isError) return <h1>{isError.message}</h1>;

  const handleUnBlockStatus = async (email, blocked) => {
    adminAxios
      .get(`/users/banStatus/${email}`)
      .then((res) => {
        res.data;
        refetch();

        Swal.fire({
          title: "Success",
          text: `${blocked ? "Unblocked" : "Blocked"} Successfully`,
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
  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make him admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        adminAxios
          .get(`/users/makeAdmin/${email}`)
          .then((res) => {
            res.data;
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

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl text-center font-bold text-primaryColor">
          Users List ({totalUser})
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-base rtl:text-right text-white text-center rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-primaryColor border-b-2 border-white select-none">
              <tr>
                {tableHeadingList.map((item, key) => (
                  <th key={key} className="px-6 py-5 whitespace-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map(
                ({ _id, profilePic, fullName, email, role, blocked }) => (
                  <tr
                    key={_id}
                    className={`${
                      role === "admin"
                        ? "bg-primaryColor text-white border-white"
                        : "bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20"
                    } border-b`}
                  >
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {fullName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">{email}</td>
                    <td className="px-6 py-3 whitespace-nowrap grid place-items-center">
                      <div
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                          role === "admin"
                            ? "border-white"
                            : "border-primaryColor"
                        }`}
                      >
                        <img
                          src={profilePic}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <strong>{role}</strong>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {role !== "admin" && (
                        <button
                          className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                          onClick={() => handleMakeAdmin(email)}
                        >
                          <IoMdAdd />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {role !== "admin" && (
                        <button
                          className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto"
                          onClick={() => handleUnBlockStatus(email, blocked)}
                        >
                          {blocked ? "Unblock" : "Block"}
                        </button>
                      )}
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
              (isPreviousData || totalUser - (page + 1) * numberOfUser <= 0) &&
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

export default Users;
