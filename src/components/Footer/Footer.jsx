import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const socialIcons = [
  {
    path: "/",
    icon: <FaFacebookF />,
  },
  {
    path: "/",
    icon: <FaInstagram />,
  },
  {
    path: "/",
    icon: <FaTwitter />,
  },
  {
    path: "/",
    icon: <FaYoutube />,
  },
];

const Footer = () => {
  return (
    <footer className="p-4 md:p-8 lg:p-14 bg-primaryColor shadow-2xl drop-shadow-2xl">
      <Container>
        <div className="w-full max-w-3xl mx-auto text-center">
          <Link
            to="/"
            className="text-2xl text-white select-none capitalize font-bold border-b-4 border-white pb-2"
          >
            PetAdopt
          </Link>
          <div classNameName="w-full">
            <p className="my-6 text-gray-200">
              Discover love at PetConnect. Our mission: fostering connections
              between pets and forever families. Explore our diverse community
              and bring joy, laughter, and endless companionship into your home.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3 justify-center items-center mb-6 text-gray-900 dark:text-white">
            {socialIcons.map(({ path, icon }) => (
              <li>
                <Link to={path} className="text-xl">
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
          <span className="text-sm text-white sm:text-center">
            &copy; 2023
            <Link to="/" className="hover:underline inline-block mx-2">
              PetAdoption
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
