import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "./Container";

const PetAdoptForm = () => {
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

  const handleSubmit = (values) => {
    console.log("Hello");
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full grid place-items-center bg-white/30 z-50">
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

export default PetAdoptForm;
