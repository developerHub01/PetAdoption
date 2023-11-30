import React from "react";
import Container from "../components/Container";
import { handleTimeFormatFromUTC } from "../constant/constant";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";

const CampaignTable = ({
  totalCampaign,
  campaignList,
  handleActiveStatus,
  handleDeleteCampaign,
  numberOfUser,
  page,
  setPage,
  isPreviousData,
  tableHeadingList,
}) => {
  const progress = (maxDonationAmount, donatedAmount) =>
    (donatedAmount * 100) / maxDonationAmount;

  return (
    <Container>
      <h1 className="text-2xl text-center font-bold text-primaryColor">
        Campaign List ({totalCampaign})
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full rtl:text-right text-white text-center rounded-md overflow-hidden text-base font-normal">
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
            {campaignList.map(
              (
                {
                  _id,
                  petName,
                  donationAuthorEmail,
                  petImage,
                  maxDonationAmount,
                  donatedAmount,
                  lastDate,
                  donationStatusActive,
                },
                key
              ) => (
                <tr
                  key={_id}
                  className={`bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20 border-b`}
                >
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    {key + 1}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    <Link
                      to={`/campaign/${_id}`}
                      target="_blank"
                      className="underline"
                    >
                      {petName}
                    </Link>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {donationAuthorEmail}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap grid place-items-center">
                    <Link
                      to={`/campaign/${_id}`}
                      target="_blank"
                      className="block w-10 h-10 rounded-full overflow-hidden border-2 border-primaryColor"
                    >
                      <img
                        src={petImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    <span className="flex gap-2 justify-center items-center">
                      {donatedAmount} <BiDollar />
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    <span className="flex gap-2 justify-center items-center">
                      {maxDonationAmount} <BiDollar />
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <span className="font-bold text-base">
                        {progress(maxDonationAmount, donatedAmount)} %
                      </span>
                      <span
                        className={`block w-full min-w-[100px] h-2 relative bg-primaryColor/25 rounded-full overflow-hidden z-0`}
                      >
                        <span
                          className={`absolute h-full block top-0 left-0 bg-primaryColor rounded-full z-20`}
                          style={{
                            width: `${progress(
                              maxDonationAmount,
                              donatedAmount
                            )}%`,
                          }}
                        ></span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    {handleTimeFormatFromUTC(lastDate)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    {donationStatusActive ? "Active" : "Paused"}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    <button
                      className="px-3 py-1 text-base bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                      onClick={() =>
                        handleActiveStatus(_id, donationStatusActive)
                      }
                    >
                      {donationStatusActive ? "Pause" : "Active"}
                    </button>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap capitalize">
                    <Link
                      to={`/dashboard/campaign/update/${_id}`}
                      className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                    >
                      <GrUpdate />
                    </Link>
                  </td>
                  {tableHeadingList.includes("delete") && (
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <button
                        className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                        onClick={() => handleDeleteCampaign(_id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center gap-5">
        <button
          className={`text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer ${
            page || "pointer-events-none opacity-50"
          }`}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          Prev
        </button>
        <span className="text-primaryColor">Current Page: {page + 1}</span>
        <button
          className={`text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 cursor-pointer ${
            (isPreviousData ||
              totalCampaign - (page + 1) * numberOfUser <= 0) &&
            "pointer-events-none opacity-50"
          }`}
          onClick={() => !isPreviousData && setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default CampaignTable;
