import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { AuthContext } from "../customProvider/AuthProvider";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import useFetchPets from "../useCustomHooks/useFetchPets";
import Select from "react-select";
import { FaImage } from "react-icons/fa";
import { primaryColor, serverApi } from "../constant/constant";
import useFetchPetById from "../useCustomHooks/useFetchPetById";
import Swal from "sweetalert2";
import axios from "axios";
import PetForm from "./PetForm";
const bgImg =
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "hamster", label: "Hamster" },
  { value: "fish", label: "Fish" },
  { value: "hedgehog", label: "Hedgehog" },
  { value: "bird", label: "Bird" },
];

//"rgba(63, 65, 26, 1)"
const changeColorOpacity = (color, opacity) => {
  color = color.split(",");
  color[color.length - 1] = opacity + ")";
  color = color.join(",");
  return color;
};

const AddPet = () => {
  const {
    user: { email },
  } = useContext(AuthContext);
  const [petCategory, setPetCategory] = useState(options[0]);
  const imageRef = useRef(null);

  if (!email) return;

  const initialValues = {
    petName: "",
    petAge: "",
    petLocation: "",
    petShortDescription: "",
    petLongDescription: "",
  };

  const validationSchema = Yup.object({
    petName: Yup.string().required("Required"),
    petAge: Yup.number().required("Required"),
    petLocation: Yup.string().required("Required"),
    petShortDescription: Yup.string().required("Required"),
    petLongDescription: Yup.string().required("Required"),
  });

  const handleSubmit = (values, resetForm) => {
    const petImage = imageRef.current.files[0];
    if (!values || !petImage || !petCategory.value)
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
        if (!email) return;
        axios
          .post(`${serverApi}/pet`, {
            ...values,
            petImage: res.data.data.url,
            petAuthorEmail: email,
            petCategory: petCategory.value,
          })
          .then((res) => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully",
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
    <PetForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      petCategory={petCategory}
      setPetCategory={setPetCategory}
      imageRef={imageRef}
      prefix="Add"
    />
  );
};

export default AddPet;
