import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
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

const UpdatePet = () => {
  const { _id } = useParams();
  const { data, isLoading } = useFetchPetById(_id);
  const [newPetCategory, setNewPetCategory] = useState(options[0]);
  const updateImageRef = useRef(null);
  if (isLoading) return <h1>Loadingl........</h1>;

  if (!data) return;

  const {
    petName,
    petAge,
    petImage,
    petLocation,
    petShortDescription,
    petLongDescription,
    petAuthorEmail,
    petCategory,
  } = data;

  const initialValues = {
    petName,
    petAge,
    petLocation,
    petShortDescription,
    petLongDescription,
  };

  const validationSchema = Yup.object({
    petName: Yup.string().required("Required"),
    petAge: Yup.number().required("Required"),
    petLocation: Yup.string().required("Required"),
    petShortDescription: Yup.string().required("Required"),
    petLongDescription: Yup.string().required("Required"),
  });

  const handleUpdatePet = (values, res) => {
    axios
      .patch(`${serverApi}/pet/${_id}`, {
        ...values,
        petImage: res ? res.data.data.url : petImage,
        petAuthorEmail: petAuthorEmail,
        petCategory: newPetCategory.value || petCategory,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Updated Successfully",
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

  const handleSubmit = (values) => {
    let petImage = updateImageRef?.current?.files[0];
    if (!values || !newPetCategory.value)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill all field",
      });
    if (!petImage) return handleUpdatePet(values);
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
        if (!petAuthorEmail) return;
        handleUpdatePet(values, res);
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
      petCategory={options.find((item) => item.value === petCategory)}
      setPetCategory={setNewPetCategory}
      prefix="Update"
    />
  );
};

export default UpdatePet;
