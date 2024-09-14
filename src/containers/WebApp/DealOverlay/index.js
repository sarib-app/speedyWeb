import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./dealoverlay.module.css";
import moment from "moment";
import { saveDeal, deleteDeal } from "common/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTag,
  faClock,
  faInfoCircle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Input from "common/components/Input";

const DealOverlay = ({
  isOpen,
  closeModal,
  selectedDeal,
  updateDeals,
  businessId,
  token,
  resetKey,
}) => {
  const [deal, setDeal] = useState(selectedDeal || {});
  const [error, setError] = useState("");

  useEffect(() => {
    setDeal(selectedDeal || {});
  }, [selectedDeal]);

  if (!selectedDeal) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
  };

  const deleteRecord = async () => {
    const response = await deleteDeal(deal.deal_id, token);
    if (response) {
      updateDeals();
      closeModal();
      setError("");
    } else {
      setError("Technical Error Occurred, please try after sometime.");
    }
  };

  const submit = async (e) => {
    if (!deal.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!deal.description.trim()) {
      setError("Description is required");
      return;
    }

    if (moment(deal.startDate).isAfter(deal.endDate)) {
      setError("Start Date should not be greater than End Date");
      return;
    }

    if (deal.startTime && !moment(deal.startTime, "HH:mm").isValid()) {
      setError("Start Time is invalid");
      return;
    }

    if (deal.endTime && !moment(deal.endTime, "HH:mm").isValid()) {
      setError("End Time is invalid");
      return;
    }

    const response = await saveDeal(deal, token);
    if (response) {
      updateDeals();
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
        <h2 className={styles["modal-title"]}>{deal.title}</h2>
        <label>{error}</label>
        <label className={styles["modal-label"]}>
          <span>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />
            Title:
          </span>
          <input
            value={deal.title}
            type="text"
            name="title"
            className={styles["modal-input"]}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles["modal-label"]}>
          <span>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={styles["input-icon"]}
            />
            Description:
          </span>
          <Input
            value={deal.description}
            type="text"
            name="description"
            className={styles["modal-input"]}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={styles["modal-label"]}>
          <span>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />
            Coupon Code:
          </span>
          <Input
            value={deal.couponCode}
            type="text"
            name="couponCode"
            className={styles["modal-input"]}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={styles["modal-label"]}>
          <span>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={styles["input-icon"]}
            />
            Start Date:
          </span>
          <Input
            type="date"
            name="startDate"
            value={
              deal && deal.startDate
                ? moment(deal.startDate).format("YYYY-MM-DD")
                : ""
            }
            className={styles["modal-input"]}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={styles["modal-label"]}>
          <span>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={styles["input-icon"]}
            />
            End Date:
          </span>
          <Input
            type="date"
            name="endDate"
            value={
              deal && deal.endDate
                ? moment(deal.endDate).format("YYYY-MM-DD")
                : ""
            }
            className={styles["modal-input"]}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <div className={styles["modal-time-container"]}>
          <div className={styles["modal-time-label"]}>
            <label className={styles["modal-label"]}>
              <span>
                <FontAwesomeIcon
                  icon={faClock}
                  className={styles["input-icon"]}
                />
                Start Time:
              </span>
              <Input
                type="time"
                name="startTime"
                value={
                  deal && deal.startTime
                    ? moment(deal.startTime, "HH:mm").format("HH:mm")
                    : ""
                }
                className={styles["modal-input"]}
                onChange={(e) => handleInputChange(e)}
              />
            </label>
          </div>
          <div className={styles["modal-time-label"]}>
            <label className={styles["modal-label"]}>
              <span>
                <FontAwesomeIcon
                  icon={faClock}
                  className={styles["input-icon"]}
                />
                End Time:
              </span>
              <Input
                type="time"
                name="endTime"
                value={
                  deal && deal.endTime
                    ? moment(deal.endTime, "HH:mm").format("HH:mm")
                    : ""
                }
                className={styles["modal-input"]}
                onChange={(e) => handleInputChange(e)}
              />
            </label>
          </div>
        </div>
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

export default DealOverlay;
