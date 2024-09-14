import React, { useEffect, useState } from "react";
import GoogleMaps from "../GoogleMaps"; // Adjust import path as needed
import { StyledCollapsibleRow, BannerArea, Col } from "./serviceareatab.style";
import { useDispatch, useSelector } from "react-redux";

import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";

import Text from "common/components/Text";
import { setServiceZipcodes, setBusinessData } from "store/businessSlice";

import { getRegisteredBusinessById, updateBusiness } from "common/api/api";

const ServiceAreaTab = () => {
  const dispatch = useDispatch();
  const [selectedZipcodes, setSelectedZipcodes] = useState(new Set());
  const userData = useSelector((state) => state.user.userData);
  const businessData = useSelector((state) => state.business.businessData);
  const providerId = userData?.provider_id || businessData?.yelpBusiness?.id;
  const token = useSelector((state) => state.auth.authToken);
  const [message, setMessage] = useState("");
  const businessZipcode = businessData?.yelpBusinessLocation?.zipCode;

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!providerId || !token) return;
      try {
        const response = await getRegisteredBusinessById(providerId, token);
        if (response.data) {
          const businessData = response.data.businesses[0]; // Adjust based on your API response structure
          if (
            businessData &&
            businessData.yelpBusiness &&
            businessData.yelpBusiness.serviceZipCodes
          ) {
            dispatch(setBusinessData(businessData));
            dispatch(
              setServiceZipcodes(businessData.yelpBusiness.serviceZipCodes)
            );
            setSelectedZipcodes(
              new Set(businessData.yelpBusiness.serviceZipCodes)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchBusinessData();
  }, [providerId, token, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedZipcodes.size === 0) {
      setMessage("Please select at least one zip code.");
      return;
    }

    const zipCodesArray = Array.from(selectedZipcodes);

    const businessData = {
      yelpBusiness: {
        id: providerId,
        serviceZipCodes: zipCodesArray,
      },
    };

    try {
      if (providerId) {
  
        const response = await updateBusiness(businessData, token);
 
        if (response) {

          setMessage("Service area updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error in updating business:", error);
      setMessage("Failed to update profile settings. Please try again.");
    }
  };

  const handleZipCodeSelected = (zipCode) => {
    if (zipCode) {
      setSelectedZipcodes((prevSelectedZipcodes) =>
        new Set(prevSelectedZipcodes).add(zipCode)
      );
      // Update the Redux store
      dispatch(setServiceZipcodes([...selectedZipcodes, zipCode]));
    }
  };

  const removeZipCode = (zipCode) => {
    setSelectedZipcodes((prevSelectedZipcodes) => {
      const updatedZipcodes = new Set(prevSelectedZipcodes);
      updatedZipcodes.delete(zipCode);
      // Update the Redux store
      dispatch(setServiceZipcodes([...updatedZipcodes]));
      return updatedZipcodes;
    });
  };

  return (
    <BannerArea>
      <Container className={"service-container"}>
        <StyledCollapsibleRow>
          <div className="note">
            Note: Select zip codes to specify service areas, or leave blank to
            serve all areas.
          </div>
          <GoogleMaps
            onZipCodeSelected={handleZipCodeSelected}
            centerZipcode={businessZipcode} // Center map based on businessZipcode from profile
          />
          <div className="zipcode-display">
            <span>Selected Zip Codes: </span>
            <div>
              {[...selectedZipcodes].map((zipCode) => (
                <div key={zipCode} className="zipcode-value">
                  {zipCode}
                  <button
                    onClick={() => removeZipCode(zipCode)}
                    className="delete-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {message && (
            <div className="message">
              <Text as="span" content={message} />
            </div>
          )}
          <Col>
            <Box className="ButtonWrap">
              <Link href="#" className="Button" onClick={handleSubmit}>
                Save
                <Icon size={18} icon={androidArrowForward} />
              </Link>
            </Box>
          </Col>
        </StyledCollapsibleRow>
      </Container>
    </BannerArea>
  );
};

export default ServiceAreaTab;
