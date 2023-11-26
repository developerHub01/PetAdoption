import React, { useContext } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { serverApi } from "../constant/constant";
import { toast } from "react-toastify";
import { AuthContext } from "../customProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser((prev) => result.user);

        const {
          photoURL: profilePic,
          email,
          displayName: fullName,
        } = result.user;

        fetch(`${serverApi}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profilePic,
            email,
            fullName,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate("/");
            toast(data.message);
          })
          .catch((error) => toast(error.message));
      })
      .catch((error) => toast(error.message));
  };
  return (
    <button
      className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80`}
      onClick={handleGoogleSignIn}
    >
      Singup with
      <span className="text-xl">
        <AiOutlineGoogle />
      </span>
    </button>
  );
};

export default SocialLogin;
