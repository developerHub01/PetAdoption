import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import "./Navbar.css";
import { AuthContext } from "../../customProvider/AuthProvider";
import Swal from "sweetalert2";
import useFetchCartList from "../../useCustomHooks/useFetchCartList";
import CartList from "./CartList";
import Loader from "../Loader";

const publicMenuList = [
  {
    path: "/",
    text: "home",
  },
  {
    path: "/category",
    text: "Category",
  },
  {
    path: "/petlist",
    text: "pet list",
  },
  {
    path: "/campaign",
    text: "campaign list",
  },
];

const Navbar = () => {
  const { user, signOutUser, userProfileImage } = useContext(AuthContext);
  const [menusStatus, setMenuStatus] = useState(false);
  const [cartPopUpStatus, setCartPopUpStatus] = useState(false);

  if (!user) return <Loader />;

  const { data, isLoading } = useFetchCartList(user?.email);

  if (isLoading) return <Loader />;

  console.log(data);

  const handleLogOut = () => {
    signOutUser();
    setMenuStatus((prev) => false);
    Swal.fire({
      icon: "success",
      title: "Logout successful",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-2xl h-16 grid place-items-center bg-primaryColor text-white">
      <div className="w-[90%] mx-auto py-2 flex justify-between items-center">
        <Link
          to="/"
          className="text-lg md:text-2xl select-none capitalize font-bold border-b-4 border-white pb-2"
        >
          PetAdopt
        </Link>

        <div className="flex justify-center items-center gap-4">
          {user && (
            <div className="relative">
              <button
                className="cart w-10 md:w-12 h-10 md:h-12 grid place-items-center bg-white/10 cursor-pointer text-lg md:text-2xl rounded-full relative"
                onClick={() => setCartPopUpStatus((prev) => !prev)}
              >
                {Boolean(data?.length) && (
                  <span className="cartNumber bg-red-600 text-xs md:text-sm rounded-full block absolute bottom-0 right-0 aspect-square p-1">
                    {data?.length}
                  </span>
                )}
                <div>
                  <FaCartShopping />
                </div>
              </button>
              {cartPopUpStatus && <CartList />}
            </div>
          )}
          <button
            onClick={() => setMenuStatus((prev) => !prev)}
            className="w-10 md:w-12 h-10 md:h-12 grid place-items-center bg-white/10 cursor-pointer text-2xl md:text-3xl rounded-full"
          >
            <HiBars3BottomRight />
          </button>
          {user && (
            <button
              onClick={() => setMenuStatus((prev) => !prev)}
              className="w-10 md:w-12 h-10 md:h-12 grid place-items-center bg-white/10 cursor-pointer text-3xl rounded-full overflow-hidden"
            >
              <img
                src={user.photoURL || userProfileImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          )}
        </div>
      </div>
      <div
        className={`sidebarPublic shadow-2xl w-64 h-screen overflow-hidden bg-white fixed top-0 right-0 z-40 transition-all duration-100 grid place-items-center p-5 ${
          menusStatus ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="w-10 h-10 grid place-items-center bg-primaryColor/10 cursor-pointer text-3xl rounded-full text-primaryColor absolute top-2 left-2"
          onClick={() => setMenuStatus((prev) => !prev)}
        >
          <HiMiniXMark />
        </div>

        <ul className="text-primaryColor py-5 flex flex-col gap-3 w-full">
          {publicMenuList.map(({ path, text }) => (
            <li key={path} className="w-full">
              <NavLink
                to={path}
                className="block transition-all duration-75 hover:bg-primaryColor hover:text-white rounded-md p-2 w-full capitalize"
                onClick={() => setMenuStatus((prev) => false)}
              >
                {text}
              </NavLink>
            </li>
          ))}
          {user ? (
            <>
              <li className="w-full">
                <NavLink
                  to="/dashboard"
                  className="block transition-all duration-75 hover:bg-primaryColor hover:text-white rounded-md p-2 w-full capitalize"
                  onClick={() => setMenuStatus((prev) => false)}
                >
                  dashboard
                </NavLink>
              </li>
              <li className="w-full">
                <button
                  className="block transition-all duration-75 hover:bg-primaryColor hover:text-white rounded-md p-2 w-full capitalize text-left"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="w-full">
              <NavLink
                to="/login"
                className="block transition-all duration-75 hover:bg-primaryColor hover:text-white rounded-md p-2 w-full capitalize"
                onClick={() => setMenuStatus((prev) => !prev)}
              >
                login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
