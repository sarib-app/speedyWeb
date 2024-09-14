import React from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea from "./herocontentprivacy.style";

const HeroContentPrivacy = () => {
  return (
    <BannerArea id="privacy_section">
      <Container className="Container">
        <Heading as="h1" content="Privacy Policy" />
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
            . Your privacy is of utmost importance to us. This Privacy Policy
            outlines the types of information we collect, how we use it, and the
            measures we take to keep your data safe.
          </p>
        </div>
        <div>
          <h2>Information Collection</h2>
          <p>
            We collect information when users register, make a booking, or
            interact with our services. This may include name, email, contact
            number, and preferences related to the booking.
          </p>
        </div>
        <div>
          <h2>Usage of Information</h2>
          <p>
            The information collected is used to facilitate bookings, enhance
            user experience, and for communication purposes. We may also use the
            data for marketing or promotional activities, unless you opt out.
          </p>
        </div>
        <div>
          <h2>Sharing of Information</h2>
          <p>
            We do not sell or share your personal information with third parties
            without your consent, except when required by law or as necessary to
            render our services.
          </p>
        </div>
        <div>
          <h2>Cookies</h2>
          <p>
            We use cookies to enhance user experience. You have the option to
            decline these cookies, but it may affect your usage of certain
            features on our website.
          </p>
        </div>
        <div>
          <h2>Data Security</h2>
          <p>
            We employ various measures to ensure the security of your data.
            These include encryption, secure servers, and regular audits.
          </p>
        </div>
        <div>
          <h2>Changes to Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We recommend
            users regularly review our privacy policy to stay informed.
            Continued use of our services after changes have been made implies
            acceptance of those changes.
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

export default HeroContentPrivacy;
