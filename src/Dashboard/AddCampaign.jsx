import React, { useContext, useRef } from "react";
import Container from "../components/Container";
import { AuthContext } from "../customProvider/AuthProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaImage } from "react-icons/fa";
import { serverApi } from "../constant/constant";
import Swal from "sweetalert2";
import axios from "axios";
import CampaignForm from "./CampaignForm";
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
    <CampaignForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      imageRef={imageRef}
      prefix="Add"
    />
  );
};

export default AddCampaign;
