import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import { useState } from "react";
import { useSelector } from "react-redux";
const stripePromise = loadStripe(
  "pk_test_51ObOOKDGf0U5GZYvlSMUOBLen1alxpYmTU82H3WuGa92ohFVNkGxWyDL04Iz1u2ApMam8Jj2nsqJR85G0b5Q78nk00MYfD4zUy"
);

const Stripe = ({ setActiveSection }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm setActiveSection={setActiveSection} />
    </Elements>
  );
};

export default Stripe;
