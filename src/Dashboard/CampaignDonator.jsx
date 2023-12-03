import React, { useContext } from "react";
import Container from "../components/Container";
import { HiMiniXMark } from "react-icons/hi2";
import { BiDollar } from "react-icons/bi";
import { Scrollbar } from "react-scrollbars-custom";
import useAxiosPrivate from "../AxiosInstance/useAxiosPrivate";
import { AuthContext } from "../customProvider/AuthProvider";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";

const CampaignDonator = ({ setCampaignDonatorStatusOpen }) => {
  const { user } = useContext(AuthContext);
  const privateAxios = useAxiosPrivate();

  if (!user) return <Loader />;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["donators", user?.email],
    queryFn: () =>
      privateAxios.get(`/donators/${user?.email}`).then((res) => res.data),
  });

  if (!user || isLoading) return <Loader />;

  console.log(data);
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
              {data?.map(
                ({ _id, email, donatonAmount, fullName, profilePic }) => (
                  <li
                    key={_id}
                    className="w-full rounded-md hover:bg-white transition-all duration-100 p-2 flex justify-between items-center gap-3"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-primaryColor">
                        <img
                          src={profilePic}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg text-primaryColor font-semibold">
                        {fullName}
                      </h3>
                    </div>
                    <span className="text-primaryColor font-medium text-lg flex justify-center items-center gap-1">
                      {donatonAmount} <BiDollar />
                    </span>
                  </li>
                )
              )}
            </ul>
          </Scrollbar>
        </div>
      </Container>
    </div>
  );
};

export default CampaignDonator;
