import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./newcategoryoverlay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { saveCategories, fetchAllCategories } from "common/api/api"; // Assuming you have a deleteDeal API
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
  faTag,
  faClock,
  faInfoCircle,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

const NewCategoryOverlay = ({
  isOpen,
  closeModal,
  updateCategories,
  businessId,
  token,
  resetKey, // Add this new prop
}) => {
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  const providerId = userData?.provider_id;
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async (token) => {
      try {
        const data = await fetchAllCategories(token);
        if (data) {
          setAllData(data);
          const uniqueCategories = Array.from(
            new Set(data.map((item) => item.categoryName))
          ).map((categoryName) => {
            return { value: categoryName, label: categoryName };
          });
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategoriesData(token);
  }, []);

  const onCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);

    if (selectedOptions.length === 0) {
      setSubcategories([]);
      setServices([]);
      setSelectedSubcategories([]);
      setSelectedServices([]);
      return;
    }

    const subcategoriesFiltered = allData
      .filter((item) =>
        selectedOptions.some((option) => option.value === item.categoryName)
      )
      .map((item) => ({
        value: item.subcategoryName,
        label: item.subcategoryName,
      }));

    const uniqueSubcategories = Array.from(
      new Set(subcategoriesFiltered.map(JSON.stringify))
    ).map(JSON.parse);

    setSubcategories(uniqueSubcategories);
  };

  const onSubcategoryChange = (selectedOptions) => {
    setSelectedSubcategories(selectedOptions);

    if (selectedOptions.length === 0) {
      setServices([]);
      setSelectedServices([]);
      return;
    }

    const servicesFiltered = allData
      .filter((item) =>
        selectedOptions.some((option) => option.value === item.subcategoryName)
      )
      .map((item) => ({
        value: item.serviceTypeName,
        label: item.serviceTypeName,
      }));

    setServices(servicesFiltered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  useEffect(() => {
    if (isOpen) {
      setCategory({});
      setError("");
    }
  }, [isOpen]);

  const submit = async (e) => {
    category.business_id = businessId;
    const selectedCategoriesArray = selectedCategories.map(
      (option) => option.value
    );
    const selectedSubcategoriesArray = selectedSubcategories.map(
      (option) => option.value
    );
    const selectedServicesArray = selectedServices.map(
      (option) => option.value
    );

    category.categories = selectedCategoriesArray;
    category.subcategories = selectedSubcategoriesArray;
    category.serviceTypes = selectedServicesArray;

    if (!category.categories) {
      setError("Category is required");
      return;
    }

    if (!category.subcategories) {
      setError("Sub Category is required");
      return;
    }
    if (!category.serviceTypes) {
      setError("Service Type is required");
      return;
    }
    if (!category.onsiteEstimate) {
      setError("On-Site Estimate is required");
      return;
    }

    if (category.min_price && category.max_price) {
      if (Number(category.min_price) > Number(category.max_price)) {
        setError("Minimum price cannot be higher than maximum price");
        return;
      }
    } else {
      if (!category.min_price) setError("Minimum price is required");
      else if (!category.max_price) setError("Maximum price is required");
      return;
    }

    if (
      !category.duration ||
      isNaN(category.duration) ||
      category.duration <= 0
    ) {
      setError("Please provide a valid duration in minutes");
      return;
    }

    if (category.disclaimer && category.disclaimer.length > 500) {
      setError("Disclaimer cannot exceed 500 characters");
      return;
    }

    // Check details length (Optional)
    if (category.details && category.details.length > 500) {
      setError("Details cannot exceed 500 characters");
      return;
    }

    const response = await saveCategories(category, token);
    if (response) {
      updateCategories();
      closeModal();
      setError("");
    } else {
      setError("Technical Error Occurred, please try after sometime.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: checked,
    }));
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      overlayClassName={styles.overlay}
      className={styles["modal-content"]}
      ariaHideApp={false}
    >
      <div style={{ position: "relative" }}>
        <div className={styles["close-icon"]}>
          <FontAwesomeIcon icon={faTimes} onClick={closeModal} />
        </div>
        <h2 className={styles["modal-title"]}>Create New Service Category</h2>
        <label>{error}</label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faListAlt} className={styles["input-icon"]} />{" "}
          Category :
          <Select
            options={categories}
            value={selectedCategories}
            isMulti
            onChange={onCategoryChange}
            placeholder="Select Category"
            className="custom-input"
          />
        </label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faListAlt} className={styles["input-icon"]} />{" "}
          Subcategory :
          <Select
            options={subcategories}
            value={selectedSubcategories}
            isMulti
            onChange={onSubcategoryChange}
            placeholder="Select Subcategory"
            isDisabled={!selectedCategories.length}
            className="custom-input"
          />
        </label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faListAlt} className={styles["input-icon"]} />{" "}
          Service :
          <Select
            options={services}
            value={selectedServices}
            isMulti
            onChange={setSelectedServices}
            placeholder="Select Service"
            isDisabled={!selectedSubcategories.length}
            className="custom-input"
          />
        </label>

        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faClock} className={styles["input-icon"]} />{" "}
          Duration (minutes):
          <input
            value={category.duration || ""}
            placeholder="Duration in minutes"
            type="number"
            name="duration"
            className={styles["modal-input"]}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles["row"]}>
          <label className={styles["modal-label"]}>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />{" "}
            Minimum Price ($):
            <input
              value={category.min_price || ""}
              placeholder="Minimum Price"
              type="number"
              name="min_price"
              className={styles["modal-input"]}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles["modal-label"]}>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />{" "}
            Maximum Price ($):
            <input
              value={category.max_price || ""}
              placeholder="Maximum Price"
              type="number"
              name="max_price"
              className={styles["modal-input"]}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles["row"]}>
          <label className={styles["modal-label"]}>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />{" "}
            On-Site Estimate Price ($):
            <input
              value={category.onsiteEstimate || ""}
              placeholder="On-Site Estimate Price"
              type="number"
              name="onsiteEstimate"
              className={styles["modal-input"]}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles["modal-label"]}>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />{" "}
            Waved Hired:{" "}
            <input
              type="checkbox"
              checked={category.wavedHired || false}
              name="wavedHired"
              className={styles["modal-checkbox"]}
              style={{ marginTop: "15px" }}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={styles["input-icon"]}
          />{" "}
          Disclaimer :
          <input
            value={category.disclaimer || ""}
            placeholder="Put disclaimer if any!"
            type="text"
            name="disclaimer"
            className={styles["modal-input"]}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={styles["input-icon"]}
          />{" "}
          Details :
          <textarea
            value={category.details || ""}
            placeholder="Additional details about the service category"
            name="details"
            className={styles["modal-input"]}
            onChange={handleInputChange}
            maxLength="500"
          />
        </label>
        <div className={styles["modal-button-container"]}>
          <button onClick={submit} className={styles["modal-button"]}>
            Create
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default NewCategoryOverlay;
