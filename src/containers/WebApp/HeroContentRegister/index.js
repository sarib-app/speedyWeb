import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setErrors,
  setUserData,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setConfirmPassword,
} from "store/userSlice"; // Update this with the actual path

import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import BannerArea, { Col } from "./herocontentregister.style";
import { useRouter } from "next/router";
import Input from "common/components/Input";
import Text from "common/components/Text";
import ImageLoader from "common/components/Loader/imageLoader";
import { REGISTER_BANNER_DATA } from "common/data/WebApp";
import { registerUser } from "common/api/api";

const HeroContentRegister = () => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({ bool: false, msg: "" });
  const [passwordConditions, setPasswordConditions] = useState([]);
  const [showPasswordHints, setShowPasswordHints] = useState(false);
  const [imageBool, setImageBool] = useState(true); // Initialize imageBool here
  const router = useRouter();
  const {
    username,
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    errors,
  } = useSelector((state) => state.user);

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

  const handleChange = (field, value) => {
    switch (field) {
      case "username":
        dispatch(setUsername(value));
        break;
      case "firstName":
        dispatch(setFirstName(value));
        break;
      case "lastName":
        dispatch(setLastName(value));
        break;
      case "email":
        dispatch(setEmail(value));
        break;
      case "phone":
        dispatch(setPhone(value));
        break;
      case "password":
        dispatch(setPassword(value));
        updatePasswordConditions(value); // Update conditions when password changes
        break;
      case "confirmPassword":
        dispatch(setConfirmPassword(value));
        break;
      default:
        break;
    }
  };

  const updatePasswordConditions = (password) => {
    const met = passwordValidations
      .filter((validation) => validation.regex.test(password))
      .map((validation) => validation.id);

    setPasswordConditions(met);
  };

  const validate = () => {
    setFormError({ bool: false, msg: "" });
    let inputErrors = {};
    if (!username) {
      inputErrors.username = "Username is required";
    } else if (username.length < 3 || username.length > 20) {
      inputErrors.username = "Username must be between 3 and 20 characters";
    }

    // First name validation
    if (!firstName) {
      inputErrors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z]+$/i.test(firstName)) {
      inputErrors.firstName = "First Name must contain only letters";
    }

    // Last name validation
    if (!lastName) {
      inputErrors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z]+$/i.test(lastName)) {
      inputErrors.lastName = "Last Name must contain only letters";
    }

    // Email validation
    if (!email) {
      inputErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      inputErrors.email = "Email is not properly formatted";
    }

    // Phone number validation (generic format)
    if (!phone) {
      inputErrors.phone = "Phone is required";
    } else if (!/^\+?\d{10,15}$/.test(phone)) {
      inputErrors.phone = "Invalid phone number format";
    }

    // Password validation
    if (!password) {
      inputErrors.password = "Password is required";
    } else if (password.length < 8) {
      inputErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (!confirmPassword) {
      inputErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      inputErrors.confirmPassword = "Passwords do not match";
    }

    dispatch(setErrors(inputErrors));
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      phoneNumber: phone,
      quick_login: true,
      role: "ADMIN",
    };
    if (validate()) {
      try {
        const response = await registerUser(userData);
        console.log("response", response);

        if (response.data?.success) {
          // Check for warnings
          if (response.data.warnings && response.data.warnings.length > 0) {
            setFormError({
              bool: true,
              msg: (
                <ul className="errorColor">
                  {response.data.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              ),
            });
          } else if (response.data.email_verified) {
            dispatch(setUserData(response.data));
            router.push("/Dashboard");
          } else {
            router.push("/VerifyEmail");
          }
        } else {
          setFormError({ bool: true, msg: "Registration failed." });
        }
      } catch (error) {
        setFormError({ bool: true, msg: error.message });
        console.error("Registration error:", error.message);
      }
    }
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    router.push("../Login");
  };

  const { title, text, button, image, tagline } = REGISTER_BANNER_DATA;

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

          {errors.username && (
            <span className="errorColor">{errors.username}</span>
          )}
          <Input
            name="username"
            value={username.toLowerCase()}
            onChange={(value) => handleChange("username", value)}
            placeholder="Username"
            icon={<i className="fa-solid fa-user formIconStyle"></i>}
            required={true}
            aria-label="input"
            className="input"
          />

          <div className="twoFields">
            <Col>
              {errors.firstName && (
                <span className="errorColor">{errors.firstName}</span>
              )}
              <Input
                name="firstName"
                value={firstName}
                onChange={(value) => handleChange("firstName", value)}
                placeholder="First Name"
                icon={<i className="fa-solid fa-user formIconStyle"></i>}
                required={true}
                aria-label="input"
                className="input"
              />
            </Col>
            <Col>
              {errors.lastName && (
                <span className="errorColor">{errors.lastName}</span>
              )}
              <Input
                value={lastName}
                onChange={(value) => handleChange("lastName", value)}
                placeholder="Last Name"
                icon={<i className="fa-solid fa-user formIconStyle"></i>}
                required={true}
                aria-label="input"
                className="input"
              />
            </Col>
          </div>
          {errors.email && <span className="errorColor">{errors.email}</span>}
          <Input
            name="email"
            value={email}
            onChange={(value) => handleChange("email", value)}
            placeholder="Email"
            icon={
              <i
                className="fa-regular fa-envelope formIconStyle"
                style={{ marginTop: "10px" }}
              ></i>
            }
            required={true}
            aria-label="input"
            className="input"
          />
          {errors.phone && <span className="errorColor">{errors.phone}</span>}
          <Input
            name="phone"
            value={phone}
            onChange={(value) => handleChange("phone", value)}
            placeholder="Phone"
            icon={
              <i
                className="fa-solid fa-phone formIconStyle"
                style={{ marginTop: "10px" }}
              ></i>
            }
            required={true}
            aria-label="input"
            className="input"
          />

          <div className="twoFields">
            <Col>
              {errors.password && (
                <span className="errorColor">{errors.password}</span>
              )}
              <Input
                inputType="password"
                name="password"
                value={password}
                onFocus={() => setShowPasswordHints(true)} // Show hints when focused
                onChange={(value) => handleChange("password", value)}
                placeholder="Password"
                required={true}
                icon={<i className="fa-solid fa-lock formIconStyle"></i>}
                aria-label="input"
                className="input"
                passwordShowHide={true}
              />
              {showPasswordHints && (
                <ul className="password-conditions">
                  {passwordValidations.map((validation) => (
                    <li
                      key={validation.id}
                      className={
                        passwordConditions.includes(validation.id) ? "met" : ""
                      }
                    >
                      {validation.message}
                    </li>
                  ))}
                </ul>
              )}
            </Col>
            <Col>
              {errors.confirmPassword && (
                <span className="errorColor">{errors.confirmPassword}</span>
              )}
              <Input
                inputType="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(value) => handleChange("confirmPassword", value)}
                placeholder="Confirm Password"
                required={true}
                icon={<i className="fa-solid fa-lock formIconStyle"></i>}
                aria-label="input"
                className="input"
                passwordShowHide={true}
              />
            </Col>
          </div>
          <Col style={{ maxWidth: "100%", marginTop: "1em" }}>
            {formError.bool && (
              <span className="errorColor">{formError.msg}</span>
            )}
          </Col>
          <div className="twoFields" style={{ alignItems: "center" }}>
            <Col>
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
            <Col>
              <Box className="ButtonWrap" style={{ float: "right" }}>
                <Text
                  as="span"
                  style={{ marginLeft: 0 }}
                  content="Already have an account yet?"
                />
                <Link
                  href="#"
                  onClick={navigateToLogin}
                  className="navbar_button_two"
                >
                  <Text as="span" content="Login" />
                </Link>
              </Box>
            </Col>
          </div>
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
                style={{
                  width: "60%",
                  height: "auto",
                  filter: "drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.3))",
                }}
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

export default HeroContentRegister;
