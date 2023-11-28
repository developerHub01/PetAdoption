import React from "react";
import Heading from "./Heading";
import Container from "./Container";
import { Link } from "react-router-dom";

const categoryList = [
  {
    path: "/category/dog",
    imgLink:
      "https://plus.unsplash.com/premium_photo-1681882489001-a364b37a7185?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "dog",
  },
  {
    path: "/category/cat",
    imgLink:
      "https://images.unsplash.com/photo-1574235664854-92e1da7d229a?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "cat",
  },
  {
    path: "/category/rabbit",
    imgLink:
      "https://images.unsplash.com/photo-1585504989076-76dc39c74ac3?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "rabbit",
  },
  {
    path: "/category/hamster",
    imgLink:
      "https://images.unsplash.com/photo-1675069479383-93b0917e2e00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhbXN0ZXJ8ZW58MHwxfDB8fHww",
    title: "hamster",
  },
  {
    path: "/category/fish",
    imgLink:
      "https://images.unsplash.com/photo-1538719501547-bc023056a8b6?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "fish",
  },
  {
    path: "/category/hedgehog",
    imgLink:
      "https://images.unsplash.com/photo-1587210048693-0ec3fde6cc6c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "hedgehog",
  },
  {
    path: "/category/bird",
    imgLink:
      "https://images.unsplash.com/photo-1611582600154-302a9c6da8ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBldCUyMGJpcmR8ZW58MHwxfDB8fHww",
    title: "bird",
  },
];

const CategorySection = () => {
  return (
    <section className="py-14 bg-primaryColor text-white">
      <Container>
        <Heading
          heading="Category"
          description="This is all of the category of pets we have"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categoryList.map(({ title, imgLink, path }) => (
            <div
              key={path}
              className="w-full h-full shadow-xl grid place-items-center bg-white p-5 gap-2 text-center rounded-xl cursor-pointer hover:scale-95 transition-all duration-75 hover:shadow-2xl"
            >
              <div className="w-40 h-40 border-4 border-primaryColor rounded-xl overflow-hidden">
                <img
                  src={imgLink}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex flex-col">
                <h4 className="text-primaryColor capitalize text-2xl font-semibold">
                  {title}
                </h4>
                <Link to={path}>
                  <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;
