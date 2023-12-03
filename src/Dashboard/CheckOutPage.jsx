import React, { useContext } from "react";
import Container from "../components/Container";
import useFetchCartList from "../useCustomHooks/useFetchCartList";
import { AuthContext } from "../customProvider/AuthProvider";
import Loader from "../components/Loader";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../AxiosInstance/useAxiosPrivate";
import Payment from "./Payment/Payment";
import useTotalCost from "../useCustomHooks/useTotalCost";
const tableHeadingList = ["Pet Name", "Pet Image", "Donation amount", "Remove"];
const CheckOutPage = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Loader />;
  const { data, isLoading, refetch } = useFetchCartList(user?.email);
  if (isLoading) return <Loader />;

  const privateAxios = useAxiosPrivate();

  const totalCost = useTotalCost(user?.email);
  console.log(totalCost);

  const handleRemoveCart = (_id) => {
    privateAxios
      .delete(`/donate/${_id}`)
      .then((res) => {
        res.data;
        refetch();
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || error.message,
        })
      );
  };
  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-2xl text-center font-bold text-primaryColor">
            Cart List
          </h1>
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
                          onClick={() => handleRemoveCart(_id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Payment />
      </Container>
    </div>
  );
};

export default CheckOutPage;
