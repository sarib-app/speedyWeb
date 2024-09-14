import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import BannerArea, { Col } from "../HeroContentContact/herocontentcontact.style";

const HeroContentContact = () => {
  return (
    <BannerArea id="contactus_section">
      <Container className="Container">
        <Heading as="h1" content="Contact Us" />
          <div className="contact-container">
            <Col>
            <Image src="/assets/images/contact-banner.svg" alt="contact banner"/>
            </Col>
            <Col>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Reach Out to Us</h2>
                <p>
                  At{" "}
                  <a
                    href="http://www.speedyslotz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.speedyslotz.com
                  </a>
                  , we prioritize our user's feedback and queries. Whether you have a
                  suggestion, a question about our services, or face any challenges,
                  don't hesitate to contact us. We're here to help.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Email Us</h2>
                <p>
                  The quickest way to reach out to us is through email. Drop us a line
                  at <a href="mailto:info@speedyslotz.com">info@speedyslotz.com</a>{" "}
                  and our team will get back to you as soon as possible.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Feedback</h2>
                <p>
                  Your feedback is invaluable. It helps us improve and serve you
                  better. If you have any suggestions or feedback about our platform,
                  please let us know. We always strive to enhance our user experience.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Stay Connected</h2>
                <p>
                  Follow us on our social media channels to stay updated with our
                  latest features, news, and announcements. We love engaging with our
                  community and hearing from you.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Address</h2>
                <p>
                  SpeedySlotz, SnapTech LLC
                  <br />
                  Northlake, Texas 76226
                </p>
              </div>
            </Col>
          </div>
      </Container>
    </BannerArea>
  );
};

export default HeroContentContact;
