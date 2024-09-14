import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./slotoverlay.module.css";
import moment from "moment";
import { saveDeal, deleteDeal, saveSlots } from "common/api/api";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const SlotOverlay = ({
  isOpen,
  closeModal,
  businessCategories,

  selectedEvent,
  saveEvent,
  updateEvents,
  serviceCategories,
  selectedCategory,
  businessId,
  token,
  resetKey,
}) => {
  const [event, setEvent] = useState(selectedEvent || {});
  const [error, setError] = useState("");
  const businessData = useSelector((state) => state.business.businessData);

  const serviceTypeOptions =
    businessCategories?.serviceTypes?.map((serviceTypes) => ({
      value: serviceTypes, // the category value
      label: serviceTypes, // the category name to be shown in the dropdown
    })) ?? [];

  useEffect(() => {
    setEvent(selectedEvent || {});
  }, [selectedEvent]);

  if (!selectedEvent) {
    return null;
  }

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

  const submit = async (e) => {
    const offeredServices =
      event.serviceTypes && Array.isArray(event.serviceTypes)
        ? event.serviceTypes
            .map((value) => {
              // Assuming `serviceCategories` is the correct array containing the service types/categories
              const matchedCategory = serviceTypeOptions.find(
                (cat) => cat.value === value // Also, make sure you're comparing with the right property (`value` instead of `name`)
              );
              return matchedCategory ? matchedCategory.value : null; // Here too, it should return the `value`
            })
            .filter(Boolean)
        : [];
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");
    "offeredServices", offeredServices;
    const eventData = {
      business_id: businessId,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      serviceTypes: offeredServices,
      open: true,
      period: "Hour",
    };

    "event", eventData;
    if (event.serviceTypes && event.serviceTypes.length === 0) {
      setError("Please select at least one category.");
      return;
    }
    // Validate start time and end time
    if (event.startTime && !moment(event.startTime, "HH:mm").isValid()) {
      setError("Start Time is invalid");
      return;
    }

    if (event.endTime && !moment(event.endTime, "HH:mm").isValid()) {
      setError("End Time is invalid");
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
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");

    const eventData = {
      business_id: businessId,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      blocked: true,
      period: "Hour",
    };

    "event", eventData;

    // Validate start time and end time
    if (event.startTime && !moment(event.startTime, "HH:mm").isValid()) {
      setError("Start Time is invalid");
      return;
    }

    if (event.endTime && !moment(event.endTime, "HH:mm").isValid()) {
      setError("End Time is invalid");
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
      key={resetKey} // Use the key prop here
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
        <h2 className={styles["modal-title"]}>Slot</h2>
        <label>{error}</label>
        <label className={styles["modal-label"]}>
          Select the relevant categories for the slot:
        </label>
        {serviceTypeOptions && serviceTypeOptions.length > 0 ? (
          <select
            name="serviceTypes"
            multiple
            value={event.serviceTypes} // Use "categories" here
            className={styles["modal-select"]}
            onChange={handleInputChange}
          >
            {serviceTypeOptions.map((serviceType, index) => (
              <option key={index} value={serviceType.name}>
                {serviceType.value}
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
            name="date"
            value={
              event && event.start
                ? moment(event.start).format("YYYY-MM-DD")
                : ""
            }
            className={styles["modal-input"]}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles["modal-time-container"]}>
          <div className={styles["modal-time-label"]}>
            <label className={styles["modal-label"]}>
              Start Time: &nbsp;
              <input
                type="time"
                name="startTime"
                value={
                  event && event.start
                    ? moment(event.start).format("HH:mm")
                    : ""
                }
                className={styles["modal-input"]}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles["modal-time-label"]}>
            <label className={styles["modal-label"]}>
              End Time: &nbsp;
              <input
                type="time"
                name="endTime"
                value={
                  event && event.end ? moment(event.end).format("HH:mm") : ""
                }
                className={styles["modal-input"]}
                onChange={handleInputChange}
              />
            </label>
          </div>
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

export default SlotOverlay;
