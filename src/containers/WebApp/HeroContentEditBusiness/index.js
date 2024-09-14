import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import Box from "common/components/Box";
import { updateBusiness } from "common/api/api";
import { setCurrentEditBusiness } from "store/registeredBusinessSlice";
import BannerArea from "./herocontenteditbusiness.style";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

const HeroContentEditBusiness = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentEditBusiness } = useSelector(
    (state) => state.registeredBusinessUser
  );
  const token = useSelector((state) => state.auth.authToken);
  const [formData, setFormData] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (currentEditBusiness) {
      setFormData(currentEditBusiness);
    } else {
      router.push("/AdminDashboard");
    }
  }, [currentEditBusiness, router]);

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBusiness(formData, token);
      if (response.data) {
        dispatch(setCurrentEditBusiness(response.data));
        router.push("/AdminDashboard");
      }
    } catch (error) {
      console.error("Error updating business:", error);
    }
  };

  const renderFields = (data, parentKey = "") => {
    return Object.entries(data).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const isExpanded = expandedSections[fullKey];

      if (
        ["favorite", "businessFound", "yelpBusinessTransactions"].includes(key)
      ) {
        return null;
      }

      if (key === "image_url" && parentKey === "yelpBusiness") {
        return renderImageCarousel(value);
      }

      if (key === "yelpBusinessSupportingDocument") {
        return renderSupportingDocuments(value);
      }

      if (typeof value === "object" && value !== null) {
        return (
          <Box key={fullKey} className="section-container">
            <div className="row-header" onClick={() => toggleSection(fullKey)}>
              <Heading as="h4" content={formatKey(key)} />
              <div className="CollapsibleRowIcon">{isExpanded ? "−" : "+"}</div>
            </div>
            <Box className={`data ${isExpanded ? "expanded" : "collapsed"}`}>
              <div className="fields-container">
                {renderFields(value, fullKey)}
              </div>
              <Button
                title={`Update ${formatKey(key)}`}
                onClick={() => handleSubmit(fullKey)}
                className="update-button"
              />
            </Box>
          </Box>
        );
      }

      return (
        <Box key={fullKey} className="field-item">
          <label className="labelStyle">{formatKey(key)}</label>
          <Input
            inputType="text"
            value={value || ""}
            onChange={(e) => handleInputChange(parentKey, key, e.target.value)}
            aria-label={key}
            className="custom-input"
          />
        </Box>
      );
    });
  };

  const formatKey = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const renderImageCarousel = (images) => {
    const imageEntries = Object.entries(images);
    return (
      <Box className="section-container image-carousel-container">
        <Heading as="h4" content="Business Images" />
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          className="image-carousel"
        >
          {imageEntries.map(([label, url], index) => (
            <div key={index} className="carousel-image-container">
              <img src={url} alt={label} className="carousel-image" />
              <p className="legend">{label}</p>
            </div>
          ))}
        </Carousel>
        <Button
          title="Update Images"
          onClick={() => handleSubmit("yelpBusiness.image_url")}
          className="update-button"
        />
      </Box>
    );
  };

  const renderSupportingDocuments = (documents) => {
    return (
      <Box className="section-container document-container">
        <div
          className="row-header"
          onClick={() => toggleSection("yelpBusinessSupportingDocument")}
        >
          <Heading as="h4" content="Supporting Documents" />
          <div className="CollapsibleRowIcon">
            {expandedSections["yelpBusinessSupportingDocument"] ? "−" : "+"}
          </div>
        </div>
        <Box
          className={`data ${
            expandedSections["yelpBusinessSupportingDocument"]
              ? "expanded"
              : "collapsed"
          }`}
        >
          <div className="document-list">
            {documents.map((doc, index) => (
              <Box key={index} className="document-item">
                <Heading as="h5" content={doc.documentName} />
                <p>
                  <strong>Type:</strong> {doc.documentType}
                </p>
                <p>
                  <strong>Number:</strong> {doc.documentNumber}
                </p>
                <p>
                  <strong>Issuer:</strong> {doc.issuer}
                </p>
                <p>
                  <strong>Expiration:</strong> {doc.expiration}
                </p>
                <a
                  href={`https://speedyslotz.com/${doc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-link"
                >
                  View Document <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </Box>
            ))}
          </div>
          <Button
            title="Update Supporting Documents"
            onClick={() => handleSubmit("yelpBusinessSupportingDocument")}
            className="update-button"
          />
        </Box>
      </Box>
    );
  };

  const toggleSection = (key) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <BannerArea>
      <Container className="tab-Container">
        <Heading
          as="h2"
          content={`Edit Business: ${formData.yelpBusiness?.name || "Unknown"}`}
        />
        <form onSubmit={handleSubmit}>
          {renderFields(formData)}
          <div className="ButtonWrap">
            <Button
              title="Back to Dashboard"
              onClick={() => router.push("/AdminDashboard")}
              className="Button"
            />
          </div>
        </form>
      </Container>
    </BannerArea>
  );
};

export default HeroContentEditBusiness;
