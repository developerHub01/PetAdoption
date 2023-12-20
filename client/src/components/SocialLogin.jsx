import React, { useContext } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { serverApi } from "../constant/constant";
import { AuthContext } from "../customProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn, facebookSignIn, setUser, setUserProfileImage } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSaveSignInDataInDB = (user) => {
    if (!user) return;
    fetch(`${serverApi}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profilePic: user?.photoURL,
        email: user.email,
        fullName: user.displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserProfileImage((prev) => user?.photoURL);
        setUser((prev) => user);
        navigate("/");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || error.message,
        })
      );
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser((prev) => result.user);
        handleSaveSignInDataInDB(result.user);
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || error.message,
        })
      );
  };

  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then((result) => {
        setUser((prev) => result.user);
        handleSaveSignInDataInDB(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <button
        className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80 rounded-md`}
        onClick={handleGoogleSignIn}
      >
        Singup with
        <span className="text-xl">
          <AiOutlineGoogle />
        </span>
      </button>
      <button
        className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80 rounded-md`}
        onClick={handleFacebookSignIn}
      >
        Singup with
        <span className="text-xl">
          <FaFacebookF />
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
