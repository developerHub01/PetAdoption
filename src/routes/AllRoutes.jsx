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
import UpdateCampaign from "../Dashboard/UpdateCampaign";
import CampaignDetailsPage from "../pages/CampaignDetailsPage";
import CampaignPage from "../pages/CampaignPage";
import AllCategoryPage from "../pages/AllCategoryPage";
import PrivateRoute from "../SecureRoutes/PrivateRoute";
import AdminRoute from "../SecureRoutes/AdminRoute";
import UnauthorizeToken from "../pages/UnauthorizeToken";

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
        path: "/category",
        element: <AllCategoryPage />,
      },
      {
        path: "/category/:category",
        element: <CategoryPage />,
      },
      {
        path: "/campaign/:_id",
        element: <CampaignDetailsPage />,
      },
      {
        path: "/campaign",
        element: <CampaignPage />,
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
    element: (
      <PrivateRoute>
        <DashboardMain />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <DashboardHome />,
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "addpet",
        element: (
          <PrivateRoute>
            <AddPet />,
          </PrivateRoute>
        ),
      },
      {
        path: "allpets",
        element: (
          <AdminRoute>
            <AllPets />
          </AdminRoute>
        ),
      },
      {
        path: "myaddedpets",
        element: (
          <PrivateRoute>
            <MyAddedPets />
          </PrivateRoute>
        ),
      },
      {
        path: "pet/update/:_id",
        element: (
          <PrivateRoute>
            <UpdatePet />
          </PrivateRoute>
        ),
      },
      {
        path: "campaign/update/:_id",
        element: (
          <PrivateRoute>
            <UpdateCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "myadoptionrequest",
        element: (
          <PrivateRoute>
            <MyAdoptionRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "addcampaign",
        element: (
          <PrivateRoute>
            <AddCampaign />
          </PrivateRoute>
        ),
      },
      {
        path: "allcampaign",
        element: (
          <AdminRoute>
            <AllCampaign />
          </AdminRoute>
        ),
      },
      {
        path: "mycampaign",
        element: (
          <PrivateRoute>
            <MyDonationCampaign />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorizeToken",
    element: <UnauthorizeToken />,
  },
]);

const AllRoutes = () => {
  return <RouterProvider router={routes} />;
};

export default AllRoutes;
