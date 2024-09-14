import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { baseApiUrl } from "common/api/urlConfig";
import { Icon } from "react-icons-kit";
import { ic_credit_card } from "react-icons-kit/md/ic_credit_card";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcDinersClub,
  FaCcJcb,
} from "react-icons/fa";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9ab55; // Updated background color
  padding: 20px;
`;

const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 10px;
  color: #333;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  color: #666;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-right: 10px; // Added margin for button spacing
  background-color: #084887;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #063970;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px; // Size increased for visibility
`;

const ActiveLabel = styled.span`
  font-weight: bold;
  color: #4caf50; // Green color for visibility
`;
const InactiveLabel = styled.span`
  font-weight: bold;
  color: #eb001b; // Green color for visibility
`;
const FooterNote = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px; // Adjust as needed to fit your layout
  text-align: center;
`;
const Plan = ({ setActiveSection }) => {
  const authToken = useSelector((state) => state.auth.authToken);
  const userData = useSelector((state) => state.user.userData);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const cardIconMap = {
    visa: <FaCcVisa color="#1a1f71" />,
    mastercard: <FaCcMastercard color="#eb001b" />,
    "american express": <FaCcAmex color="#007bc1" />,
    discover: <FaCcDiscover color="#f76b1c" />,
    jcb: <FaCcJcb color="#005790" />, // Add JCB color code as needed
  };

  const handleModification = () => (event) => {
    event.preventDefault();
    `Attempting to change section `;
    setActiveSection("payment");
  };
  useEffect(() => {
    const fetchData = async () => {
      const fetchSubscriptionURL = `${baseApiUrl}/api/v1/stripe/subscription-details`;
      try {
        const subscriptionDetails = await axios.get(fetchSubscriptionURL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          params: {
            email: userData?.email,
          },
        });
        if (
          subscriptionDetails?.data?.success &&
          subscriptionDetails?.data?.payload?.subscriptions?.length > 0
        ) {
          "subscriptionDetails", subscriptionDetails.data.payload;
          setSubscriptionData(subscriptionDetails.data.payload);
        } else {
          setActiveSection("payment");
        }
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };
    fetchData();
  }, [authToken, userData.email]);

  return (
    <Layout>
      <Section>
        <Title>Customer Details</Title>
        {subscriptionData && (
          <DetailRow>
            <DetailLabel>Email:</DetailLabel>
            <div>{subscriptionData.customer.email}</div>
          </DetailRow>
        )}
      </Section>

      <Section>
        <Title>Subscription Details</Title>
        {subscriptionData &&
          subscriptionData.subscriptions.map((subscription, index) => (
            <div key={index}>
              <DetailRow>
                <DetailLabel>ID:</DetailLabel>
                <div>{subscription.id}</div>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Status:</DetailLabel>
                <div>{subscription.status}</div>
              </DetailRow>
              {subscription.items.map((item, idx) => (
                <div key={idx}>
                  <DetailRow>
                    <DetailLabel>Product:</DetailLabel>
                    <div>{item.product.name}</div>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Quantity:</DetailLabel>
                    <div>{item.quantity}</div>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Amount:</DetailLabel>
                    <div>
                      ${item.plan.amount / 100}{" "}
                      {item.plan.currency.toUpperCase()}
                    </div>
                  </DetailRow>
                </div>
              ))}
            </div>
          ))}
      </Section>

      <Section>
        <Title>Payment Methods</Title>
        {subscriptionData &&
          subscriptionData.paymentMethods.map((method, index) => (
            <DetailRow
              key={index}
              style={{
                backgroundColor:
                  method.id === subscriptionData.activePaymentMethodId
                    ? "#cff4fc"
                    : "transparent",
              }}
            >
              <DetailLabel>Card Type:</DetailLabel>
              <IconContainer>
                {cardIconMap[method.brand.toLowerCase()] || cardIconMap["visa"]}
                <div>
                  {method.brand.toUpperCase()} ending in {method.last4}
                </div>
              </IconContainer>
              {method.id === subscriptionData.activePaymentMethodId ? (
                <ActiveLabel> (Active)</ActiveLabel>
              ) : (
                <InactiveLabel> (Inactive)</InactiveLabel>
              )}
            </DetailRow>
          ))}
      </Section>

      <div>
        <Button onClick={() => setActiveSection("payment")}>
          Modify Subscription
        </Button>
        <Button onClick={() => setActiveSection("cancel")}>
          Cancel Subscription
        </Button>
      </div>
      <FooterNote>
        *Please note that we do not store any sensitive payment information on
        our servers. All payment data is securely managed by Stripe. If you
        notice any discrepancies or have concerns, please contact our help line
        immediately for assistance.
      </FooterNote>
    </Layout>
  );
};

export default Plan;
