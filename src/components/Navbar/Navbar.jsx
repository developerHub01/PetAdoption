import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import "./Navbar.css";

const menuList = [
  {
    path: "/",
    text: "Home",
    loggedOrNot: true,
  },
  {
    path: "/petlist",
    text: "Pet Listing",
    loggedOrNot: true,
  },
  {
    path: "/donations",
    text: "Donation Campaigns",
    loggedOrNot: true,
  },
  {
    path: "/login",
    text: "Login",
    loggedOrNot: true,
  },
];

const Navbar = () => {
  const [menusStatus, setMenuStatus] = useState(false);
  return (
    <div className="bg-primaryColor text-white">
      <div className="w-[90%] mx-auto py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl select-none capitalize font-bold border-b-4 border-white pb-2"
        >
          PetAdopt
        </Link>
        <div className="flex justify-center items-center gap-4">
          <Link
            to="/dashboard"
            className="cart w-12 h-12 grid place-items-center bg-white/10 cursor-pointer text-2xl rounded-full relative"
          >
            {/* TODO cart Number */}
            <span className="cartNumber bg-red-600 text-sm rounded-full block absolute bottom-0 right-0 aspect-square p-1">
              5
            </span>
            <div>
              <FaCartShopping />
            </div>
          </Link>
          <button
            onClick={() => setMenuStatus((prev) => !prev)}
            className="w-12 h-12 grid place-items-center bg-white/10 cursor-pointer text-3xl rounded-full"
          >
            <HiBars3BottomRight />
          </button>
        </div>
      </div>

      <div
        className={`sidebarPublic w-64 h-screen overflow-hidden bg-white fixed top-0 right-0 z-40 transition-all duration-100 grid place-items-center p-5 ${
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
          {menuList.map(({ path, text, loggedOrNot }) => (
            <li key={path} className="w-full">
              <NavLink
                to={path}
                className="block transition-all duration-75 hover:bg-primaryColor hover:text-white rounded-md p-2 w-full"
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
