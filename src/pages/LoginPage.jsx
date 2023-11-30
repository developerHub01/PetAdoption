import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { backgroundImageDefaultStyle } from "../constant/constant";
import { AuthContext } from "../customProvider/AuthProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SocialLogin from "../components/SocialLogin";
import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

const bgImg =
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const LoginPage = () => {
  const { data } = useContext(AuthContext);
  console.log("data ==> " + data);
  const { setUser, signInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSignIn = ({ email, password }) => {
    signInUser(email, password)
      .then((result) => {
        setUser((prev) => result.user);
        Swal.fire({
          icon: "success",
          title: "Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <section
      className="py-14 bg-white min-h-[80vh]"
      style={{
        background: `url('${bgImg}')`,
        ...backgroundImageDefaultStyle,
      }}
    >
      <Container mxw="max-w-2xl">
        <div className="w-full h-full py-9 px-5 bg-white/5 shadow-xl backdrop-blur-lg rounded-md">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-primaryColor capitalize pb-5 font-headingFont">
            Signup
          </h2>
          <div className="w-full max-w-md mx-auto flex flex-col gap-5 justify-center text-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSignIn(values)}
            >
              <Form className="w-full flex flex-col gap-5 pt-4 text-center">
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
                  Login
                </button>
              </Form>
            </Formik>

            <Link to="/signup" className="underline capitalize">
              Don't have an account?
            </Link>
            <SocialLogin />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
