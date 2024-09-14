import React, { useState } from "react";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";

import Input from "common/components/Input";
import Text from "common/components/Text";
import BannerArea, { Col } from "./herocontentforgotpassword.style"; // Adjust the import path as needed
import forgotbanner from "common/assets/image/webApp/forgotbanner.svg";
import { forgotPassword } from "common/api/api";
import ImageLoader from "common/components/Loader/imageLoader";

const HeroContentForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState({ bool: false, msg: "" });
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [imageBool, setImageBool] = useState(true);

  const handleChange = (field, value) => {
    setErrors({});
    setEmail(value);
  };

  const emailValidation = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const forgotUserPassword = async (e) => {
    e.preventDefault();
    setFormError({ bool: false, msg: "" });
    if (!emailValidation(email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    try {
      const response = await forgotPassword(email);

      if (response && response?.data?.payload === "PASSWORD_LINK_SENT") {
        setIsLinkSent(true);
        setFormError({ bool: false, msg: "" });
      } else {
        setFormError({
          bool: true,
          msg: "Failed to send reset link. Please try again.",
        });
      }
    } catch (error) {
      setFormError({ bool: true, msg: "An error occurred. Please try again." });
    }
  };

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        {isLinkSent ? (
          <Col className="formBox">
            <Heading as="h2" content="Success!" />
            <h5>
              Password reset link has been sent successfully. Please check the
              given email address.
            </h5>
          </Col>
        ) : (
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
                  marginTop: "-15px",
                }}
              ></i>
              <Heading as="h2" content="Forgot Your Password" />
            </Col>
            <h5>You will receive instructions for reseting your password.</h5>
            {errors.email && <span className="errorColor">{errors.email}</span>}
            <Input
              name="email"
              value={email}
              onChange={(value) => handleChange("email", value)}
              placeholder="Your Email Address"
              required={true}
              icon={
                <i
                  className="fa-regular fa-envelope formIconStyle"
                  style={{ marginTop: "10px" }}
                ></i>
              }
              aria-label="input"
              className="input"
            />
            {formError.bool && (
              <span className="errorColor">{formError.msg}</span>
            )}
            <Box className="ButtonWrap">
              <Link href="#" className="Button" onClick={forgotUserPassword}>
                Submit
                <Icon size={18} icon={androidArrowForward} />
              </Link>
            </Box>
          </Col>
        )}
        <Box className="bannerImage">
          <Image
            src={forgotbanner}
            alt="Forgot Password Banner"
            width={500}
            height={300}
            placeholder="blur"
            onLoad={() => setImageBool(true)}
            onLoadingComplete={() => setImageBool(false)}
            onError={(e) => {
              e.target.src = "/assets/images/imageplace.svg";
              e.target.style.width = "100%";
            }}
            blurDataURL="/assets/images/imageplace.svg"
          />
          {imageBool && <ImageLoader contentBool={imageBool} />}
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentForgotPassword;
