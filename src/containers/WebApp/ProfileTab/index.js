import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  faTrophy,
  faCheckCircle,
  faDollarSign,
  faShieldAlt,
  faBusinessTime,
  faHandshake,
  faClock,
  faRibbon,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import BannerArea, { Col } from "./profiletab.style";
import Input from "common/components/Input";
import Text from "common/components/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getRegisteredBusinessById,
  updateBusiness,
  saveBusiness,
} from "common/api/api";
import {
  setBusinessName,
  setDetails,
  setAddress1,
  setAddress2,
  setAddress3,
  setCity,
  setState,
  setCountry,
  setZipcode,
  setPaymentMethods,
  setBadges,
  setYearFound,
  setVideoUrl,
  setWebsiteUrl,
  setCompanySize,
  setPhone,
  setBusinessData,
} from "store/businessSlice";

const ProfileTab = ({ onProfileUpdate }) => {
  const dispatch = useDispatch();
  const {
    businessName,
    details,
    address1,
    address2,
    address3,
    city,
    state,
    country,
    zipcode,
    paymentMethods,
    badges,
    yearFound,
    videoUrl,
    websiteUrl,
    companySize,
    phone,
    businessData,
  } = useSelector((state) => state.business);

  const hiddenFileInput = useRef(null);
  const [error, setError] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  const providerId = userData?.provider_id || businessData.id;
  const token = useSelector((state) => state.auth.authToken);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const [selectedYearFound, setSelectedYearFound] = useState("");
  const [receivedBadges, setReceivedBadges] = useState([]);

  const colourStyles = {
    control: (styles) => ({ ...styles, borderWidth: 0 }),
    singleValue: (styles) => ({ ...styles, color: "#084887" }),
    placeholder: (styles) => ({ ...styles, color: "#084887" }),
    input: (styles) => ({ ...styles, color: "#084887" }),
    option: (styles) => ({ ...styles, color: "#084887" }),
    multiValueLabel: (styles) => ({ ...styles, color: "#084887" }),
  };

  const renderBadge = (badge, isActive) => (
    <div
      className={`badge-container ${
        isActive ? "badge-active" : "badge-inactive"
      }`}
    >
      <FontAwesomeIcon icon={badge.icon} className="badge-icon" />
      <div className="badge-info">
        <div className="badge-name">{badge.name}</div>
        <div className="badge-description">{badge.description}</div>
      </div>
    </div>
  );

  const renderBadges = () => {
    if (Array.isArray(badges) && badges.length > 0) {
      return (
        <div className="badges-container">
          {Object.keys(badgesData).map((badgeCode) => {
            const isActive = badges.includes(badgeCode);
            if (!isActive) return null;
            const badge = badgesData[badgeCode];
            return (
              <div key={badgeCode} className="badge-item active">
                <div className="badge-icon">
                  <FontAwesomeIcon icon={badge.icon} />
                </div>
                <div className="badge-label">{badge.name}</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="motivational-message">
          <p>
            You haven't earned any badges yet. Keep up the great work to earn
            badges and showcase your achievements!
          </p>
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await getRegisteredBusinessById(providerId, token);
        if (response.data) {
          const businessData = response.data.businesses[0];
          if (businessData && businessData.yelpBusiness) {
            dispatch(setBusinessData(businessData));
            dispatch(setBusinessName(businessData.yelpBusiness.name));
            dispatch(setPhone(businessData.yelpBusiness.phone));
            dispatch(setDetails(businessData.yelpBusiness.details));
            dispatch(setAddress1(businessData.yelpBusinessLocation.address1));
            dispatch(setAddress2(businessData.yelpBusinessLocation.address2));
            dispatch(setAddress3(businessData.yelpBusinessLocation.address3));
            dispatch(setCity(businessData.yelpBusinessLocation.city));
            dispatch(setState(businessData.yelpBusinessLocation.state));
            dispatch(setCountry(businessData.yelpBusinessLocation.country));
            dispatch(setZipcode(businessData.yelpBusinessLocation.zipCode));
            dispatch(setVideoUrl(businessData.yelpBusiness.videoUrl));
            dispatch(setWebsiteUrl(businessData.yelpBusiness.websiteUrl));
            dispatch(setCompanySize(businessData.yelpBusiness.companySize));

            const fetchedPaymentMethods =
              businessData.yelpBusiness?.paymentMethods?.map((method) => ({
                label: method.charAt(0).toUpperCase() + method.slice(1),
                value: method,
              })) || [];
            setSelectedPaymentMethods(fetchedPaymentMethods);
            dispatch(setPaymentMethods(fetchedPaymentMethods));

            const activeBadges = businessData.yelpBusiness.badges || [];
            setReceivedBadges(Array.isArray(activeBadges) ? activeBadges : []);
            dispatch(
              setBadges(Array.isArray(activeBadges) ? activeBadges : [])
            );

            const fetchedYearFound = businessData.yelpBusiness.yearFound
              ? {
                  label: businessData.yelpBusiness.yearFound.toString(),
                  value: businessData.yelpBusiness.yearFound,
                }
              : null;
            setSelectedYearFound(fetchedYearFound);
            dispatch(setYearFound(fetchedYearFound));
          }
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    if (providerId && token) {
      fetchBusinessData();
    }
  }, [providerId, token]);

  const badgesData = {
    TPRD: {
      name: "Top Rated",
      description: "Highly rated by customers for outstanding service.",
      icon: faTrophy,
    },
    VRFD: {
      name: "Verified",
      description: "Verified identity and credentials.",
      icon: faCheckCircle,
    },
    LWPR: {
      name: "Low Price",
      description: "Competitive pricing and excellent value.",
      icon: faDollarSign,
    },
    INSD: {
      name: "Insured",
      description: "Properly insured for liability and damages.",
      icon: faShieldAlt,
    },
    O5YB: {
      name: "5+ Years in Business",
      description:
        "Established business with a track record of over five years.",
      icon: faBusinessTime,
    },
    LCSD: {
      name: "Licensed",
      description: "Holds proper professional licensing.",
      icon: faHandshake,
    },
    QKRS: {
      name: "Quick Response",
      description: "Consistently responds to customers within 1 hour.",
      icon: faClock,
    },
    POFY: {
      name: "Professional of the Year",
      description:
        "Awarded for exceptional professional achievements in the year.",
      icon: faRibbon,
    },
    FRBS: {
      name: "Fair Business",
      description:
        "Recognized for fairness and integrity in business practices.",
      icon: faThumbsUp,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    // Front-end validation
    if (!businessName.trim()) errors.push("Business Name is required");
    if (!details.trim()) errors.push("Details are required");
    if (!address1.trim()) errors.push("Address 1 is required");
    if (!city.trim()) errors.push("City is required");
    if (!/^[A-Z]{2}$/.test(state))
      errors.push("State should be a 2-letter code");
    if (!zipcode.trim()) errors.push("Zipcode is required");
    if (!/^[A-Z]{2}$/.test(country))
      errors.push("Country should be a 2-letter code");
    if (!phone.trim()) errors.push("Phone number is required");
    if (!websiteUrl.trim()) errors.push("Website URL is required");
    if (!selectedPaymentMethods || selectedPaymentMethods.length === 0)
      errors.push("At least one payment method is required");
    if (!selectedYearFound || selectedYearFound.length === 0)
      errors.push("Year found is required");

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    const businessData = {
      yelpBusiness: {
        id: providerId,
        name: businessName,
        phone: phone,
        paymentMethods: paymentMethods ? Array.from(paymentMethods) : [],
        badges: receivedBadges,
        companySize: companySize,
        yearFound: yearFound,
        videoUrl: videoUrl,
        details: details,
        websiteUrl: websiteUrl,
      },
      yelpBusinessLocation: {
        business_id: providerId,
        address1: address1,
        address2: address2,
        address3: address3,
        city: city,
        state: state,
        country: country,
        zipCode: zipcode,
      },
    };

    try {
      let response;
      if (businessData.yelpBusiness.id) {
        response = await updateBusiness(businessData, token);
      } else {
        response = await saveBusiness(businessData, token);
      }

      setSuccessMessage("Profile settings updated successfully!");
      if (response && Array.isArray(response.businesses)) {
        if (response.businesses.length > 0) {
          dispatch(setBusinessData(response.businesses[0]));
        }
      }
      if (onProfileUpdate) {
        onProfileUpdate(); // Call the callback function
      }
    } catch (error) {
      console.error("Error in updating business:", error);
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      setSuccessMessage("Failed to update profile settings. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setError([]); // Reset error message when user changes input
    switch (field) {
      case "businessName":
        dispatch(setBusinessName(value));
        break;
      case "details":
        dispatch(setDetails(value));
        break;
      case "address1":
        dispatch(setAddress1(value));
        break;
      case "address2":
        dispatch(setAddress2(value));
        break;
      case "address3":
        dispatch(setAddress3(value));
        break;
      case "phone":
        dispatch(setPhone(value));
        break;
      case "city":
        dispatch(setCity(value));
        break;
      case "state":
        dispatch(setState(value));
        break;
      case "country":
        dispatch(setCountry(value));
        break;
      case "zipcode":
        dispatch(setZipcode(value));
        break;
      case "paymentMethods":
        setPaymentMethods(value);
        dispatch(setPaymentMethods(value));
        break;
      case "badges":
        dispatch(setBadges(value));
        break;
      case "yearFound":
        dispatch(setYearFound(value));
        break;
      case "videoUrl":
        dispatch(setVideoUrl(value));
        break;
      case "websiteUrl":
        dispatch(setWebsiteUrl(value));
        break;
      case "companySize":
        dispatch(setCompanySize(value));
        break;
      default:
        console.warn("Unhandled field: " + field);
    }
  };

  const handlePaymentMethodChange = (selectedOptions) => {
    setSelectedPaymentMethods(selectedOptions);
    const paymentMethods = selectedOptions.map((option) => option.value);
    dispatch(setPaymentMethods(paymentMethods));
  };

  const handleYearFoundChange = (selectedOption) => {
    const yearFoundValue = selectedOption ? selectedOption.value : "";
    setSelectedYearFound(selectedOption);
    dispatch(setYearFound(yearFoundValue));
  };

  return (
    <BannerArea id="banner_section">
      <Container className="profile-container">
        <Col className="formBox">
          <Heading as="h2" content="Business Profile" />

          {successMessage && <Text as="span" content={successMessage} />}
          {error.length > 0 && (
            <div className="errorColor">
              {error.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
          <Input
            name="businessName"
            value={businessName || ""}
            onChange={(value) => handleChange("businessName", value)}
            placeholder="Enter Name"
            icon={<i className="fas fa-id-badge formIconStyle"></i>}
            required={true}
            aria-label="input"
            className="input"
          />
          <textarea
            name="details"
            value={details || ""}
            onChange={(e) => handleChange("details", e.target.value)}
            placeholder="Enter Business Details"
            required={true}
            aria-label="input"
            className="textarea-input"
          ></textarea>

          <Input
            name="companySize"
            value={companySize || ""}
            onChange={(value) => handleChange("companySize", value)}
            placeholder="Enter Company Size"
            icon={<i className="fas fa-location-arrow formIconStyle" />}
            required={true}
            aria-label="input"
            className="input"
          />
          <Input
            name="address1"
            value={address1 || ""}
            onChange={(value) => handleChange("address1", value)}
            placeholder="Enter Address 1"
            icon={<i className="fas fa-laptop-house formIconStyle"></i>}
            required={true}
            aria-label="input"
            className="input"
          />
          <Box className="twoFields">
            <Input
              name="address2"
              value={address2 || ""}
              onChange={(value) => handleChange("address2", value)}
              placeholder="Enter Address 2"
              icon={<i className="fas fa-laptop-house formIconStyle"></i>}
              required={true}
              aria-label="input"
              className="input"
            />

            <Input
              name="address3"
              value={address3 || ""}
              onChange={(value) => handleChange("address3", value)}
              placeholder="Enter Address 3"
              icon={<i className="fas fa-laptop-house formIconStyle"></i>}
              required={true}
              aria-label="input"
              className="input"
            />
          </Box>
          <Box className="twoFields">
            <Input
              name="city"
              value={city || ""}
              onChange={(value) => handleChange("city", value)}
              placeholder="Enter City"
              icon={<i className="far fa-building formIconStyle"></i>}
              required={true}
              aria-label="input"
              className="input"
            />

            <Input
              name="state"
              value={state || ""}
              onChange={(value) => handleChange("state", value)}
              placeholder="Enter State"
              icon={<i className="far fa-building formIconStyle"></i>}
              required={true}
              aria-label="input"
              className="input"
            />
          </Box>
          <Box className="twoFields">
            <Input
              name="zipcode"
              value={zipcode || ""}
              onChange={(value) => handleChange("zipcode", value)}
              placeholder="Enter Zipcode"
              icon={<i className="fas fa-location-arrow formIconStyle" />}
              required={true}
              aria-label="input"
              className="input"
            />

            <Input
              name="country"
              value={country || ""}
              onChange={(value) => handleChange("country", value)}
              placeholder="Enter Country"
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
          </Box>
          <Input
            name="phone"
            value={phone || ""}
            onChange={(value) => handleChange("phone", value)}
            placeholder="Enter Phone Number"
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
          <Input
            name="websiteUrl"
            value={websiteUrl || ""}
            onChange={(value) => handleChange("websiteUrl", value)}
            placeholder="Enter your Website"
            icon={<i className="fa-solid fa-link formIconStyle" />}
            required={true}
            aria-label="input"
            className="input"
          />
          <Input
            name="videoUrl"
            value={videoUrl || ""}
            onChange={(value) => handleChange("videoUrl", value)}
            placeholder="Paste link for your video"
            icon={<i className="fa-solid fa-link formIconStyle" />}
            required={true}
            aria-label="input"
            className="input"
          />
          <div
            style={{
              display: "flex",
              border: "1px solid #d5d5d5",
              paddingTop: 5,
              paddingBottom: 5,
              marginBottom: 15,
              borderRadius: 4,
            }}
          >
            <i
              className="fas fa-wallet formIconStyle"
              style={{ marginLeft: 4, marginRight: 8 }}
            />
            <Select
              options={[
                { value: "credit_card", label: "Credit Card" },
                { value: "debit_card", label: "Debit Card" },
                { value: "paypal", label: "PayPal" },
                { value: "venmo", label: "Venmo" },
                { value: "zelle", label: "Zelle" },
                { value: "cash", label: "Cash" },
              ]}
              isMulti
              value={selectedPaymentMethods}
              onChange={handlePaymentMethodChange}
              placeholder="Select Payment Method(s)"
              className="custom-input custom-profile-select"
              styles={colourStyles}
            />
          </div>

          <div
            style={{
              display: "flex",
              border: "1px solid #d5d5d5",
              paddingTop: 5,
              paddingBottom: 5,
              marginBottom: 15,
              borderRadius: 4,
            }}
          >
            <i
              className="fas fa-calendar-day formIconStyle"
              style={{ marginLeft: 4, marginRight: 8 }}
            />
            <Select
              options={years.map((year) => ({
                value: year,
                label: year.toString(),
              }))}
              value={selectedYearFound}
              onChange={handleYearFoundChange}
              placeholder="Select Year Found"
              className="custom-input custom-profile-select"
              styles={colourStyles}
            />
          </div>

          <Box className="twoFields">
            <div className="badges-container">
              <div className="badges-section">{renderBadges()}</div>
            </div>
          </Box>

          <Col>
            <Box className="ButtonWrap">
              <Link href="#" className="Button" onClick={handleSubmit}>
                Save
                <Icon size={18} icon={androidArrowForward} />
              </Link>
            </Box>
          </Col>
        </Col>
      </Container>
    </BannerArea>
  );
};

export default ProfileTab;
