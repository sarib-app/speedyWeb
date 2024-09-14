import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios"; // Ensure axios is imported
import { baseApiUrl } from "common/api/urlConfig";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9ab55; // Bright background color
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
  font-size: 24px;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #084887;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #063970;
  }
  margin-right: 10px; // Space between buttons
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 10px;
  background: white;
  color: #666;
`;

const CancellationForm = ({ setActiveSection }) => {
  const [reason, setReason] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const userData = useSelector((state) => state.user.userData);
  const authToken = useSelector((state) => state.auth.authToken);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Concatenate reason and additional comments
    const cancellationReason = `Reason: ${reason}. Additional Comments: ${additionalComments}`;
    const createCancelURL = `${baseApiUrl}/api/v1/stripe/cancel-subscription?customerEmail=${userData?.email}&cancellationReason=${cancellationReason}`;

    try {
      const response = await axios.post(
        createCancelURL,
        null, // No request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      "Cancel Response:", response;

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
        "Subscription cancelled successful", response.data;
        setActiveSection("account");
      }
    } catch (error) {
      // Handle error here
      console.error("Error cancelling subscription:", error);
      alert("Error cancelling subscription. Please try again.");
    }
  };

  return (
    <Layout>
      <Section>
        <Title>Cancellation Form</Title>
        <form onSubmit={handleSubmit}>
          <label htmlFor="reason">Reason for cancellation:</label>
          <Select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            <option value="Too Expensive">Too Expensive</option>
            <option value="Not Needed Anymore">Not Needed Anymore</option>
            <option value="Found a Better Alternative">
              Found a Better Alternative
            </option>
            <option value="Other">Other</option>
          </Select>

          <label htmlFor="additionalComments">Additional Comments:</label>
          <TextArea
            id="additionalComments"
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Provide any additional feedback here."
          />

          <div>
            <Button type="submit">Confirm Cancellation</Button>
            <Button onClick={() => setActiveSection("plan")}>Back</Button>
          </div>
        </form>
      </Section>
    </Layout>
  );
};

export default CancellationForm;
