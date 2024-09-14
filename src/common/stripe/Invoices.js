import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseApiUrl } from "common/api/urlConfig";
import styled, { css } from "styled-components";

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f9ab55;
`;

const Section = styled.section`
  background: #f9ab55;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  @media (max-width: 568px) {
    padding: 20px 10px;
  }
`;

const OrderHistorySection = styled(Section)`
  overflow-x: auto;
`;

const OrderTable = styled.div`
  display: table;
  width: 100%;
  margin-top: 20px;
`;

const OrderRow = styled.div`
  display: table-row;
  background: #fff;
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const OrderCell = styled.div`
  display: table-cell;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const CardDetail = styled.span`
  ${(props) =>
    props.isActive &&
    css`
      font-weight: bold;
    `}
`;

const DateStyled = styled.span`
  white-space: nowrap;
`;
const FooterNote = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px; // Adjust as needed to fit your layout
  text-align: center;
`;
const formatInterval = (interval) => {
  if (!interval) return "";
  return interval.charAt(0).toUpperCase() + interval.slice(1) + "ly";
};

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/v1/stripe/invoices/${userData.email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setInvoices(response.data.payload);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch invoices");
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [authToken, userData.email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Section>
      <h3>Invoice History</h3>
      <OrderHistorySection>
        {invoices.length > 0 ? (
          <OrderTable>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Status</th>
                <th>Subscription</th>
                <th>Period</th>
                <th>Plan Status</th>
                <th>Payment Method</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <OrderRow key={invoice.id}>
                  <OrderCell>
                    ${(invoice.amount_due / 100).toFixed(2)}
                  </OrderCell>
                  <OrderCell>{invoice.status}</OrderCell>
                  <OrderCell>
                    {invoice.line_items.map((item, index) => (
                      <div key={index}>{formatInterval(item.planInterval)}</div>
                    ))}
                  </OrderCell>
                  <OrderCell>
                    {invoice.line_items.map((item, index) => (
                      <div key={index}>
                        <DateStyled>
                          {new Date(
                            item.period.start * 1000
                          ).toLocaleDateString(undefined, {
                            month: "short", // "short" for abbreviated month name
                            day: "2-digit", // "2-digit" for two-digit day
                          })}
                        </DateStyled>
                        {" - "}
                        <DateStyled>
                          {new Date(item.period.end * 1000).toLocaleDateString(
                            undefined,
                            {
                              month: "short", // Same format for end date
                              day: "2-digit",
                            }
                          )}
                        </DateStyled>
                      </div>
                    ))}
                  </OrderCell>
                  <OrderCell>
                    {invoice.line_items.map((item, index) => (
                      <div key={index}>
                        {item.planStatus ? "Active" : "Inactive"}
                      </div>
                    ))}
                  </OrderCell>
                  <OrderCell>
                    {invoice.card_brand ? (
                      <CardDetail isActive={invoice.is_card_active}>
                        {invoice.card_brand.toUpperCase()} ****{" "}
                        {invoice.card_last4}
                        {invoice.is_card_active ? " (Active)" : ""}
                      </CardDetail>
                    ) : (
                      "Card Info Not Available"
                    )}
                  </OrderCell>
                  <OrderCell>
                    <a
                      href={invoice.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  </OrderCell>
                </OrderRow>
              ))}
            </tbody>
          </OrderTable>
        ) : (
          <p>No invoices found.</p>
        )}
      </OrderHistorySection>
      <FooterNote>
        *Please note that we do not store any sensitive payment information on
        our servers. All payment data is securely managed by Stripe. If you
        notice any discrepancies or have concerns, please contact our help line
        immediately for assistance.
      </FooterNote>
    </Section>
  );
};

export default Invoices;
