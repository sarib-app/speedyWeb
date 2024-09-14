import React, { useState, useEffect } from "react";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import { LOGIN_BANNER_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import BannerArea, { Col } from "../HeroContentLogin/herocontentlogin.style";
import { useRouter } from "next/router";
import Input from "common/components/Input";
import { loginUser } from "common/api/api";
import { useDispatch } from "react-redux";
import { setUserData } from "store/userSlice";
import Text from "common/components/Text";
import ImageLoader from "common/components/Loader/imageLoader";
import Cookies from "js-cookie";
import { trackEvent } from "common/GoogleAnalytics/Analytics";

const HeroContentLogin = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState(() => {
    const rememberedUsername = String(Cookies.get("rememberedUsername") || "");
    const rememberedPassword = String(Cookies.get("rememberedPassword") || "");
    return {
      username: rememberedUsername,
      password: rememberedPassword,
    };
  });
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({});
  const [loginImage, setLoginImage] = useState(true);
  const [imageBool, setImageBool] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState({ bool: false, msg: "" });
  const [passwordConditions, setPasswordConditions] = useState(false);
  const [metCriteria, setMetCriteria] = useState([]);

  const router = useRouter();
  const { sessionExpired } = router.query;

  useEffect(() => {
    const rememberedUsername = Cookies.get("rememberedUsername") || "";
    const rememberedPassword = Cookies.get("rememberedPassword") || "";
    const rememberMeCookie = Cookies.get("rememberMe");

    if (rememberMeCookie) {
      setRememberMe(true);
      setCredentials({
        username: rememberedUsername,
        password: rememberedPassword,
      });
    }
  }, []);

  const passwordValidations = [
    { id: 1, regex: /[A-Z]/, message: "One uppercase letter" },
    { id: 2, regex: /[a-z]/, message: "One lowercase letter" },
    { id: 3, regex: /\d/, message: "One number" },
    {
      id: 4,
      regex: /[@$!%*?&#]/,
      message: "One special character (@, $, !, %, *, ?, &, #)",
    },
    { id: 5, regex: /.{8,}/, message: "At least 8 characters long" },
  ];

  const handlePasswordChange = (password) => {
    setCredentials((prevState) => ({
      ...prevState,
      password: password,
    }));

    // Check each condition and update the metCriteria state
    const met = passwordValidations
      .filter((validation) => validation.regex.test(password))
      .map((validation) => validation.id);

    setMetCriteria(met);
  };

  const handleChange = (field, value) => {
    setCredentials((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    // Show password conditions if password is being edited
    if (field === "password") {
      setPasswordConditions(true);
      handlePasswordChange(value);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
    Cookies.set("rememberMe", !rememberMe, { expires: 365 });
  };

  const validate = () => {
    let inputErrors = {};
    setFormError({ bool: false, msg: "" });

    if (credentials.username.length < 4) {
      inputErrors.username = "Username must be at least 4 characters";
    }

    if (credentials.password.length < 8) {
      inputErrors.password = "Password must be at least 8 characters";
    } else {
      const passwordValidations = [
        { regex: /[A-Z]/, message: "One uppercase letter" },
        { regex: /[a-z]/, message: "One lowercase letter" },
        { regex: /\d/, message: "One number" },
        {
          regex: /[@$!%*?&#]/,
          message: "One special character (@, $, !, %, *, ?, &, #)",
        },
      ];

      const failedConditions = passwordValidations
        .filter(({ regex }) => !regex.test(credentials.password))
        .map(({ message }) => message);

      if (failedConditions.length > 0) {
        inputErrors.password = "Password must meet the following conditions:";
        setFormError({
          bool: true,
          msg: (
            <ul className="password-conditions">
              {failedConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          ),
        });
      } else {
        setFormError({ bool: false, msg: "" });
      }
    }

    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    trackEvent("submit", "User Authentication", "Login Attempt");

    if (validate()) {
      try {
        const response = await loginUser(
          dispatch,
          credentials.username.toLowerCase(),
          credentials.password
        );
        if (response?.data?.success) {
          dispatch(setUserData(response.data.payload));
          if (response.data.payload.email_verified) {
            trackEvent(
              "success",
              "User Authentication",
              "Login Success-Email Verified"
            );
            setLoginError("");
            if (rememberMe) {
              Cookies.set("rememberedUsername", credentials.username, {
                expires: 365,
              });
              Cookies.set("rememberedPassword", credentials.password, {
                expires: 365,
              });
            } else {
              Cookies.remove("rememberedUsername");
              Cookies.remove("rememberedPassword");
            }
            if (
              response?.data?.payload.provider_id &&
              response?.data?.payload.admin_status === 0
            ) {
              router.push("/Dashboard");
            } else {
              router.push("/Profile");
            }
          } else {
            router.push("/VerifyEmail");
          }
        } else {
          setLoginError(
            "Login failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        setLoginError(error.message || "An unexpected error occurred.");
        console.error("Login error:", error.message);
      }
    }
  };

  const navigateToRegister = (e) => {
    e.preventDefault();
    trackEvent("navigate", "User Navigation", "Navigate to Registration");
    router.push("../Register");
  };

  const navigateToForgotPassword = (e) => {
    e.preventDefault();
    trackEvent("navigate", "User Navigation", "Navigate to Forgot Password");
    router.push("../ForgotPassword");
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
          {sessionExpired && (
            <span style={{ color: "red" }}>
              Your session has expired. Please log in again.
            </span>
          )}
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
            aria-label="input"
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
            aria-label="input"
            className="input"
            passwordShowHide={true}
          />

          {passwordConditions && (
            <Col style={{ maxWidth: "100%", marginTop: "1em" }}>
              <ul className="password-conditions">
                {passwordValidations.map((validation) => (
                  <li
                    key={validation.id}
                    className={metCriteria.includes(validation.id) ? "met" : ""}
                  >
                    {validation.message}
                  </li>
                ))}
              </ul>
            </Col>
          )}

          <div className="rememberMeContainer">
            <div className="rememberMe">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={rememberMe}
                onChange={toggleRememberMe}
              />
              <label htmlFor="rememberMe">Remember Me!</label>
            </div>
            <div className="forgotPassword">
              <Link
                href={button.link}
                className="navbar_button_two"
                onClick={navigateToForgotPassword}
              >
                <Text as="span" content="Forgot Password!" />
              </Link>
            </div>
          </div>
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
            <Col style={{ flex: "0 0 60%", maxWidth: "60%" }}>
              <Box className="ButtonWrap">
                <Text as="span" content="Don't have an account yet?" />
                <Link
                  href="#"
                  onClick={navigateToRegister}
                  className="navbar_button_two"
                >
                  <Text as="span" content="Register" />
                </Link>
              </Box>
            </Col>
          </div>
        </Col>
        <Box className="bannerImage">
          {image.map(({ src }, index) => (
            <div key={`banner-${index}`}>
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
                key={`banner-image-key-${index}`}
              />

              {loginImage && <ImageLoader contentBool={imageBool} />}
            </div>
          ))}
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentLogin;
