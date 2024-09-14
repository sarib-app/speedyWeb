import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import CardInput from "./CardInput";
import { baseApiUrl } from "common/api/urlConfig";
import Box from "common/components/Box";
import Text from "common/components/Text";
import Switch from "common/components/Switch";
import Heading from "common/components/Heading";
import { androidDone } from "react-icons-kit/ionicons/androidDone";
import { Icon } from "react-icons-kit";
import {
  MONTHLY_PRICING_DATA,
  MONTHLY_PRICING_DATA_PAYMENT,
} from "common/data/WebApp";
import styled from "styled-components";
import DiscountImage from "common/assets/image/webApp/discount.png";
import Image from "next/image";
const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
  discountInfo: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
});

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f9ab55;
`;
const FooterNote = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px; // Adjust as needed to fit your layout
  text-align: center;
`;

// Additional styles
const SuccessMessage = styled.div`
  padding: 10px 20px;
  background-color: #4bb543; // Green for success
  color: white;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 20px;
  display: ${({ show }) => (show ? "block" : "none")};
`;
const Section = styled.section`
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Col = styled.div`
  flex: 1;
  min-width: 220px;
  margin-right: 20px;
`;

const PriceCard = styled.div`
  position: relative; // Ensure this container can be a reference for absolute positioning
  padding: 15px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: white;

  .discount-badge {
    position: absolute;
    top: 0; // Move it right to the top of the card
    right: 0; // Move it right to the edge of the card
    width: 100px; // Increase width to make the badge larger
    height: auto; // Keep height proportional
    z-index: 1; // Ensure it's above other elements if necessary
  }
`;
const CheckboxContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  label {
    margin-left: 8px;
    font-size: 14px;
    color: #333;
  }
`;

const ConsentCheckbox = styled.input.attrs({ type: "checkbox" })`
  accent-color: #556cd6;
`;

const CardTop = styled.div``;

const PricingAmount = styled.div``;

const CardBody = styled.div``;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #084887;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #063970;
`;

const FormContainer = styled.div`
  flex: 2;
  padding: 20px;
