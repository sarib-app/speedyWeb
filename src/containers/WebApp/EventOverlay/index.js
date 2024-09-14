import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./eventoverlay.module.css";
import moment from "moment";
import { saveDeal, deleteDeal, saveSlots, deleteSlot } from "common/api/api";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventOverlay = ({
  isOpen,
  closeModal,
  selectedEvent,
  saveEvent,
  updateEvents,
  token,
  resetKey,
}) => {
  const [event, setEvent] = useState(selectedEvent || {});
  const [error, setError] = useState("");

  useEffect(() => {
    "Inside EventOverlay", selectedEvent;
    setEvent(selectedEvent || {});
  }, [selectedEvent]);

  if (!selectedEvent) {
    return null;
  }

  const deleteRecord = async () => {
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");
    const eventData = {
      business_id: event.business_id,
      key: event.key,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      serviceTypes: event.serviceTypes,
      selectedServiceTypes: event.selectedServiceTypes,
      username: event.username,
      booked: event.booked,
      noshow: event.noshow,
      confirmed: event.confirmed,
      period: "Hour",
    };
    const response = await deleteSlot(eventData, token); // replace with actual function and params
    if (response) {
      updateEvents();
      closeModal();
      setError("");
    } else {
      setError("Technical Error Occurred, please try after sometime.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "categories") {
      let selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setEvent((prevEvent) => ({ ...prevEvent, categories: selectedValues }));
    } else {
      setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    }
  };

  const submit = async (e) => {
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");

    const eventData = {
      business_id: event.business_id,
      key: event.key,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      serviceTypes: event.serviceTypes,
      selectedServiceTypes: event.selectedServiceTypes,
      username: event.username,
      booked: event.booked,
      noshow: event.noshow,
      cancelled: event.cancelled,
      confirmed: event.confirmed,
      period: "Hour",
    };

    "event", eventData;
    if (event.selectedServiceTypes?.length === 0) {
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
      saveEvent();
      closeModal();
      setError("");
    } else {
      setError("Technical Error Occurred, please try after sometime.");
    }
  };

  const confirm = async (e) => {
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");

    const eventData = {
      business_id: event.business_id,
      key: event.key,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      serviceTypes: event.serviceTypes,
      selectedServiceTypes: event.selectedServiceTypes,
      username: event.username,
      booked: event.booked,
      noshow: event.noshow,
      cancelled: event.cancelled,
      confirmed: true,
      period: "Hour",
    };

    "event", eventData;
    if (event.selectedServiceTypes?.length === 0) {
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

  const noshow = async (e) => {
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");

    const eventData = {
      business_id: event.business_id,
      key: event.key,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      serviceTypes: event.serviceTypes,
      selectedServiceTypes: event.selectedServiceTypes,
      username: event.username,
      booked: event.booked,
      noshow: true,
      cancelled: event.cancelled,
      confirmed: event.confirmed,
      period: "Hour",
    };

    "event", eventData;
    if (event.selectedServiceTypes?.length === 0) {
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

  const cancel = async (e) => {
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    const formattedStartTime = moment(event.start).format("HH:mm:ss");
    const formattedEndTime = moment(event.end).format("HH:mm:ss");

    const eventData = {
      business_id: event.business_id,
      key: event.key,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      serviceTypes: event.serviceTypes,
      selectedServiceTypes: event.selectedServiceTypes,
      username: event.username,
      booked: event.booked,
      noshow: event.noshow,
      cancelled: true,
      confirmed: event.confirmed,
      period: "Hour",
    };

    "event", eventData;
    if (event.selectedServiceTypes?.length === 0) {
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

  const getStatusClassName = () => {
    let className = "";
    switch (event.color) {
      case "#28a745": // Green for Confirmed
        className = styles["status-confirmed"];
        break;
      case "#007bff": // Blue for Open
        className = styles["status-open"];
        break;
      case "#ff851b": // Orange for Booked
        className = styles["status-booked"];
        break;
      case "#fd7e14": // Orange variant for Booked & Rescheduled
        className = styles["status-booked-rescheduled"];
        break;
      case "#17a2b8": // Light blue for Open & Rescheduled
        className = styles["status-open-rescheduled"];
        break;
      case "#dc3545": // Red for Cancelled
        className = styles["status-cancelled"];
        break;
      case "#6f42c1": // Purple for No Show
        className = styles["status-noshow"];
        break;
      case "#343a40": // Dark gray for Blocked
        className = styles["status-blocked"];
        break;
      case "#f0ad4e": // Bootstrap's warning color for only Rescheduled
        className = styles["status-rescheduled"];
        break;
      default:
        className = "";
    }
    return className;
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
        <div className={styles["modal-time-container"]}>
          <div className={styles["modal-time-container"]}>
            <label className={styles["modal-label"]}>Customer Name: </label>
            <label className={styles["modal-label"]}>{event.username}</label>
          </div>
          <div className={styles["modal-time-container"]}>
            <label className={styles["modal-label"]}>Status: </label>
            <label
              className={`${styles["modal-label"]} ${getStatusClassName()}`}
            >
              {event.title}
            </label>
          </div>
        </div>
        <label className={styles["modal-label"]}>
          Select the relevant categories for the slot:
        </label>
        {event.serviceTypes && event.serviceTypes.length > 0 ? (
          <select
            name="categories"
            multiple
            value={event.selectedServiceTypes}
            className={styles["modal-select"]}
            onChange={handleInputChange}
          >
            {event.serviceTypes.map((category) => (
              <option
                key={category}
                value={category}
                className={
                  event.selectedServiceTypes?.includes(category)
                    ? styles["selected-option"]
                    : ""
                }
              >
                {category}
              </option>
            ))}
          </select>
        ) : (
          <p>Please create a category first to specify slots.</p>
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
              Start Time:
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
              End Time:
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
          {/* If status is "Open", show "Update" and "Delete" buttons */}
          {event.title === "Open" && (
            <>
              <button onClick={submit} className={styles["secondary"]}>
                Update
              </button>

              <button
                onClick={deleteRecord}
                className={`${styles["modal-button"]} ${styles["modal-button"]}`}
              >
                Delete
              </button>
            </>
          )}

          {/* If status is "Booked", show "Delete" and "Confirm" buttons */}
          {event.title === "Booked" && (
            <>
              <button
                onClick={confirm}
                className={`${styles["modal-button"]} ${styles["secondary"]}`}
              >
                Confirm
              </button>
              <button
                onClick={cancel}
                className={`${styles["modal-button"]} ${styles["secondary"]}`}
              >
                Cancel
              </button>
            </>
          )}

          {event.title === "Confirmed" && (
            <>
              <button
                onClick={noshow}
                className={`${styles["modal-button"]} ${styles["secondary"]}`}
              >
                No Show
              </button>
              <button
                onClick={cancel}
                className={`${styles["modal-button"]} ${styles["secondary"]}`}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default EventOverlay;
