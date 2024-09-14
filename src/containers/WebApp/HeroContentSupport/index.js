import React from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea, {Col} from "./herocontentsupport.style";
import Image from "common/components/Image";

const HeroContentSupport = () => {
  return (
    <BannerArea id="support_section">
      <Container className="Container">
        <Heading as="h1" content="Support" />
          <div style={{display:'flex'}} className="contact-container">
            <Col>
              <Image src={'/assets/images/support.svg'} alt="support" />
            </Col>
            <Col>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Getting Started</h2>
                <p>
                  If you're new to{" "}
                  <a
                    href="http://www.speedyslotz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.speedyslotz.com
                  </a>
                  , check out our user guides and tutorials to help you navigate and
                  make the most of our platform.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Frequently Asked Questions (FAQs)</h2>
                <p>
                  Visit our FAQ section for answers to commonly asked questions about
                  bookings, profile management, and more.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Technical Issues</h2>
                <p>
                  Encountering technical difficulties? Drop us an email or check out
                  our troubleshooting guide.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Feedback</h2>
                <p>
                  We value your feedback. If you have suggestions or comments about
                  our service, please let us know. Your insights help us improve.
                </p>
              </div>
              <div>
                <h2>L<i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>ive Chat</h2>
                <p>
                  Need immediate assistance? Use our live chat feature to talk to a
                  support representative in real-time.
                </p>
              </div>
              <div>
                <h2><i class="fas fa-location-arrow" style={{width: 18, transform:'rotate(45deg)', marginRight:8}}></i>Contact Us</h2>
                <p>
                  For any other queries, concerns, or specific support needs, feel
                  free to reach out to us at{" "}
                  <a href="mailto:info@speedyslotz.com">info@speedyslotz.com</a>. Our
                  team is always ready to assist you.
                </p>
              </div>
            </Col>
          </div>
      </Container>
    </BannerArea>
  );
};

export default HeroContentSupport;