`;
const EmailInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const CouponInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;
const StyledForm = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  margin-top: 20px;
  background-color: ${({ active }) => (active ? "#084887" : "#ccc")};
  color: ${({ active }) => (active ? "white" : "#666")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "#063970" : "#ccc")};
  }
  &:disabled {
    cursor: default;
  }
`;
function PaymentForm({ setActiveSection }) {
  const classes = useStyles();
  const { userData } = useSelector((state) => state.user);
  const [email, setEmail] = useState(userData.email);
  const [coupon, setCoupon] = useState("");
  const [discountDetails, setDiscountDetails] = useState("");
  const [couponError, setCouponError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const authToken = useSelector((state) => state.auth.authToken);
  const [toggleState, setToggleState] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
  };
  const handleEmailChange = (event) => setEmail(event.target.value);
  const monthlyProduct = products.find((product) =>
    product.prices.some((price) => price.interval === "month")
  );
  const yearlyProduct = products.find((product) =>
    product.prices.some((price) => price.interval === "year")
  );
  const [selectedPlan, setSelectedPlan] = useState(
    monthlyProduct ? monthlyProduct.prices[0] : null
  );

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const fetchProducts = async () => {
      try {
        const { data: productsData } = await axios.get(
          `${baseApiUrl}/api/v1/stripe/products`,
          { headers }
        );
        "productsData", productsData;
        if (productsData && Array.isArray(productsData.payload)) {
          setProducts(productsData.payload); // Correctly set the products array

          const monthlyPlans = productsData.payload.filter((p) =>
            p.prices.some((price) => price.interval === "month")
          );
          if (monthlyPlans.length > 0) {
            setSelectedPlan(
              monthlyPlans[0].prices.find((price) => price.interval === "month")
            );
          }
        } else {
          throw new Error("Products data is not in expected format");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setErrorMessage(error.message || "Failed to load products");
      }
    };

    fetchProducts();
  }, [authToken]);

  const handleToggle = () => {
    setToggleState(!toggleState);

    // Assign selected plan based on the new toggle state
    if (!toggleState) {
      // if it was monthly, now it will be yearly
      const yearlyPlan = yearlyProduct.prices.find(
        (price) => price.interval === "year"
      );
      setSelectedPlan(yearlyPlan);
    } else {
      // if it was yearly, now it will be monthly
      const monthlyPlan = monthlyProduct.prices.find(
        (price) => price.interval === "month"
      );
      setSelectedPlan(monthlyPlan);
    }
  };

  const handlePlanChange = (priceId, product) => {
    "Selected product and price:", product.name, priceId;
    const selectedPrice = product.prices.find((price) => price.id === priceId);
    setSelectedPlan(selectedPrice);
  };

  const applyCoupon = async () => {
    // Clear previous states before new API call
    setCouponError("");
    setDiscountDetails("");

    try {
      const response = await axios.get(
        `${baseApiUrl}/api/v1/stripe/coupon/${coupon}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Log the response to see what you are actually getting
      "Coupon Response:", response;

      if (response.data?.valid) {
        setDiscountDetails(
          `Coupon "${response.data.name}" applied: ${response.data.percent_off}% off`
        );
      } else {
        // Utilizing response data or default message to enhance error visibility
        setCouponError(response.data?.message || "Invalid or expired coupon.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      // Include more specific error details if available
      setCouponError(
        `Failed to apply coupon: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    // Check if Stripe is properly initialized
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been properly initialized.");
      return;
    }

    try {
      // Attempt to create a payment method
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: { email },
      });

      if (result.error) {
        console.error("Failed to create payment method:", result.error.message);
        setErrorMessage("Error: " + result.error.message);
        return;
      }

      // Prepare the request for creating the subscription
      const createSubscriptionURL = `${baseApiUrl}/api/v1/stripe/create-subscription`;
      const response = await axios.post(
        createSubscriptionURL,
        {
          paymentMethodId: result.paymentMethod.id,
          email: email,
          planId: selectedPlan.id,
          couponCode: coupon,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      "Subscription response received", response.data;

      // Check if the subscription was successfully created

      if (
        !response.data.success &&
        response.data.warnings &&
        response.data.warnings.length > 0
      ) {
        setErrorMessage(
          (prev) => prev + " " + response.data.warnings.join(", ")
        );

        // Additional handling or state updates for failed subscription creation
      } else {
        "Subscription successful", response.data;
        const fetchSubscriptionURL = `${baseApiUrl}/api/v1/stripe/subscription-details`;

        const subscriptionDetails = await axios.get(fetchSubscriptionURL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          params: {
            email: email,
          },
        });

        "subscriptionDetails", subscriptionDetails;
        if (
          !subscriptionDetails.data.success &&
          subscriptionDetails.data.warnings &&
          subscriptionDetails.data.warnings.length > 0
        ) {
          setErrorMessage(
            (prev) => prev + " " + subscriptionDetails.data.warnings.join(", ")
          );
        } else {
          setActiveSection("plan");
        }
      }
    } catch (error) {
      console.error("Failed to create subscription:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage("Failed to create subscription: " + errorMessage);
    }
  };

  return (
    <Layout>
      <Section>
        <h3>Plan Details</h3>
        <Box className="priceFilter">
          <span>Monthly</span>
          <Switch
            switchColor="#fff"
            checked={toggleState}
            onChange={handleToggle}
          />
          <span>Yearly</span>
        </Box>
        <Row>
          {products
            .filter(
              (product) =>
                product.prices[0].interval === (toggleState ? "year" : "month")
            )
            .map((product, index) => (
              <Col key={index}>
                <PriceCard
                  onClick={() =>
                    handlePlanChange(product.prices[0].id, product)
                  }
                >
                  {product.prices[0].interval === "year" && (
                    <Image
                      src={DiscountImage} // Ensure the path is correct
                      alt="20% Off"
                      className="discount-badge"
                      width={80} // Define width here for Next.js Image component
                      height={80} // Define height proportionally
                    />
                  )}
                  <CardTop>
                    <Heading as="h3" content={product.name} />
                    <PricingAmount>
                      <Heading
                        as="h4"
                        content={`$${(
                          product.prices[0].unit_amount / 100
                        ).toFixed(2)}`}
                      />
                      <Text
                        as="p"
                        content={`Per ${product.prices[0].interval}`}
                      />
                    </PricingAmount>
                  </CardTop>
                  <CardBody>
                    {MONTHLY_PRICING_DATA_PAYMENT?.map((dataItem) => (
                      <ul className="priceList">
                        {dataItem.options?.map((option, index) => (
                          <li key={`priceList-key-${index}`}>
                            <Icon size={20} icon={androidDone} />
                            {option.text}{" "}
                            {/* Assuming each option has a text property */}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </CardBody>
                </PriceCard>
              </Col>
            ))}
        </Row>
      </Section>
      <FormContainer>
        {showSuccessMessage && (
          <SuccessMessage show={showSuccessMessage}>
            Subscription successful! Thank you for your payment.
          </SuccessMessage>
        )}
        <StyledForm onSubmit={handleSubmit}>
          <EmailInput
            type="email"
            placeholder="Enter your email"
            value={email}
            readOnly={true}
            onChange={handleEmailChange}
          />

          <CouponInput
            type="coupon"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />

          <Button
            type="button" // Ensure this is explicitly stated
            onClick={applyCoupon}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Apply Coupon
          </Button>
          {discountDetails && (
            <Typography className={classes.discountInfo}>
              {discountDetails}
            </Typography>
          )}
          {couponError && (
            <Typography className={classes.errorInfo} style={{ color: "red" }}>
              {couponError}
            </Typography>
          )}
          {errorMessage && (
            <Typography className={classes.errorInfo} style={{ color: "red" }}>
              {errorMessage}
            </Typography>
          )}
          <CardInput />
          <CheckboxContainer>
            <ConsentCheckbox
              checked={agreed}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agreement">
              By checking this box, I confirm that I agree to make an immediate
              payment and enroll in an automatic subscription for future service
              periods as described above.
            </label>
          </CheckboxContainer>
          <SubmitButton
            type="submit"
            disabled={!stripe || !agreed}
            active={stripe && agreed}
          >
            Subscribe $
            {selectedPlan ? (selectedPlan.unit_amount / 100).toFixed(2) : ""}
          </SubmitButton>
        </StyledForm>
      </FormContainer>
    </Layout>
  );
}

export default PaymentForm;
