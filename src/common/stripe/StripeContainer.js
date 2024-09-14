import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Plan";
import axios from "axios";
import { baseApiUrl } from "common/api/urlConfig";

const stripePromise = loadStripe(
  "pk_test_51ObOOKDGf0U5GZYvlSMUOBLen1alxpYmTU82H3WuGa92ohFVNkGxWyDL04Iz1u2ApMam8Jj2nsqJR85G0b5Q78nk00MYfD4zUy"
);

const StripeContainer = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const fetchProducts = async () => {
      const { data: productsData } = await axios.get(
        `${baseApiUrl}/api/v1/stripe/products`,
        { headers }
      );
      "productsData", productsData;
      setProducts(productsData);
    };

    if (products.length === 0) {
      fetchProducts().catch((error) => {
        console.error("Failed to fetch products:", error);
        setErrorMessage(error.message || "Failed to load products");
      });
    }
  }, [authToken, products.length]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const createCustomerAndSetupIntent = async () => {
      if (!customer) {
        try {
          const email = "nitinsindhwani@aol.com"; // Consider making this dynamic
          const customerData = await axios.post(
            `${baseApiUrl}/api/v1/stripe/create-customer?email=${encodeURIComponent(
              email
            )}`,
            {},
            { headers }
          );
          "customerData", customerData.data;

          const setupIntentResponse = await axios.post(
            `${baseApiUrl}/api/v1/stripe/create-setup-intent?customerId=${customerData.data.id}`,
            {}, // You may need to pass additional parameters if required
            { headers }
          );
          "setupIntentData", setupIntentResponse.data;
          setClientSecret(setupIntentResponse.data.clientSecret);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to create customer or setup intent:", error);
          setErrorMessage(error.message || "Failed to initialize payment");
          setIsLoading(false);
        }
      }
    };

    createCustomerAndSetupIntent();
  }, []); // Only re-run if authToken changes and customer is not yet set

  // ... rest of your code

  if (isLoading || !clientSecret) {
    return <p>Loading payment information...</p>;
  }

  "Rendering Elements with clientSecret:", clientSecret;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm customer={customer} products={products} />
      {errorMessage && <p>{errorMessage}</p>}
    </Elements>
  );
};

export default StripeContainer;
