import React, { useContext } from "react";
import Container from "../components/Container";
import useAxiosPrivate from "../AxiosInstance/useAxiosPrivate";
import { AuthContext } from "../customProvider/AuthProvider";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
const tableHeadingList = ["Pet Name", "Pet Image", "Donation amount", "refund"];
const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const privateAxios = useAxiosPrivate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my donations", user?.email],
    queryFn: () =>
      privateAxios.get(`/donated/${user?.email}`).then((res) => res.data),
  });

  if (isLoading) return <Loader />;

  const handleRefund = (_id) => {
    privateAxios.delete(`/donate/${_id}`).then((res) => {
      refetch();
      return res.data;
    });
  };

  return (
    <section className="py-14">
      <Container>
        <div className="w-full flex flex-col gap-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-base rtl:text-right text-white text-center rounded-md overflow-hidden">
              <thead className="text-xs text-white uppercase bg-primaryColor border-b-2 border-white select-none">
                <tr>
                  {tableHeadingList.map((item, key) => (
                    <th key={key} className="px-6 py-5 whitespace-nowrap">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map(
                  ({
                    _id,
                    donatonAmount,
                    capaignId: { _id: campaignId, petImage, petName },
                  }) => (
                    <tr
                      key={_id}
                      className={`bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20 border-b`}
                    >
                      <td className="px-6 py-3 whitespace-nowrap grid place-items-center">
                        <Link
                          to={`/campaign/${campaignId}`}
                          className={`block w-10 h-10 rounded-full overflow-hidden border-2 border-primaryColor`}
                        >
                          <img
                            src={petImage}
                            alt={petName}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap capitalize underline">
                        <Link to={`/campaign/${campaignId}`}>{petName}</Link>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap capitalize">
                        {donatonAmount}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap capitalize">
                        <button
                          className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                          onClick={() => handleRefund(_id)}
                        >
                          <IoReturnUpBackOutline />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MyDonations;
