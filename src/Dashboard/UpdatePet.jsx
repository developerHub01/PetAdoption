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
        petCategory: newPetCategory.value,
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
            Update Pet
          </h2>
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 justify-center text-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form className="w-full flex flex-col gap-5 pt-4 text-center">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full">
                    <Field
                      type="text"
                      name="petName"
                      className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                      placeholder="Pet name"
                    />
                    <ErrorMessage name="petName" />
                  </div>
                  <div className="w-full">
                    <Field
                      type="number"
                      name="petAge"
                      className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                      placeholder="age"
                    />
                    <ErrorMessage name="petAge" />
                  </div>
                </div>

                <Select
                  placeholder="category"
                  className="basic-single text-left"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="petCategory"
                  options={options}
                  defaultValue={options.find(
                    (item) => item.value === petCategory
                  )}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: primaryColor,
                      primary25: changeColorOpacity(primaryColor, 0.5),
                      neutral80: primaryColor,
                    },
                    textAlign: "left",
                  })}
                  value={newPetCategory}
                  onChange={(data) => setNewPetCategory(data)}
                />
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
                  ref={updateImageRef}
                  hidden
                />

                <Field
                  type="text"
                  name="petLocation"
                  className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                  placeholder="Pet location"
                />
                <ErrorMessage name="petLocation" />
                <Field
                  as="textarea"
                  name="petShortDescription"
                  className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor resize-none min-h-[100px]"
                  placeholder="Short Description"
                />
                <ErrorMessage name="petShortDescription" />
                <Field
                  as="textarea"
                  name="petLongDescription"
                  className="w-full p-2 outline-none text-primaryColor capitalize border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor resize-none min-h-[200px]"
                  placeholder="Long Description"
                />
                <ErrorMessage name="petLongDescription" />
                <button
                  type="submit"
                  className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80`}
                >
                  Singup
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

export default UpdatePet;
