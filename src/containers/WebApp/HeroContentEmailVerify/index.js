import React, { useState } from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea, { Col } from "./herocontentemailverify.style";
import { useRouter } from "next/router";
import Box from "common/components/Box";
import Link from "common/components/Link";
import Text from "common/components/Text";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { resendVerifyEmail } from "common/api/api";
import { Icon } from "react-icons-kit";
import Image from "next/image";
import ImageLoader from "common/components/Loader/imageLoader";
import { VERIFY_EMAIL_DATA } from "common/data/WebApp";

import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";

const HeroContentEmailVerify = () => {
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");
  const [imageBool, setImageBool] = useState(true);

  const resendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await resendVerifyEmail(userData);
      if (response.data === "EMAIL_SENT") {
        setMessage(
          "Verification email has been resent successfully. Please check your inbox."
        );
        setMessageColor("green");
      } else if (response.data === "USER_ALREADY_VERIFIED") {
        setMessage(
          "Your email address has already been verified. No action is needed."
        );
        setMessageColor("green");
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
      setMessageColor("red");
    }
    "Resend Email Response:", message;
  };
  const { image } = VERIFY_EMAIL_DATA;

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Col className="formBox">
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              maxWidth: "100%",
            }}
          >
            <i
              className="fa-solid fa-user formIconStyle"
              style={{
                fontSize: "2em",
                height: "1.25em",
                marginRight: "0.5em",
              }}
            ></i>
            <Heading
              as="h2"
              content={"Verify Your Email"}
              style={{ marginBottom: "0px" }}
            />
          </Col>
          <p>
            Please check your email for a link to verify your email address.
            Once verified, you will be able to continue.
          </p>
          <FaEnvelope
            size={50}
            style={{ color: "#084887", margin: "20px 0" }}
          />
          <div style={{ marginBottom: "20px" }}>
            <Box
              className="ButtonWrap"
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              <Text
                as="span"
                style={{ marginLeft: 0 }}
                content="Didn't receive an email?"
              />
              <Link href="#" className="Button" onClick={resendEmail}>
                Resend Email
                <Icon size={18} icon={androidArrowForward} />
              </Link>
            </Box>
          </div>
          {message && <p style={{ color: messageColor }}>{message}</p>}
        </Col>
        <Box className="bannerImage" style={{}}>
          {image.map(({ src }, index) => (
            <div key={`banner_${index}`}>
              <Image
                src={src}
                placeholder="blur"
                onLoad={() => setImageBool(true)}
                onLoadingComplete={() => setImageBool(false)}
                onError={(e) => {
                  e.target.src = "/assets/images/imageplace.svg";
                  e.target.style.width = "100%";
                }}
                blurDataURL="/assets/images/imageplace.svg"
                alt="Register Banner"
                key={`banner-image-key-${index}`}
              />
              {imageBool && <ImageLoader contentBool={imageBool} />}
            </div>
          ))}
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentEmailVerify;
