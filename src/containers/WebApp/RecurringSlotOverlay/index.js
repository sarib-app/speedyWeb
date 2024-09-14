import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./recurringslotoverlay.module.css";
import moment from "moment";
import { saveDeal, deleteDeal, saveSlots } from "common/api/api";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecurringSlotOverlay = ({
  isOpen,
  closeModal,
  businessCategories,
  saveEvent,
  updateEvents,
  serviceCategories,
  selectedCategory,
  businessId,
  token,
  resetKey,
}) => {
  // At the beginning of your component function
  const [event, setEvent] = useState({
    start: moment().format("YYYY-MM-DD"), // Set default start date to current date
    // Initialize other event properties as needed
  });

  const [error, setError] = useState("");
  const [period, setPeriod] = useState(false);

  const serviceTypeOptions =
    businessCategories?.flatMap((category) =>
      category.serviceTypes.map((serviceType) => ({
        value: serviceType, // the service type value
        label: serviceType, // the service type name to be shown in the dropdown
      }))
    ) ?? [];

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "serviceTypes") {
      let selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setEvent((prevEvent) => ({ ...prevEvent, serviceTypes: selectedValues }));
    } else {
      setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    // Optionally reset date inputs or perform other logic here
  };

  const submit = async (e) => {
    const offeredServices =
      event.serviceTypes && Array.isArray(event.serviceTypes)
        ? event.serviceTypes
            .map((value) => {
              const matchedCategory = serviceTypeOptions.find(
                (cat) => cat.value === value
              );
              return matchedCategory ? matchedCategory.value : null;
            })
            .filter(Boolean)
        : [];
    const formattedDate = moment(event.start).format("YYYY-MM-DD");

    const eventData = {
      business_id: businessId,
      date: formattedDate,
      serviceTypes: offeredServices,
      open: true,
      period: period,
    };

    if (offeredServices && offeredServices.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    if (!period) {
      setError("Please select slots frequency.");
      return;
    }

    const response = await saveSlots(eventData, token);
    if (response) {
      updateEvents();
      closeModal();
      setError("");
    } else {
      setError("Technical Error Occurred, please try after sometime.");
    }
  };

  const block = async (e) => {
    const offeredServices =
      event.serviceTypes && Array.isArray(event.serviceTypes)
        ? event.serviceTypes
            .map((value) => {
              const matchedCategory = serviceTypeOptions.find(
                (cat) => cat.value === value
              );
              return matchedCategory ? matchedCategory.value : null;
            })
            .filter(Boolean)
        : [];
    const formattedDate = moment(event.start).format("YYYY-MM-DD");

    const eventData = {
      business_id: businessId,
      date: formattedDate,
      serviceTypes: offeredServices,
      blocked: true,
      period: period,
    };

    if (offeredServices && offeredServices.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    if (!period) {
      setError("Please select slots frequency.");
      return;
    }

    const response = await saveSlots(eventData, token);
    if (response) {
      updateEvents();
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
        <h2 className={styles["modal-title"]}>Bulk Slot Scheduler</h2>
        <label>{error}</label>
        <label className={styles["modal-label"]}>
          Select the relevant categories for the slot:
        </label>
        {serviceTypeOptions && serviceTypeOptions.length > 0 ? (
          <select
            name="serviceTypes"
            multiple
            value={event.serviceTypes || []}
            className={styles["modal-select"]}
            onChange={handleInputChange}
          >
            {serviceTypeOptions.map((serviceType, index) => (
              <option key={index} value={serviceType.value}>
                {serviceType.label}
              </option>
            ))}
          </select>
        ) : (
          <p style={{ color: "var(--textColor)" }}>
            Please create a category first to specify slots.
          </p>
        )}

        <label className={styles["modal-label"]}>
          Date:
          <input
            type="date"
            name="start"
            value={
              event && event.start
                ? moment(event.start).format("YYYY-MM-DD")
                : ""
            }
            className={styles["modal-input"]}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles["modal-label"]}>Period:</div>
        <div>
          <label>
            <input
              type="radio"
              value="Day"
              checked={period === "Day"}
              onChange={handlePeriodChange}
            />
            Apply slots for: Daily
          </label>
          <label>
            <input
              type="radio"
              value="Week"
              checked={period === "Week"}
              onChange={handlePeriodChange}
            />
            Apply slots for: Weekly
          </label>
          <label>
            <input
              type="radio"
              value="Month"
              checked={period === "Month"}
              onChange={handlePeriodChange}
            />
            Apply slots for: Monthly
          </label>
        </div>

        <div className={styles["modal-button-container"]}>
          <button onClick={submit} className={styles["modal-button"]}>
            Open
          </button>
          <button onClick={block} className={styles["secondary"]}>
            Block
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default RecurringSlotOverlay;
