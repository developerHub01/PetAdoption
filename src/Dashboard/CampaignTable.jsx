import React from "react";
import Container from "../components/Container";
import { handleTimeFormatFromUTC } from "../constant/constant";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const tableHeadingList = [
  "SN",
  "Pet name",
  "Author Email",
  "Pet Image",
  "Total Donation",
  "Max Donation",
  "Last Date",
  "status",
  "Action",
  "Delete",
];
const CampaignTable = ({
  totalCampaign,
  campaignList,
  handleActiveStatus,
  handleDeleteCampaign,
  numberOfUser,
  page,
  setPage,
  isPreviousData,
}) => {
  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl text-center font-bold text-primaryColor">
          Users List ({totalCampaign})
        </h1>
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
                      <Link to="/" className="underline">
                        {petName}
                      </Link>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {donationAuthorEmail}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap grid place-items-center">
                      <Link
                        to="/"
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
                      {donatedAmount}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {maxDonationAmount}
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
                      <button
                        className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                        onClick={() => handleDeleteCampaign(_id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
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
    </div>
  );
};

export default CampaignTable;
