import React from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

const tableHeadingList = [
  "pet Image",
  "Author Email",
  "pet Name",
  "pet Age",
  "pet Category",
  "pet Status",
  "Adoption Action",
  "Remove",
  "Update",
];
const PetListTable = ({
  pets,
  totalPet,
  setPage,
  page,
  numberOfUser,
  isPreviousData,
  handleChangePetAdoptionStatus,
  handlePetDelete,
}) => {
  return (
    <div className="py-8">
      <Container>
        <h1 className="text-2xl text-center font-bold text-primaryColor">
          Pet List ({totalPet})
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
              {pets.map(
                ({
                  _id,
                  petImage,
                  petAuthorEmail,
                  petAge,
                  petName,
                  petCategory,
                  petAdoptionStatus,
                }) => (
                  <tr
                    key={_id}
                    className="bg-white text-primaryColor hover:bg-primaryColor/5 border-primaryColor/20 border-b"
                  >
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <Link
                        to={`/petdetails/${_id}`}
                        target="_blank"
                        className="block w-10 h-10 rounded-full overflow-hidden border-2 border-primaryColor mx-auto"
                      >
                        <img
                          src={petImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {petAuthorEmail}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize underline">
                      <Link to={`/petdetails/${_id}`} target="_blank">
                        {petName}
                      </Link>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {petAge}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {petCategory}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      {petAdoptionStatus ? (
                        <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto">
                          Unadopted
                        </button>
                      ) : (
                        <button className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto">
                          Adopted
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <button
                        className="text-base bg-primaryColor rounded-full text-white grid place-items-center py-1 px-4 mx-auto"
                        onClick={() => handleChangePetAdoptionStatus(_id)}
                      >
                        {petAdoptionStatus
                          ? "Change to Adopt"
                          : "Change to Unadopt"}
                      </button>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <button
                        className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                        onClick={() => handlePetDelete(_id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap capitalize">
                      <Link
                        to={`/dashboard/pet/update/${_id}`}
                        className="w-9 h-9 text-xl bg-primaryColor rounded-full text-white grid place-items-center mx-auto"
                      >
                        <GrUpdate />
                      </Link>
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
              (isPreviousData || totalPet - (page + 1) * numberOfUser <= 0) &&
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

export default PetListTable;
