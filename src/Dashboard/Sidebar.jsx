import React, { useContext, useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import "./dashboard.css";
import useFetchUsers from "../useCustomHooks/useFetchUsers";
import { serverApi } from "../constant/constant";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import useFetchPets from "../useCustomHooks/useFetchPets";
import { AuthContext } from "../customProvider/AuthProvider";
import Loader from "../components/Loader";
import useAxiosAdmin from "../AxiosInstance/useAxiosAdmin";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const {
    data: userList,
    isLoading: isUserListLoading,
    isError: isUserListError,
  } = useFetchUsers();
  const {
    data: petList,
    isLoading: isPetListLoading,
    isError: isPetListError,
  } = useFetchPets();

  const axiosAdmin = useAxiosAdmin(localStorage.getItem("token"));
  const { isLoading: adminLoading, data: adminStatus } = useQuery({
    queryKey: [],
    queryFn: () =>
      axiosAdmin.get("/adminCheck").then((res) => {
        return { statusCode: res.status, data: res.data };
      }),
  });
  const [sideBarOpen, setSideBarOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace={true} />;

  if (isPetListLoading || isUserListLoading || adminLoading) return <Loader />;

  return (
    <div
      className={`sidebar flex-shrink-0 w-full max-w-[250px] bg-primaryColor text-white p-3 h-screen flex flex-col gap-3 justify-start items-start fixed top-0 left-0 ${
        sideBarOpen
          ? "translate-x-0 md:translate-x-0"
          : "-translate-x-full md:translate-x-0"
      }  md:translate-x-0 md:relative shadow-2xl transition-all duration-150 z-50`}
    >
      <button
        className={`absolute top-0 right-0 md:hidden bg-primaryColor w-10 h-10 p-1 shadow-xl grid place-items-center ${
          sideBarOpen
            ? "rounded-s-full rounded-e-none translate-x-0"
            : "rounded-e-full rounded-s-none translate-x-full"
        } text-2xl text-white `}
        onClick={() => setSideBarOpen((prev) => !prev)}
      >
        {sideBarOpen ? <FaXmark /> : <FaBars />}
      </button>
      <Link to="/" className="text-center text-2xl font-bold">
        PetAdoption
      </Link>
      <div className="w-full h-full overflow-hidden bg-white/5 p-1 rounded-md">
        <Scrollbar className={`w-full h-full overflow-auto`}>
          <ul className="flex flex-col gap-1 capitalize">
            <li>
              <NavLink
                to="/dashboard"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                Home
              </NavLink>
            </li>
            {adminStatus?.statusCode === 202 && (
              <>
                <li>
                  <NavLink
                    to="users"
                    className="w-full py-1 px-3 bg-primaryColor rounded-md flex gap-2"
                  >
                    Users
                    {userList.total && (
                      <span className="bg-red-600 text-white rounded-full text-sm py-[2px] px-1">
                        {userList.total}
                      </span>
                    )}
                  </NavLink>
                </li>{" "}
                <li>
                  <NavLink
                    to="allpets"
                    className="w-full py-1 px-3 bg-primaryColor block rounded-md"
                  >
                    All Pets
                    {petList.total && (
                      <span className="bg-red-600 text-white rounded-full text-sm py-[2px] px-1">
                        {petList.total}
                      </span>
                    )}
                  </NavLink>
                </li>{" "}
                <li>
                  <NavLink
                    to="allcampaign"
                    className="w-full py-1 px-3 bg-primaryColor block rounded-md"
                  >
                    All Campaign
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to="addpet"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                Add a pet
              </NavLink>
            </li>

            <li>
              <NavLink
                to="mycampaign"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                My Campaign
              </NavLink>
            </li>
            <li>
              <NavLink
                to="myaddedpets"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                Added pets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="myadoptionrequest"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="mydonations"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                My Donations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="addcampaign"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                Add Campaign
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payment"
                className="w-full py-1 px-3 bg-primaryColor block rounded-md"
              >
                Check out form
              </NavLink>
            </li>
          </ul>
        </Scrollbar>
      </div>
    </div>
  );
};

export default Sidebar;
