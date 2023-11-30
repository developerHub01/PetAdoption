import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "./Container";
import { AuthContext } from "../customProvider/AuthProvider";
import axios from "axios";
import { serverApi } from "../constant/constant";
import Swal from "sweetalert2";
import { HiMiniXMark } from "react-icons/hi2";
import Loader from "./Loader";

const PetCampaignForm = ({ campaignId, setCampaignFormStateOpen }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Loader />;

  const { email, displayName: name } = user;
  const initialValues = {
    name,
    email,
    phoneNumber: "",
    address: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phoneNumber: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log(values);

    if (
      !values.name ||
      !values.email ||
      !values.phoneNumber ||
      !values.address
    ) {
      console.log(values);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || error.message,
      });
    }

    axios
      .post(`${serverApi}/adoption`, { ...values, campaignId })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Donated Successfully",
          icon: "success",
        });
        setCampaignFormStateOpen((prev) => !prev);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || error.message,
        });
        setCampaignFormStateOpen((prev) => !prev);
      });
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full grid place-items-center bg-black/30 z-50">
      <Container mxw="max-w-2xl">
        <div className="w-full h-full py-9 px-5 bg-white/10 shadow-xl backdrop-blur-xl relative rounded-md">
          <HiMiniXMark
            className="absolute w-10 h-10 text-white grid place-items-center top-3 right-3 cursor-pointer"
            onClick={() => setCampaignFormStateOpen((prev) => !prev)}
          />
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-primaryColor capitalize pb-5 font-headingFont">
            Donate Campaign
          </h2>
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 justify-center text-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form className="w-full flex flex-col gap-5 pt-4 text-center">
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor rounded-md"
                  placeholder="Your name"
                />
                <ErrorMessage name="name" />
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full">
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor rounded-md"
                      placeholder="Your email"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div className="w-full">
                    <Field
                      type="number"
                      name="phoneNumber"
                      className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor rounded-md"
                      placeholder="Phone number"
                    />
                    <ErrorMessage name="phoneNumber" />
                  </div>
                </div>
                <Field
                  type="text"
                  name="address"
                  as="textarea"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor max-h-[200px] min-h-[150px] rounded-md"
                  placeholder="Your address"
                />
                <ErrorMessage name="address" />
                <button
                  type="submit"
                  className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80 rounded-md`}
                >
                  Donate
                  <span className="text-xl"></span>
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PetCampaignForm;
