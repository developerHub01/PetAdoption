import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import DashboardMain from "../Dashboard/DashboardMain";
import DashboardHome from "../Dashboard/DashboardHome";
import Users from "../Dashboard/Users";
import AddPet from "../Dashboard/AddPet";
import AllPets from "../Dashboard/AllPets";
import MyAddedPets from "../Dashboard/MyAddedPets";
import UpdatePet from "../Dashboard/UpdatePet";
import PetList from "../pages/PetList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petlist",
        element: <PetList />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardMain />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "addpet",
        element: <AddPet />,
      },
      {
        path: "allpets",
        element: <AllPets />,
      },
      {
        path: "myaddedpets",
        element: <MyAddedPets />,
      },
      {
        path: "update/:_id",
        element: <UpdatePet />,
        // element: <h1 className="text-red-700 text-6xl">Hello</h1>,
      },
    ],
  },
]);

const AllRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AllRoutes;
