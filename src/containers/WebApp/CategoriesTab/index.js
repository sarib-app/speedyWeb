import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import BannerArea from "./categoriestab.style";
import CategoryOverlay from "../CategoryOverlay";
import NewCategoryOverlay from "../NewCategoryOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "common/api/api.js";
import { useSelector, useDispatch } from "react-redux";
import { setBusinessData } from "store/businessSlice";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);

const CategoriesTab = () => {
  const [isCategoryOverlayOpen, setCategoryOverlayOpen] = useState(false);
  const [isNewCategoryOverlayOpen, setNewCategoryOverlayOpen] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesErrorMessage, setCategoriesErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const businessData = useSelector((state) => state.business.businessData);
  const businessId = userData.provider_id || businessData?.yelpBusiness?.id;
  const [modalResetKey, setModalResetKey] = useState(0);
  const [expandedDisclaimerRows, setExpandedDisclaimerRows] = useState({}); // State for expanded disclaimers
  const [expandedDetailsRows, setExpandedDetailsRows] = useState({}); // State for expanded details
  const dispatch = useDispatch();

  const getCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetchCategories(businessId, authToken);

      if (response && response.payload.length >= 0) {
        setServiceCategories(response.payload);

        // Update yelpBusinessCategory in businessData
        const updatedBusinessData = {
          ...businessData,
          yelpBusinessCategory: response.payload,
        };
        dispatch(setBusinessData(updatedBusinessData));
      } else {
        setCategoriesErrorMessage(
          "No categories found. Please add categories to enhance your business!"
        );
      }
    } catch (error) {
      console.error("Failed to fetch the categories", error);
      setErrorMessage(
        "Failed to fetch the categories. Please try again later."
      );
    } finally {
      setCategoriesLoading(false);
    }
  };

  const updateCategories = () => {
    getCategories();
    setCategoryOverlayOpen(false);
    setNewCategoryOverlayOpen(false);
  };

  const openNewCategoryOverlay = () => {
    setNewCategoryOverlayOpen(true);
    setModalResetKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const toggleDisclaimer = (categoryId) => {
    setExpandedDisclaimerRows((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleDetails = (categoryId) => {
    setExpandedDetailsRows((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <BannerArea>
      <Container className="category-container">
        <div style={{ marginBottom: "1em" }}>
          <div className="category-label">
            <Heading as="h2" content={"Service Categories"} />
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="category-icon"
              onClick={openNewCategoryOverlay}
            />
          </div>
        </div>
        <div className="category-table">
          <div className="category-table-header">
            <div className="category-header-cell">Image</div>
            <div className="category-header-cell">Category</div>
            <div className="category-header-cell">Subcategories</div>
            <div className="category-header-cell">Service Types</div>
            <div className="category-header-cell">Minimum Price ($)</div>
            <div className="category-header-cell">Maximum Price ($)</div>
            <div className="category-header-cell">Duration (minutes)</div>
            <div className="category-header-cell">Disclaimer</div>
            <div className="category-header-cell">Details</div>
          </div>
          <div className="category-list">
            {categoriesLoading ? (
              <label>Loading service categories...</label>
            ) : categoriesErrorMessage ? (
              <label>{categoriesErrorMessage}</label>
            ) : serviceCategories.length > 0 ? (
              serviceCategories.map((category) => {
                const isDisclaimerExpanded =
                  expandedDisclaimerRows[category.category_id];
                const isDetailsExpanded =
                  expandedDetailsRows[category.category_id];
                const maxLength = 50; // Maximum length for the text before truncating

                return (
                  <div
                    key={category.category_id}
                    className="category-row"
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryOverlayOpen(true);
                    }}
                  >
                    <div className="category-cell">
                      <Image
                        src={`/assets/images/${category.categories[0]}.png`}
                        width={100}
                        height={100}
                        alt={category.categories.join(", ")}
                      />
                    </div>
                    <div className="category-cell">
                      {category.categories.join(", ")}
                    </div>
                    <div className="category-cell">
                      {category.subcategories?.join(", ") || "N/A"}
                    </div>
                    <div className="category-cell">
                      {category.serviceTypes?.join(", ") || "N/A"}
                    </div>
                    <div className="category-cell">${category.min_price}</div>
                    <div className="category-cell">${category.max_price}</div>
                    <div className="category-cell">
                      {category.duration} minutes
                    </div>
                    <div className="category-cell">
                      {isDisclaimerExpanded
                        ? category.disclaimer
                        : truncateText(category.disclaimer || "N/A", maxLength)}
                      {category.disclaimer &&
                        category.disclaimer.length > maxLength && (
                          <span
                            className="toggle-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDisclaimer(category.category_id);
                            }}
                          >
                            {isDisclaimerExpanded ? "Show less" : "Show more"}
                          </span>
                        )}
                    </div>
                    <div className="category-cell">
                      {isDetailsExpanded
                        ? category.details
                        : truncateText(category.details || "N/A", maxLength)}
                      {category.details &&
                        category.details.length > maxLength && (
                          <span
                            className="toggle-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDetails(category.category_id);
                            }}
                          >
                            {isDetailsExpanded ? "Show less" : "Show more"}
                          </span>
                        )}
                    </div>
                  </div>
                );
              })
            ) : (
              <label>No service categories available. Please add some!</label>
            )}
          </div>
        </div>
        <CategoryOverlay
          isOpen={isCategoryOverlayOpen}
          closeModal={() => setCategoryOverlayOpen(false)}
          selectedCategory={selectedCategory}
          updateCategories={updateCategories}
          businessId={businessId}
          token={authToken}
          resetKey={modalResetKey}
        />
        <NewCategoryOverlay
          isOpen={isNewCategoryOverlayOpen}
          closeModal={() => setNewCategoryOverlayOpen(false)}
          updateCategories={updateCategories}
          businessId={businessId}
          token={authToken}
          resetKey={modalResetKey}
        />
      </Container>
    </BannerArea>
  );
};

export default CategoriesTab;
