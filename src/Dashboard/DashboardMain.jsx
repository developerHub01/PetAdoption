import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardMain = () => {
  return (
    <div className="w-full h-screen overflow-hidden fixed flex">
      <Sidebar />
      <div className="overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardMain;
