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
import CategoryPage from "../pages/CategoryPage";
import PetDetailsPage from "../pages/PetDetailsPage";
import MyAdoptionRequest from "../Dashboard/MyAdoptionRequest";
import AddCampaign from "../Dashboard/AddCampaign";
import AllCampaign from "../Dashboard/AllCampaign";
import MyDonationCampaign from "../Dashboard/MyDonationCampaign";

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
        path: "/category/:category",
        element: <CategoryPage />,
      },
      {
        path: "/petdetails/:_id",
        element: <PetDetailsPage />,
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
      },
      {
        path: "myadoptionrequest",
        element: <MyAdoptionRequest />,
      },
      {
        path: "addcampaign",
        element: <AddCampaign />,
      },
      {
        path: "allcampaign",
        element: <AllCampaign />,
      },
      {
        path: "mycampaign",
        element: <MyDonationCampaign />,
      },
    ],
  },
]);

const AllRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AllRoutes;
