import React from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea, { Col } from "./herocontentaboutus.style";
import elmo from "common/assets/image/webApp/elmo.jpg";
import AboutUsImage from "common/assets/image/webApp/aboutus-1.svg";
import Solution from "common/assets/image/webApp/solution.svg";
import Vision from "common/assets/image/webApp/vision.svg";
import Image from "next/image";
const HeroContentAboutUs = () => {
  return (
    <BannerArea id="aboutus_section">
      <Container className="Container">
        <Heading as="h1" content="About Us" />

        <div className="section">
          <Col style={{justifyContent:'center'}}>
          <Image loading="lazy" src={AboutUsImage} className="section-image" />
          </Col>
          <Col>
          <div className="section-text">
            <h2>Our Beginning</h2>
            <p>
              It all began with a simple, personal frustration. As a software
              developer, technology has always been a part of my life. But when
              it came to finding a last-minute grooming appointment for Elmo,
              our 6-month-old mini Golden Doodle, technology felt distant.
              Despite being newly vaccinated against rabies and desperately
              needing a trim, I found myself on a seemingly endless call loop
              with various groomers, only to be met with constant rejections.
              With hair covering his eyes and affecting his comfort, it was
              clear Elmo couldn't wait. It struck me: there should be a better
              way. A platform that not only benefits people like me, looking for
              quick appointments but also addresses a pressing issue faced by
              service providers - the problem of same-day cancellations and the
              ensuing loss of business.
            </p>
          </div>
          </Col>
        </div>

        <div className="section-reverse">
          <Col>
          <div className="section-text">
            <h2>A Solution For All</h2>
            <p>
              Cancellations, especially last minute, are detrimental to
              businesses. Filling those slots becomes another challenge, often
              involving frantic calls to existing clients who might not always
              be available or interested in such short notice. This is where
              SpeedySlotz bridges the gap. Our platform provides a hassle-free
              solution where service providers can open specific slots, and
              users can instantly book them. A win-win for everyone involved.
            </p>
          </div>
          </Col>
          <Col style={{justifyContent:'center'}}>
          <Image loading="lazy" src={Solution} className="section-image" />
          </Col>
        </div>

        <div className="section">
          <Col style={{justifyContent:'center'}}>
            <Image loading="lazy" src={Vision} className="section-image" />
          </Col>
          <Col>
          <div className="section-text">
            <h2>Our Vision</h2>
            <p>
              At SpeedySlotz, we aim to streamline and simplify the booking
              process for both customers and service providers. We envision a
              world where getting an appointment is just a click away, saving
              time, energy, and reducing lost opportunities for businesses. Our
              journey with Elmo was just the beginning, and we're excited to be
              part of yours.
            </p>
          </div>
          </Col>
        </div>

        <div className="section">
          <Col>
          <div className="section-text">
            <h2>Contact Us</h2>
            <p>
              To learn more or for any queries, feel free to reach out to us at{" "}
              <a href="mailto:info@speedyslotz.com">info@speedyslotz.com</a>.
              We'd love to hear from you!
            </p>
          </div>
          </Col>
        </div>
      </Container>
    </BannerArea>
  );
};

export default HeroContentAboutUs;
