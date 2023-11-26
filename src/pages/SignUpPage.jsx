import React, { useContext, useState } from "react";
import Container from "../components/Container.jsx";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiSolidLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePasswordVarification from "../customHook/usePasswordVarification.js";
import * as EmailValidator from "email-validator";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/config";
import { AuthContext } from "../customProvider/AuthProvider.jsx";
import { toast } from "react-toastify";
const animProp = "transition-all duration-100 ease-in-out";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant.js";
import SocialLogin from "../components/SocialLogin.jsx";

const bgImg =
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const SignUpPage = () => {
  const { googleSignIn, setUser, signUpUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSignUp = (data) => {
    const { name, profileImg, email, password } = data;
    console.log(data);

    if (!EmailValidator.validate(email)) {
      return toast("Email is not valid");
    }

    if (!usePasswordVarification(password)) {
      return toast(
        "Password must contain a uppercase and one special character and minimum length 6"
      );
    }
    signUpUser(email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profileImg,
        })
          .then(() => {
            toast("Signup successful");
            setUser((prev) => data);
            navigate("/");
          })
          .catch((error) => {
            toast(error.message);
          });
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const [profileImg, setProfileImg] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      const formDate = new FormData();
      formDate.append("profileImg", profileImg);
      for (let key in values) {
        formDate.append(key, values[key]);
      }
      const { name, email, password } = values;
      console.log(name, profileImg, email, password);

      if (!EmailValidator.validate(email)) {
        return toast("Email is not valid");
      }

      if (!usePasswordVarification(password)) {
        return toast(
          "Password must contain a uppercase and one special character and minimum length 6"
        );
      }
      signUpUser(email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: profileImg,
          })
            .then(() => {
              toast("Signup successful");
              setUser((prev) => data);

              navigate("/");
            })
            .catch((error) => {
              toast(error.message);
            });
        })
        .catch((error) => {
          toast(error.message);
        });
      resetForm();
    },
  });

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

  return (
    <section
      className="py-10 bg-white min-h-[80vh]"
      style={{
        background: `url('${bgImg}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Container mxw="max-w-2xl">
        <div className="w-full h-full py-9 px-5 bg-white/5 shadow-xl backdrop-blur-lg">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-primaryColor capitalize pb-5 font-headingFont">
            Signup
          </h2>
          <div className="w-full max-w-md mx-auto flex flex-col gap-5 justify-center text-center">
            <form
              className="w-full flex flex-col gap-5 pt-4 text-center"
              onSubmit={formik.handleSubmit}
            >
              {inputTypes.map(({ type, placeholder, name }, i) => (
                <React.Fragment key={i}>
                  <input
                    type={type}
                    placeholder={placeholder}
                    {...formik.getFieldProps(name)}
                    className="w-full px-4 py-2 bg-primaryColor/80 hover:bg-primaryColor border-b-4 border-primaryColor outline-none text-white placeholder:text-white/80 text-center"
                  />
                  {formik.touched[name] && formik.errors[name] && (
                    <div>{formik.errors[name]}</div>
                  )}
                </React.Fragment>
              ))}
              <label
                htmlFor="profileImg"
                className="self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80 cursor-pointer"
              >
                Upload Profile Image
              </label>

              <input
                id="profileImg"
                type="file"
                accept="image/*"
                {...formik.getFieldProps("profileImg")}
                className="w-full px-4 py-2 bg-primaryColor/80 hover:bg-primaryColor border-b-4 border-primaryColor outline-none text-white placeholder:text-white/80 text-center"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setProfileImg((prev) => e.target.files[0]);
                }}
                hidden
              />
              {formik.touched["profileImg"] && formik.errors["profileImg"] && (
                <div>{formik.errors["profileImg"]}</div>
              )}
              <button
                type="submit"
                className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80`}
              >
                Singup
                <span className="text-xl">
                  <BiSolidLogIn />
                </span>
              </button>
            </form>

            <Link to="/login" className="underline capitalize">
              Already have an account
            </Link>
            <SocialLogin />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUpPage;
