import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./categoryoverlay.module.css";
import {
  deleteCategory,
  saveCategories,
  fetchAllCategories,
} from "common/api/api";
import {
  faTimes,
  faTag,
  faClock,
  faInfoCircle,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

const CategoryOverlay = ({
  isOpen,
  closeModal,
  selectedCategory,
  updateCategories,
  businessId,
  token,
  resetKey,
}) => {
  const [category, setCategory] = useState(selectedCategory || {});
  const [error, setError] = useState("");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubcategoryOption, setSelectedSubcategoryOption] =
    useState(null);
  const [selectedServiceOption, setSelectedServiceOption] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchAllCategories(token);
        if (data) {
          setAllData(data);
          const uniqueCategories = Array.from(
            new Set(data.map((item) => item.categoryName))
          ).map((categoryName) => ({
            value: categoryName,
            label: categoryName,
          }));
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategoriesData();
  }, [token]);

  useEffect(() => {
    if (selectedCategory) {
      const { categories, subcategories, serviceTypes } = selectedCategory;

      setCategory(selectedCategory);

      const mapToOption = (method) => ({
        label: method.charAt(0).toUpperCase() + method.slice(1),
        value: method,
      });

      setSelectedCategoryOption(categories?.map(mapToOption)[0] || null);
      setSelectedSubcategoryOption(subcategories?.map(mapToOption)[0] || null);
      setSelectedServiceOption(serviceTypes?.map(mapToOption)[0] || null);
    } else {
      setCategory({});
      setSelectedCategoryOption(null);
      setSelectedSubcategoryOption(null);
      setSelectedServiceOption(null);
    }
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const deleteRecord = async () => {
    const response = await deleteCategory(category.category_id, token);
    if (response) {
      updateCategories();
      closeModal();
      setError("");
    } else {
      setError("Technical Error Occurred, please try after sometime.");
    }
  };

  const onCategoryChange = (selectedOption) => {
    setSelectedCategoryOption(selectedOption);
    setSelectedSubcategoryOption(null);
    setSelectedServiceOption(null);

    if (!selectedOption) {
      setSubcategories([]);
      setServices([]);
      return;
    }

    const subcategoriesFiltered = allData
      .filter((item) => item.categoryName === selectedOption.value)
      .map((item) => ({
        value: item.subcategoryName,
        label: item.subcategoryName,
      }));

    const uniqueSubcategories = Array.from(
      new Set(subcategoriesFiltered.map(JSON.stringify))
    ).map(JSON.parse);

    setSubcategories(uniqueSubcategories);
  };

  const onSubcategoryChange = (selectedOption) => {
    setSelectedSubcategoryOption(selectedOption);
    setSelectedServiceOption(null);

    if (!selectedOption) {
      setServices([]);
      return;
    }

    const servicesFiltered = allData
      .filter((item) => item.subcategoryName === selectedOption.value)
      .map((item) => ({
        value: item.serviceName,
        label: item.serviceName,
      }));

    setServices(servicesFiltered);
  };

  const submit = async (e) => {
    category.business_id = businessId;

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

    if (category.disclaimer && category.disclaimer.length > 200) {
      setError("Disclaimer cannot exceed 200 characters");
      return;
    }

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

  return (
    <ReactModal
      key={resetKey}
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
        <h2 className={styles["modal-title"]}>Update Service Category</h2>
        <label>{error}</label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faListAlt} className={styles["input-icon"]} />{" "}
          Category:
          <Select
            options={categories}
            value={selectedCategoryOption}
            onChange={onCategoryChange}
            placeholder="Select Category"
            className="custom-input"
          />
        </label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faListAlt} className={styles["input-icon"]} />{" "}
          Subcategory:
          <Select
            options={subcategories}
            value={selectedSubcategoryOption}
            onChange={onSubcategoryChange}
            placeholder="Select Subcategory"
            isDisabled={!selectedCategoryOption}
            className="custom-input"
          />
        </label>
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon icon={faListAlt} className={styles["input-icon"]} />{" "}
          Service:
          <Select
            options={services}
            value={selectedServiceOption}
            onChange={setSelectedServiceOption}
            placeholder="Select Service"
            isDisabled={!selectedSubcategoryOption}
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
        <label className={styles["modal-label"]}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={styles["input-icon"]}
          />{" "}
          Disclaimer:
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
          Details:
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
            Update
          </button>
          <button
            onClick={deleteRecord}
            className={`${styles["modal-button"]} ${styles["secondary"]}`}
          >
            Delete
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default CategoryOverlay;
