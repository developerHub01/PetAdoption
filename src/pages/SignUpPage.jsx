import React, { useContext, useRef, useState } from "react";
import Container from "../components/Container.jsx";
import { backgroundImageDefaultStyle } from "../constant/constant";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiSolidLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import usePasswordVarification from "../customHook/usePasswordVarification.js";
import * as EmailValidator from "email-validator";
import { getAuth, updateProfile } from "firebase/auth";
import auth from "../firebase/config";
import { AuthContext } from "../customProvider/AuthProvider.jsx";
import { toast } from "react-toastify";
const animProp = "transition-all duration-100 ease-in-out";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant.js";
import SocialLogin from "../components/SocialLogin.jsx";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
const inputTypes = [
  {
    type: "text",
    placeholder: "Name",
    name: "name",
  },
  {
    type: "email",
    placeholder: "Email address",
    name: "email",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];
const bgImg =
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const SignUpPage = () => {
  const { signUpUser, setUser, setUserProfileImage } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const imageRef = useRef(null);

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .min(6, "Password atleast 6 character")
      .required("Required"),
  });

  const handleSignUp = (values) => {
    const { fullName, email, password } = values;
    console.log(values);

    if (!usePasswordVarification(password)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain a uppercase and one special character and minimum length 6",
      });
    }

    const petImage = imageRef.current.files[0];
    if (!values || !petImage)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all field",
      });
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        { image: petImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const petImage = res?.data?.data?.url;

        signUpUser(email, password)
          .then((userCredential) => {
            updateProfile(getAuth().currentUser, {
              displayName: fullName,
              photoURL: petImage,
            })
              .then(() => {
                axios
                  .post(`${serverApi}/users`, {
                    profilePic: petImage,
                    fullName: fullName,
                    email,
                  })
                  .then((res) => {
                    setUserProfileImage((prev) => petImage);
                    setUser((prev) => getAuth().currentUser);
                    Swal.fire({
                      icon: "success",
                      title: "Signup successful",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate("/");
                  })
                  .catch((error) => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error?.response?.data?.message || error.message,
                    });
                  });
              })
              .catch((error) => {
                console.log(error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error?.response?.data?.message || error.message,
                });
              });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.response?.data?.message || error.message,
            });
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

  return (
    <section
      className="py-10 bg-white min-h-[80vh]"
      style={{
        background: `url('${bgImg}')`,
        ...backgroundImageDefaultStyle,
      }}
    >
      <Container mxw="max-w-2xl">
        <div className="w-full h-full py-9 px-5 bg-white/5 shadow-xl backdrop-blur-lg">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-primaryColor capitalize pb-5 font-headingFont">
            Signup
          </h2>
          <div className="w-full max-w-md mx-auto flex flex-col gap-5 justify-center text-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSignUp(values)}
            >
              <Form className="w-full flex flex-col gap-5 pt-4 text-center">
                <Field
                  type="text"
                  name="fullName"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor rounded-md"
                  placeholder="Full name"
                />
                <ErrorMessage name="fullName" />

                <label
                  htmlFor="updatePetImage"
                  className="w-full p-2 text-lg bg-primaryColor text-white flex justify-start items-center gap-2 rounded-md"
                >
                  <FaImage /> Pet Image...
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="updatePetImage"
                  className="petImage"
                  name="petImage"
                  ref={imageRef}
                  hidden
                />

                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor rounded-md"
                  placeholder="Email"
                />
                <ErrorMessage name="email" />

                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor rounded-md"
                  placeholder="Password"
                />
                <ErrorMessage name="password" />

                <button
                  type="submit"
                  className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80 rounded-md`}
                >
                  Signup
                </button>
              </Form>
            </Formik>

            <Link to="/login" className="underline capitalize">
              Already have an account?
            </Link>
            <SocialLogin />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUpPage;
