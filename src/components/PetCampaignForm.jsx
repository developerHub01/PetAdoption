import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import Container from "./Container";
import { AuthContext } from "../customProvider/AuthProvider";
import { HiMiniXMark } from "react-icons/hi2";
import useAxiosPrivate from "../AxiosInstance/useAxiosPrivate";
import useFetchCartList from "../useCustomHooks/useFetchCartList";
import Loader from "./Loader";

const PetCampaignForm = ({ campaignId, setCampaignFormStateOpen }) => {
  const { user } = useContext(AuthContext);
  const [donationAmount, setDonationAmount] = useState(0);
  const privateAxios = useAxiosPrivate();
  if (!user) return <Loader />;
  const { refetch } = useFetchCartList(user?.email);

  const { email } = user;

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (!donationAmount) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Donation amount is not valid",
      });
    }
    privateAxios
      .post("/donate", {
        capaignId: campaignId,
        email,
        donatonAmount: donationAmount,
      })
      .then((res) => {
        if (res.data.error) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.error,
          });
        }

        refetch();
        Swal.fire({
          title: "Success",
          text: "Add To Cart Successfully",
          icon: "success",
        });
        setCampaignFormStateOpen((prev) => !prev);
      });
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full grid place-items-center bg-black/30 z-50">
      <Container mxw="max-w-2xl">
        <div className="w-full h-full py-9 px-5 bg-white/10 shadow-xl backdrop-blur-xl relative rounded-md">
          <HiMiniXMark
            className="absolute w-10 h-10 text-white grid place-items-center top-3 right-3 cursor-pointer"
            onClick={() => setCampaignFormStateOpen((prev) => !prev)}
          />
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-primaryColor capitalize pb-5 font-headingFont">
            Donate Campaign
          </h2>
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 justify-center text-center">
            <form
              className="flex flex-col gap-3"
              onSubmit={handleDonationSubmit}
            >
              <input
                type="number"
                name="amount"
                value={donationAmount}
                id=""
                placeholder="Donation amount..."
                className="w-full bg-white rounded-md p-3 outline-none"
                onChange={(e) => setDonationAmount((prev) => e.target.value)}
              />
              <button
                type="submit"
                className={`self-center flex justify-center items-center gap-3 backdrop-blur-sm capitalize w-full px-4 py-3 bg-primaryColor outline-none text-white placeholder:text-white/80 rounded-md`}
              >
                Add To Cart
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PetCampaignForm;
