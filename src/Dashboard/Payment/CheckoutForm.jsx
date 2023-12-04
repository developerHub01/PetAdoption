import React, { useContext, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosPrivate from "../../AxiosInstance/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../customProvider/AuthProvider";
import Loader from "../../components/Loader";
import useFetchCartList from "../../useCustomHooks/useFetchCartList";
import Swal from "sweetalert2";
const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const privateAxios = useAxiosPrivate();
  const { data, isLoading, refetch } = useFetchCartList(user?.email);
  const {
    data: totalCost,
    isLoading: costLoading,
    refetch: refetchTotalCost,
  } = useQuery({
    queryKey: ["totalCost", user?.email],
    queryFn: () =>
      privateAxios.get(`/donate/${user?.email}`).then((res) => {
        return res.data.reduce((acc, curr) => acc + curr.donatonAmount, 0);
      }),
  });
  useEffect(() => {
    if (totalCost > 0) {
      privateAxios
        .post("/create-payment-intent", { price: totalCost })
        .then((res) =>
          setClientSecret((prev) => {
            res.data.client_secret;
            setClientSecret(res.data.clientSecret);
          })
        );
    }
  }, [privateAxios, totalCost]);

  if (costLoading || isLoading) return <Loader />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) setErrorMessage(error.message);
    else {
      setErrorMessage("");
    }

    const { paymentIntent, error: confirmationError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (paymentIntent) {
      const updatePaymentAndAddToCart = async () => {
        const promises = data.map(async ({ _id }) => {
          try {
            privateAxios.patch(`/donate/${_id}`);
          } catch (error) {
            console.error(`Error fetching data from ${url}:`, error.message);
          }
        });
        await Promise.all(promises);
        Swal.fire({
          title: "Success",
          text: "Donated Successfully",
          icon: "success",
        });
        refetchTotalCost();
        refetch();
      };
      updatePaymentAndAddToCart();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <CardElement
        className="p-4 bg-white outline-none text-neutral-900 placeholder:text-neutral-800 rounded-md"
        options={{}}
      />
      <button
        type="submit"
        disabled={!stripe || !totalCost}
        className="py-2 px-5 bg-white text-primaryColor text-lg rounded-md shadow-2xl"
      >
        Pay
      </button>
      {errorMessage && (
        <p className="w-full text-center inline-block bg-red-700 text-white p-2 rounded-md shadow-lg">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
