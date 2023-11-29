import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { serverApi } from "../../constant/constant";
const tableHeadingList = [
  "SN",
  "Request Name",
  "Request Email",
  "Phone Number",
  "Address",
  "Pet Image",
  "Pet Name",
  "Accept",
];
const RequestToMe = ({ data, refetch }) => {
  const handleAccept = (_id) => {
    axios
      .get(`${serverApi}/adoptionReqestAccept/${_id}`)
      .then((res) => {
        res.data;
        console.log(res.data);
        Swal.fire({
          title: "Success",
          text: "Accepted Successfully",
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
                name,
                address,
                email,
                phoneNumber,
                petId: { _id, petAuthorEmail, petImage, petName },
                requestAcceptStatus,
              },
              i
            ) => (
              <tr
                key={key}
                className="bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20 border-b"
              >
                <td className="px-6 py-3 whitespace-nowrap capitalize">
                  {i + 1}
                </td>
                <td className="px-6 py-3 whitespace-nowrap ">{name}</td>
                <td className="px-6 py-3 whitespace-nowrap ">{email}</td>
                <td className="px-6 py-3 whitespace-nowrap ">{phoneNumber}</td>
                <td className="px-6 py-3 whitespace-nowrap ">{address}</td>

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
                <td className="px-6 py-3 whitespace-nowrap ">
                  <Link to={`/petdetails/${_id}`}>{petName}</Link>
                </td>
                <td className="px-6 py-3 whitespace-nowrap capitalize">
                  <button
                    className={`px-5 py-1 text-lg ${
                      requestAcceptStatus
                        ? "bg-gray-600 pointer-events-none"
                        : "bg-primaryColor pointer-events-auto"
                    } rounded-full text-white grid place-items-center mx-auto`}
                    onClick={() => handleAccept(_id)}
                  >
                    {requestAcceptStatus ? "Accepted" : "Accept"}
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

export default RequestToMe;
