import React, { useContext, useRef } from "react";
import Container from "../components/Container";
import { AuthContext } from "../customProvider/AuthProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaImage } from "react-icons/fa";
import { primaryColor, serverApi } from "../constant/constant";
import Swal from "sweetalert2";
import axios from "axios";
const bgImg =
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AddCampaign = () => {
  const {
    user: { email },
  } = useContext(AuthContext);
  const imageRef = useRef(null);

  if (!email) return;

  const initialValues = {
    petName: "",
    maxDonationAmount: "",
    lastDate: "",
    petShortDescription: "",
    petLongDescription: "",
  };

  const validationSchema = Yup.object({
    petName: Yup.string().required("Required"),
    maxDonationAmount: Yup.number().required("Required"),
    lastDate: Yup.string().required("Required"),
    petShortDescription: Yup.string().required("Required"),
    petLongDescription: Yup.string().required("Required"),
  });

  const handleSubmit = (values, resetForm) => {
    const petImage = imageRef.current.files[0];
    if (!values || !petImage)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all field",
      });

    console.log(values, petImage);
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
        if (!email) return;
        axios
          .post(`${serverApi}/campaign`, {
            ...values,
            petImage: res?.data?.data?.url,
            donationAuthorEmail: email,
          })
          .then((res) => {
            Swal.fire({
              title: "Success",
              text: "Campaign Created Successfully",
              icon: "success",
            });

            resetForm();
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.response?.data?.message || error.message,
            })
          );
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
      className="py-10 bg-white min-h-screen grid place-items-center"
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
            Add Campaign
          </h2>
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 justify-center text-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
            >
              <Form className="w-full flex flex-col gap-5 pt-4 text-center">
                <label
                  htmlFor="updatePetImage"
                  className="w-full p-2 text-lg bg-primaryColor text-white flex justify-start items-center gap-2"
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
                  type="text"
                  name="petName"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                  placeholder="Pet name"
                />
                <ErrorMessage name="petName" />

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Field
                      type="number"
                      name="maxDonationAmount"
                      className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                      placeholder="Max Donation"
                    />
                    <ErrorMessage name="maxDonation" />
                  </div>
                  <div className="w-full">
                    <Field
                      type="date"
                      name="lastDate"
                      className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                      placeholder="Last Date"
                    />
                    <ErrorMessage name="lastDate" />
                  </div>
                </div>

                <Field
                  as="textarea"
                  name="petShortDescription"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor resize-none min-h-[100px]"
                  placeholder="Short Description"
                />
                <ErrorMessage name="petShortDescription" />
                <Field
                  as="textarea"
                  name="petLongDescription"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor resize-none min-h-[200px]"
                  placeholder="Long Description"
                />
                <ErrorMessage name="petLongDescription" />
                <button
                  type="submit"
                  className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80`}
                >
                  Add Campaign
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

export default AddCampaign;
