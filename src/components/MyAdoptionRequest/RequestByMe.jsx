import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { serverApi } from "../../constant/constant";
import { Link } from "react-router-dom";

const tableHeadingList = [
  "SN",
  "Pet Author Email",
  "Pet Image",
  "Pet Name",
  "Action",
  "Action",
];

const RequestByMe = ({ data, refetch }) => {
  const handleRemove = (_id) => {
    console.log("====================");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${serverApi}/adoption/${_id}`)
          .then((res) => {
            res.data;
            Swal.fire({
              title: "Success",
              text: "Removed Successfully",
              icon: "success",
            });
            refetch();
          })
          .catch((error) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.response?.data?.message || error.message,
            })
          );
      }
    });
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm rtl:text-right text-white text-center rounded-md overflow-hidden">
        <thead className="text-xs text-white uppercase bg-primaryColor border-b-2 border-white">
          <tr>
            {tableHeadingList.map((item, key) => (
              <th key={key} className="px-6 py-3 whitespace-nowrap">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                _id: key,
                petId: { _id, petAuthorEmail, petImage, petName },
                requestAcceptStatus,
              },
              i
            ) => (
              <tr
                key={_id}
                className="bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20 border-b"
              >
                <td className="px-6 py-3 whitespace-nowrap capitalize">
                  {i + 1}
                </td>
                <td className="px-6 py-3 whitespace-nowrap ">
                  {petAuthorEmail}
                </td>

                <td className="px-6 py-3 whitespace-nowrap grid place-items-center">
                  <Link
                    to={`/petdetails/${_id}`}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-primaryColor"
                  >
                    <img
                      src={petImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <Link to={`/petdetails/${_id}`}>{petName}</Link>
                </td>
                <td className="px-6 py-3 whitespace-nowrap capitalize">
                  <span className="px-5 py-1 text-lg bg-primaryColor rounded-full text-white grid place-items-center mx-auto">
                    {requestAcceptStatus ? "Accepted" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap capitalize">
                  <button
                    className="px-5 py-1 text-lg bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                    onClick={() => handleRemove(_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestByMe;
