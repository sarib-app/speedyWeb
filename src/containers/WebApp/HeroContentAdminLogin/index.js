import React, { useState, useEffect } from "react";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import { LOGIN_BANNER_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import BannerArea, {
  Col,
} from "../HeroContentAdminLogin/herocontentadminlogin.style";
import { useRouter } from "next/router";
import Input from "common/components/Input";
import { loginAdmin } from "common/api/api";
import { useDispatch } from "react-redux";
import { setRegisteredBusinesses } from "store/registeredBusinessSlice"; // Changed to plural
import Text from "common/components/Text";
import ImageLoader from "common/components/Loader/imageLoader";
import Cookies from "js-cookie";

const HeroContentAdminLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [credentials, setCredentials] = useState(() => ({
    username: Cookies.get("rememberedUsername") || "",
    password: Cookies.get("rememberedPassword") || "",
  }));
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({});
  const [loginImage, setLoginImage] = useState(true);
  const [imageBool, setImageBool] = useState(true);

  const handleChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const inputErrors = {};
    if (!credentials.username) inputErrors.username = "Username is required";
    if (!credentials.password) inputErrors.password = "Password is required";
    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await loginAdmin(
          dispatch,
          credentials.username,
          credentials.password
        );

        if (response.data) {
          dispatch(setRegisteredBusinesses(response.data)); // Changed to plural
          router.push("/AdminDashboard");
        } else {
          setLoginError(
            "Login failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        setLoginError(error.message || "An unexpected error occurred.");
        console.error("Login error:", error);
      }
    }
  };

  const { title, text, button, image, tagline } = LOGIN_BANNER_DATA;

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Col className="formBox">
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
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
            <Heading as="h2" content={title} style={{ marginBottom: "0px" }} />
          </Col>
          {loginError && <span className="errorColor">{loginError}</span>}
          {errors.username && (
            <span className="errorColor">{errors.username}</span>
          )}
          <Input
            name="username"
            value={credentials.username}
            onChange={(value) => handleChange("username", value)}
            placeholder="Username"
            icon={<i className="fa-solid fa-user formIconStyle"></i>}
            required={true}
            aria-label="username input"
            className="input"
          />

          {errors.password && (
            <span className="errorColor">{errors.password}</span>
          )}
          <Input
            inputType="password"
            name="password"
            value={credentials.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="Password"
            icon={<i className="fa-solid fa-lock formIconStyle"></i>}
            required={true}
            aria-label="password input"
            className="input"
            passwordShowHide={true}
          />

          <div className="twoFields" style={{ alignItems: "center" }}>
            <Col style={{ flex: "0 0 40%", maxWidth: "40%" }}>
              <Box className="ButtonWrap">
                <Link
                  href={button.link}
                  className="Button"
                  onClick={handleSubmit}
                >
                  {button.label}
                  <Icon size={18} icon={androidArrowForward} />
                </Link>
              </Box>
            </Col>
          </div>
        </Col>
        <Box className="bannerImage">
          {image.map(({ src }, index) => (
            <div key={`banner-image-key-${index}`}>
              <Image
                loading="lazy"
                src={src}
                placeholder="blur"
                onLoad={() => setLoginImage(true)}
                onLoadingComplete={() => setLoginImage(false)}
                onError={(e) => {
                  e.target.src = "/assets/images/imageplace.svg";
                  e.target.style.width = "100%";
                }}
                blurDataURL="/assets/images/imageplace.svg"
                alt="login-banner"
              />
              {loginImage && <ImageLoader contentBool={imageBool} />}
            </div>
          ))}
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentAdminLogin;
