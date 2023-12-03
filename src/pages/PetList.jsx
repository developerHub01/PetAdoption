import React, { useState } from "react";
import Banner from "../components/Banner";
import { Form, Field, Formik } from "formik";
import Select from "react-select";
import {
  changeColorOpacity,
  options,
  primaryColor,
  serverApi,
} from "../constant/constant";
import Container from "../components/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PetCards from "../components/PetCards";
import Loader from "../components/Loader";
import useAxiosPublic from "../AxiosInstance/useAxiosPublic";

const petBannerImg =
  "https://images.unsplash.com/photo-1496284427489-f59461d8a8e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const PetList = () => {
  const petListOptions = [{ value: "", label: "All" }, ...options];
  const [categoryName, setCategoryName] = useState(petListOptions[0]);
  const [filteredData, setFilteredData] = useState([]);
  const publicAxios = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: () =>
      publicAxios.get("/pet").then((res) => {
        const responseData = res.data.data;
        setFilteredData((prev) => responseData);
        return responseData;
      }),
  });

  if (isLoading) return <Loader />;

  const handleSubmit = ({ searchText }) => {
    axios
      .get(
        `${serverApi}/petDataByQuery?searchText=${searchText}&petCategory=${categoryName.value}`
      )
      .then((res) => res.data)
      .then((data) => setFilteredData((prev) => data));
  };
  return (
    <section>
      <Banner title="Out Pet List" bgImgLink={petBannerImg} />
      <section className="py-12">
        <Container>
          <div className="w-full px-5 py-10 my-5 shadow-xl">
            <Formik
              initialValues={{ searchText: "" }}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form className="w-full grid md:grid-cols-2 gap-2">
                <div className="w-full h-full">
                  <Field
                    name="searchText"
                    type="text"
                    className="w-full h-full border-2 border-primaryColor outline-none px-4 py-2 md:py-1 text-primaryColor rounded-t-md md:rounded-tl-md md:rounded-tr-none md:rounded-s-md"
                    placeholder="Search what is in your mind..."
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <Select
                    placeholder="category"
                    className="basic-single text-left rounded-bl-md md:rounded-none"
                    classNamePrefix="select"
                    defaultValue={categoryName}
                    isSearchable={true}
                    name="category"
                    options={petListOptions}
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
                    onChange={(data) => setCategoryName(data)}
                  />
                  <button
                    type="submit"
                    className="text-base bg-primaryColor text-white grid place-items-center py-1 px-4 cursor-pointer rounded-br-md md:rounded-e-md"
                  >
                    Serach
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredData?.map((item) => (
              <PetCards key={item._id} {...item} />
            ))}
          </div>
        </Container>
      </section>
    </section>
  );
};

export default PetList;
