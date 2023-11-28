import React, { useState } from "react";
import PetBanner from "../components/PetList/PetBanner";
import { Form, Field, Formik } from "formik";
import Select from "react-select";
import { primaryColor, serverApi } from "../constant/constant";
import Container from "../components/Container";
import useFetchPets from "../useCustomHooks/useFetchPets";
import { hashKey, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import PetLIstCards from "../components/PetList/PetLIstCards";

const options = [
  { value: "", label: "none" },
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

const PetList = () => {
  const [categoryName, setCategoryName] = useState(options[0]);

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: () =>
      fetch(`${serverApi}/pet`)
        .then((res) => res.json())
        .then((data) => {
          setAllData((prev) => data.data);
          setFilteredData((prev) => data.data);
          return data.data;
        }),
  });

  if (isLoading) return <h1>Loading........</h1>;

  const handleSubmit = ({ searchText }) => {
    console.log(searchText);
    console.log(categoryName);
    console.log(
      `${serverApi}/petDataByQuery?searchText=${searchText}&petCategory=${categoryName.value}`
    );

    axios
      .get(
        `${serverApi}/petDataByQuery?searchText=${searchText}&petCategory=${categoryName.value}`
      )
      .then((res) => {
        console.log(res.data);
        setFilteredData((prev) => res.data);
      });
  };

  return (
    <section>
      <PetBanner />
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
                    className="w-full h-full border-2 border-primaryColor outline-none px-4 py-2 md:py-1 text-primaryColor rounded-t-md md:rounded-s-md"
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
            {filteredData.map((item) => (
              <PetLIstCards key={item._id} {...item} />
            ))}
          </div>
        </Container>
      </section>
    </section>
  );
};

export default PetList;
