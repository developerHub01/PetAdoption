import React from "react";
import Container from "../components/Container";
import { HiMiniXMark } from "react-icons/hi2";
import { BiDollar } from "react-icons/bi";
import { Scrollbar } from "react-scrollbars-custom";

const CampaignDonator = ({ setCampaignDonatorStatusOpen }) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/10 grid place-items-center">
      <Container mxw="max-w-lg">
        <div className="relative w-full h-[500px] bg-white/10 backdrop-blur-lg shadow-xl px-5 py-6 rounded-md flex flex-col gap-4">
          <div
            className="w-10 h-10 grid place-items-center bg-white cursor-pointer text-3xl rounded-full text-primaryColor absolute top-2 right-2"
            onClick={() => setCampaignDonatorStatusOpen((prev) => !prev)}
          >
            <HiMiniXMark />
          </div>
          <h2 className="text-2xl text-primaryColor font-bold text-center">
            Donators are...
          </h2>
          <Scrollbar className={`w-full h-full overflow-auto`}>
            <ul className="w-full h-full flex flex-col gap-2 pr-2">
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
              <li className="w-full rounded-md hover:bg-white p-2 flex justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                    <img
                      src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg text-primaryColor font-semibold">
                    Name
                  </h3>
                </div>
                <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                  55 <BiDollar />
                </span>
              </li>
            </ul>
          </Scrollbar>
        </div>
      </Container>
    </div>
  );
};

export default CampaignDonator;
