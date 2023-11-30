import React, { useContext, useRef } from "react";
import Container from "../components/Container";
import { AuthContext } from "../customProvider/AuthProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaImage } from "react-icons/fa";
import { serverApi } from "../constant/constant";
import Swal from "sweetalert2";
import axios from "axios";

import { useParams } from "react-router-dom";
import useFetchCampaignById from "../useCustomHooks/useFetchCampaignById";
import CampaignForm from "./CampaignForm";
import Loader from "../components/Loader";

const UpdateCampaign = () => {
  const { _id } = useParams();
  const {
    user: { email },
  } = useContext(AuthContext);
  const imageRef = useRef(null);
  const { data, isLoading } = useFetchCampaignById(_id);

  if (isLoading) return <Loader />;
  const {
    petName,
    petImage,
    maxDonationAmount,
    lastDate,
    petShortDescription,
    petLongDescription,
  } = data;

  console.log(data);

  if (!email) return;

  const initialValues = {
    petName,
    maxDonationAmount,
    lastDate: lastDate.split("T")[0],
    petShortDescription,
    petLongDescription,
  };

  const validationSchema = Yup.object({
    petName: Yup.string().required("Required"),
    maxDonationAmount: Yup.number().required("Required"),
    lastDate: Yup.string().required("Required"),
    petShortDescription: Yup.string().required("Required"),
    petLongDescription: Yup.string().required("Required"),
  });

  const handleUpdate = (values, res) => {
    axios
      .patch(`${serverApi}/campaign`, {
        _id,
        ...values,
        petImage: res?.data?.data?.url || petImage,
        donationAuthorEmail: email,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Campaign Created Successfully",
          icon: "success",
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

  const handleSubmit = (values, resetForm) => {
    const newPetImage = imageRef?.current?.files[0];
    if (!values)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all field",
      });

    if (newPetImage) handleUpdate(values);
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
        handleUpdate(values, res);
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
      prefix="Update"
    />
  );
};

export default UpdateCampaign;
