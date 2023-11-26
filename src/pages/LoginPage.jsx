import React, { useContext } from "react";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiSolidLogIn } from "react-icons/bi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../customProvider/AuthProvider";
import { toast } from "react-toastify";
import SocialLogin from "../components/SocialLogin";
const animProp = "transition-all duration-100 ease-in-out";

const LoginPage = () => {
  const { data } = useContext(AuthContext);
  console.log("data ==> " + data);
  const { setUser, signInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignIn = ({ email, password }) => {
    signInUser(email, password)
      .then((result) => {
        setUser((prev) => result.user);
        toast("Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <section className="py-10 bg-whit dark:bg-gray-900">
      <Container mxw="max-w-2xl">
        <>
          <h2 className="text-center text-xl sm:text-4xl font-bold text-white capitalize pb-5 font-headingFont">
            Login
          </h2>
          <div className="w-full max-w-md mx-auto flex flex-col gap-5 justify-center items-center">
            <Formik
              className="w-full"
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={(values) => {
                handleSignIn(values);
              }}
            >
              <Form className="w-full flex flex-col gap-5 pt-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white/10 outline-none hover:bg-white/20 active:bg-white/20 focus:bg-white/20 valid:bg-white/20 backdrop-blur-sm rounded-md"
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-white/10 outline-none hover:bg-white/20 active:bg-white/20 focus:bg-white/20 valid:bg-white/20 backdrop-blur-sm rounded-md"
                />
                <button
                  className={`${animProp} self-center flex justify-center items-center gap-3 text-white bg-white/20 backdrop-blur-sm hover:bg-white/40 px-5 py-3 rounded-md capitalize`}
                >
                  Login
                  <span className="text-xl">
                    <BiSolidLogIn />
                  </span>
                </button>
              </Form>
            </Formik>
            <Link to="/signup" className="underline capitalize">
              Create an account
            </Link>
            <SocialLogin />
          </div>
        </>
      </Container>
    </section>
  );
};

export default LoginPage;
