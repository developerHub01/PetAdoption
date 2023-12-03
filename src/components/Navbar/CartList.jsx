import React, { useContext } from "react";
import Loader from "../Loader";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetchCartList from "../../useCustomHooks/useFetchCartList";
import { Scrollbar } from "react-scrollbars-custom";
import { AuthContext } from "../../customProvider/AuthProvider";
import useAxiosPrivate from "../../AxiosInstance/useAxiosPrivate";
import Swal from "sweetalert2";
const CartList = () => {
  const { user, userProfileImage } = useContext(AuthContext);
  if (!user) return <Loader />;
  const { data, isLoading, refetch } = useFetchCartList(user?.email);
  if (isLoading) return <Loader />;
  const privateAxios = useAxiosPrivate();
  const handleDeleteCartItem = (_id) => {
    console.log("_id : " + _id);
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
    <div className="absolute top-0 right-0 translate-y-[50px] flex flex-col gap-2 w-72 h-[90vh] max-h-[500px] p-2 bg-white shadow-xl overflow-hidden rounded-md cursor-auto">
      <h2 className="text-2xl text-primaryColor text-center font-bold">
        Cart List (50)
      </h2>
      <Scrollbar className="w-full h-full overflow-hidden">
        <ul className="w-full p-2 overflow-hidden flex flex-col gap-2 flex-grow-0 flex-shrink-0">
          {data?.map(({ _id, capaignId }) => (
            <li
              key={_id}
              className="flex justify-between items-center gap-2 bg-primaryColor/10 p-1 rounded-md"
            >
              <Link
                to={`/campaign/${capaignId._id}`}
                className="w-full text-primaryColor flex justify-start gap-2 items-center"
              >
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex-grow-0 overflow-hidden">
                  <img
                    src={capaignId?.petImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4>{capaignId?.petName}</h4>
              </Link>
              <button
                className="w-9 h-9 flex-grow-0 flex-shrink-0 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                onClick={() => handleDeleteCartItem(_id)}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </Scrollbar>
      <Link
        to="dashboard/payment"
        className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-2 px-4 cursor-pointer"
      >
        Check out now
      </Link>
    </div>
  );
};

export default CartList;
