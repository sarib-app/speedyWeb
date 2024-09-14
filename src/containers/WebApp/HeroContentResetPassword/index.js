import React, { useState, useEffect } from "react";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea, { Col } from "./herocontentresetpassword.style";
import { Icon } from "react-icons-kit";
import Box from "common/components/Box";
import Link from "common/components/Link";
import Input from "common/components/Input";
import Image from "next/image";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import resetpasswordbanner from "common/assets/image/webApp/resetbanner.svg";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import ImageLoader from "common/components/Loader/imageLoader";
import { resetPassword } from "common/api/api";

const HeroContentResetPassword = () => {
  const router = useRouter();
  const userId = router.query.userId;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [imageBool, setImageBool] = useState(true);

  useEffect(() => {
    "userId ", userId;
  }, [userId]);

  const handleChange = (field, value) => {
    if (field === "newPassword") {
      setNewPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const resetUserPassword = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("User ID is missing. Cannot reset password.");
      setMessageColor("red");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await resetPassword(userId, newPassword);
      if (response.data === "PASSWORD_UPDATED") {
        setMessage("Your password has been successfully reset.");
        setMessageColor("green");
        setIsResetSuccess(true);
      } else {
        setMessage(
          "An error occurred while resetting your password. Please try again."
        );
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
      setMessageColor("red");
    }
  };

  const navigateToLogin = () => {
    router.push("../Login");
  };

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        {!isResetSuccess ? (
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
              <Heading as="h2" content="Reset Your Password" />
            </Col>
            {message && <p style={{ color: messageColor }}>{message}</p>}
            <h5>Please enter your new password and confirm it.</h5>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(value) => handleChange("newPassword", value)}
              icon={<i className="fa-solid fa-lock formIconStyle"></i>}
              required={true}
              aria-label="input"
              className="input"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(value) => handleChange("confirmPassword", value)}
              icon={<i className="fa-solid fa-lock formIconStyle"></i>}
              required={true}
              aria-label="input"
              className="input"
            />
            <Box className="ButtonWrap">
              <Link href="#" className="Button" onClick={resetUserPassword}>
                Reset Password
                <Icon size={18} icon={androidArrowForward} />
              </Link>
            </Box>
          </Col>
        ) : (
          <Col className="formBox">
            <Heading as="h2" content="Success!" />
            <h5>
              Your password has been reset successfully. Click below to login
              with your new password.
            </h5>
            <Box className="ButtonWrap" style={{ marginTop: "10px" }}>
              <Link href="#" className="Button" onClick={navigateToLogin}>
                Login
              </Link>
            </Box>
          </Col>
        )}
        <Box className="bannerImage">
          <Image
            src={resetpasswordbanner}
            // placeholder='blur'
            onLoad={() => setImageBool(true)}
            onLoadingComplete={() => setImageBool(false)}
            onError={(e) => {
              e.target.src = "/assets/images/imageplace.svg";
              e.target.style.width = "100%";
            }}
            // blurDataURL="/assets/images/imageplace.svg"
            alt="Reset Password Banner"
            width={500}
            height={300}
          />
          {imageBool && <ImageLoader contentBool={imageBool} />}
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentResetPassword;
