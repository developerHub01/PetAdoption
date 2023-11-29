import React, { useContext, useState } from "react";
import { AuthContext } from "../customProvider/AuthProvider";
import useFetchAdoptionListSendByMe from "../useCustomHooks/useFetchAdoptionListSendByMe";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant";
import Container from "../components/Container";

const MyAdoptionRequest = () => {
  const { user } = useContext(AuthContext);
  const [tabStatus, setTabStatus] = useState("byMe");

  const { email } = user;
  const { data: mySentRequests, isLoading } = useQuery({
    queryKey: ["adoptionRequestByMe", email],
    queryFn: () =>
      fetch(`${serverApi}/adoption?email=${email}`).then((res) => res.json()),
  });

  if (isLoading) return <h1>Loading........</h1>;
  return (
    <>
      <h1>MyAdoptionRequest</h1>
      <Container>
        <div className="w-full grid place-items-center">
          <div className="grid grid-cols-2 gap-1 bg-primaryColor/25 rounded-md p-1">
            <button
              className={`py-2 px-4 capitalize rounded-md transition-all duration-100 ${
                tabStatus === "byMe"
                  ? "bg-primaryColor text-white"
                  : "bg-none text-primaryColor"
              }`}
              onClick={() => setTabStatus((prev) => "byMe")}
            >
              Sent By
            </button>
            <button
              className={`py-2 px-4 capitalize rounded-md transition-all duration-100 ${
                tabStatus === "toMe"
                  ? "bg-primaryColor text-white"
                  : "bg-none text-primaryColor"
              }`}
              onClick={() => setTabStatus((prev) => "toMe")}
            >
              Sent To me
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyAdoptionRequest;
