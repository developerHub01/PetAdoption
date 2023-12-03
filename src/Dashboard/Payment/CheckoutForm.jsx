import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosPrivate from "../../AxiosInstance/useAxiosPrivate";
const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const privateAxios = useAxiosPrivate();
  // const [cart, setCart] =

  // useEffect(() => {
  //   privateAxios.post("/create-payment-intent");
  // }, []);

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
    else setErrorMessage("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <CardElement
        className="p-4 bg-white outline-none text-neutral-900 placeholder:text-neutral-800 rounded-md"
        options={{
          
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
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
