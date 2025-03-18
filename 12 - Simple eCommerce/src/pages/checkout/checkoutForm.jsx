/*
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const checkoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("Payment Method:", paymentMethod);
      setError(null);
      // Send `paymentMethod.id` to backend for processing
      alert("Payment Successful!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default checkoutForm;
*/