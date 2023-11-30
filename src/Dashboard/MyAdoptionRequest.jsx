import React, { useContext, useState } from "react";
import { AuthContext } from "../customProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../constant/constant";
import Container from "../components/Container";
import RequestByMe from "../components/MyAdoptionRequest/RequestByMe";
import RequestToMe from "../components/MyAdoptionRequest/RequestToMe";
import Loader from "../components/Loader";

const MyAdoptionRequest = () => {
  const { user } = useContext(AuthContext);
  const [tabStatus, setTabStatus] = useState("byMe");

  const { email } = user;
  const {
    data: allRequestByMe,
    isLoading: allRequestByMeIsLoading,
    refetch: allRequestByMeRefetch,
  } = useQuery({
    queryKey: ["adoptionRequestByMe", email],
    queryFn: () =>
      fetch(`${serverApi}/adoption?email=${email}`).then((res) => res.json()),
  });
  const {
    data: allRequestToMe,
    isLoading: allRequestToMeIsLoading,
    refetch: allRequestToMeRefetch,
  } = useQuery({
    queryKey: ["adoptionRequestToMe", email],
    queryFn: () =>
      fetch(`${serverApi}/adoptionRequestList/${email}`).then((res) =>
        res.json()
      ),
  });

  if (allRequestByMeIsLoading || allRequestToMeIsLoading)
    return <Loader />;

  return (
    <section className="py-14">
      <Container>
        <div className="w-full max-w-lg mx-auto grid grid-cols-2 gap-1 bg-primaryColor/25 rounded-md p-1">
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
        {tabStatus === "byMe" ? (
          <RequestByMe data={allRequestByMe} refetch={allRequestByMeRefetch} />
        ) : (
          <RequestToMe data={allRequestToMe} refetch={allRequestToMeRefetch} />
        )}
      </Container>
    </section>
  );
};

export default MyAdoptionRequest;
