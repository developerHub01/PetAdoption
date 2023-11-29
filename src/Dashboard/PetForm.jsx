import React from "react";
import Container from "../components/Container";
import { backgroundImageDefaultStyle } from "../constant/constant";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import { primaryColor } from "../constant/constant";
import { FaImage } from "react-icons/fa";
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

const PetForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  petCategory,
  setPetCategory,
  imageRef,
  prefix,
}) => {
  return (
    <section
      className="py-10 bg-white min-h-screen grid place-items-center"
      style={{
        background: `url('${bgImg}')`,
        ...backgroundImageDefaultStyle,
      }}
    >
      <Container mxw="max-w-2xl">
        <div className="w-full h-full py-9 px-5 bg-white/5 shadow-xl backdrop-blur-lg">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-primaryColor capitalize pb-5 font-headingFont">
            {prefix} Pet
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
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-full">
                    <Field
                      type="text"
                      name="petName"
                      className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                      placeholder="Pet name"
                    />
                    <ErrorMessage name="petName" />
                  </div>
                  <div className="w-full">
                    <Field
                      type="number"
                      name="petAge"
                      className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                      placeholder="age"
                    />
                    <ErrorMessage name="petAge" />
                  </div>
                </div>

                <Select
                  placeholder="category"
                  className="basic-single text-left"
                  classNamePrefix="select"
                  defaultValue={petCategory}
                  isSearchable={true}
                  name="petCategory"
                  options={options}
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
                  value={petCategory}
                  onChange={(data) => setPetCategory(data)}
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
                  ref={imageRef}
                  hidden
                />

                <Field
                  type="text"
                  name="petLocation"
                  className="w-full p-2 outline-none text-primaryColor border-2 border-transparent focus:border-primaryColor selection:bg-primaryColor selection:text-secondaryColor"
                  placeholder="Pet location"
                />
                <ErrorMessage name="petLocation" />
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
                  className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80`}
                >
                  {prefix} Pet
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

export default PetForm;
