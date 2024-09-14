import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faFileInvoice,
  faMoneyBill1Wave,
  faFileInvoiceDollar,
  faCancel,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import AccountDetails from "common/stripe/AccountDetails";
import Stripe from "common/stripe/Stripe";
import Invoices from "common/stripe/Invoices";
import Plan from "common/stripe/Plan";
import CancellationForm from "common/stripe/CancellationForm";
import {
  BannerArea,
  PageLayout,
  MainContent,
  Sidebar,
} from "./herocontentaccountdetails.style";
import ReferralForm from "common/stripe/ReferralForm";

const HeroContentAccountDetails = () => {
  const [activeSection, setActiveSection] = useState("account"); // Initial section
  const { userData } = useSelector((state) => state.user);

  // Function to handle section change
  const handleSectionChange = (section) => () => {
    `Changing section to: ${section}`;
    setActiveSection(section);
  };

  return (
    <BannerArea id="privacy_section">
      <Container className="Container">
        <Heading as="h2" content="Account Information" />
        <PageLayout>
          <Sidebar>
            <nav>
              <ul>
                <li
                  className={activeSection === "account" ? "active" : ""}
                  onClick={handleSectionChange("account")}
                >
                  <FontAwesomeIcon icon={faReceipt} /> Account
                </li>
                <li
                  className={activeSection === "plan" ? "active" : ""}
                  onClick={handleSectionChange("plan")}
                >
                  <FontAwesomeIcon icon={faMoneyBill1Wave} /> Plan
                </li>

                <li
                  className={activeSection === "invoice" ? "active" : ""}
                  onClick={handleSectionChange("invoice")}
                >
                  <FontAwesomeIcon icon={faFileInvoiceDollar} /> Invoice
                </li>
                <li
                  className={activeSection === "cancel" ? "active" : ""}
                  onClick={handleSectionChange("cancel")}
                >
                  <FontAwesomeIcon icon={faCancel} /> Cancel Subscription
                </li>
                <li
                  className={activeSection === "refer" ? "active" : ""}
                  onClick={handleSectionChange("refer")}
                >
                  <FontAwesomeIcon icon={faGift} /> Refer & Earn
                </li>
              </ul>
            </nav>
          </Sidebar>
          <MainContent>
            {activeSection === "account" && <AccountDetails />}
            {activeSection === "plan" && (
              <Plan setActiveSection={setActiveSection} />
            )}
            {activeSection === "payment" && (
              <Stripe setActiveSection={setActiveSection} />
            )}
            {activeSection === "refer" && (
              <ReferralForm setActiveSection={setActiveSection} />
            )}
            {activeSection === "invoice" && <Invoices />}
            {activeSection === "cancel" && (
              <CancellationForm setActiveSection={setActiveSection} />
            )}
          </MainContent>
        </PageLayout>
      </Container>
    </BannerArea>
  );
};

export default HeroContentAccountDetails;
