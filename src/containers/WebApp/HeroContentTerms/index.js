import React, { useState, useEffect } from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea from "./herocontentterms.style";

const HeroContentTerms = () => {
  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Heading as="h1" content="Terms and Condition" />
        <div>
          <h2>Introduction</h2>
          <p>
            Welcome to{" "}
            <a
              href="http://www.speedyslotz.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.speedyslotz.com
            </a>
            . This app and website are provided to offer a scheduling platform,
            allowing users across the US to discover and book available slots
            with a variety of service providers. By accessing and using our
            services, users agree to abide by the following terms and
            conditions.
          </p>
        </div>
        <div>
          <h2>Data Collection and Use</h2>
          <p>
            We retrieve data from Yelp to provide our users with accurate and
            up-to-date information on various service providers. This data is
            stored in our own database for efficient access and retrieval. We
            respect the intellectual property rights of Yelp and other third
            parties, and we only use this data for legitimate purposes related
            to our services.
          </p>
        </div>
        <div>
          <h2>Booking</h2>
          <p>
            Users can search for various service categories. Based on their
            preferences, our system will offer available service providers and
            their respective time slots. When a user selects a slot, they are
            required to provide specific profile details. This information helps
            the provider gain a better understanding of the booking and allows
            them to confirm it accordingly.
          </p>
        </div>
        <div>
          <h2>Provider Slot Management</h2>
          <p>
            Service providers are responsible for opening up slots for
            end-users. We encourage providers to ensure the accuracy and
            availability of these slots. Once a slot is booked, it's the
            provider's responsibility to honor that booking or communicate any
            changes directly to the user.
          </p>
        </div>
        <div>
          <h2>Authentication</h2>
          <p>
            We use the Keycloak server to provide authentication and
            authorization for our services. This ensures that user data is
            secured and only accessible by authorized individuals. Users are
            responsible for keeping their login credentials confidential.
          </p>
        </div>
        <div>
          <h2>Changes to Terms</h2>
          <p>
            We may update our Terms and Conditions from time to time to reflect
            changes in our services, legal and regulatory requirements, or for
            other reasons. We encourage users to regularly review our terms to
            stay informed. Continued use of our services after changes have been
            made implies acceptance of those changes.
          </p>
        </div>
        <div>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms, please
            contact us at{" "}
            <a href="mailto:info@speedyslotz.com">info@speedyslotz.com</a>. We
            are always available to address your concerns and provide clarity
            where needed.
          </p>
        </div>
      </Container>
    </BannerArea>
  );
};

export default HeroContentTerms;
