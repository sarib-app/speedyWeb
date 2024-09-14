import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./newdealoverlay.module.css";
import moment from "moment";
import { saveDeal } from "common/api/api";
import Input from "common/components/Input";
import {
  faTimes,
  faTag,
  faClock,
  faInfoCircle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewDealOverlay = ({
  isOpen,
  closeModal,
  updateDeals,
  businessId,
  token,
  resetKey,
}) => {
  const [deal, setDeal] = useState({});
  const [error, setError] = useState("");

  const resetModalState = () => {
    setDeal({});
    setError("");
  };

  const handleInputChange = (pName, value) => {
    setDeal((prevDeal) => ({ ...prevDeal, [pName]: value.trim() }));
  };

  useEffect(() => {
    if (isOpen) {
      resetModalState();
    }
  }, [isOpen]);

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    deal.business_id = businessId;

    if (!deal.title?.trim()) {
      setError("Title is required");
      return;
    }

    if (!deal.description?.trim()) {
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
      await updateDeals(); // Ensure it waits for deals to update
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
        <h2 className={styles["modal-title"]}>Create New Deal</h2>
        <label>{error}</label>
        <label className={styles["modal-label"]}>
          <span>
            <FontAwesomeIcon icon={faTag} className={styles["input-icon"]} />
            Title:
          </span>
          <Input
            value={deal.title}
            type="text"
            name="title"
            className={styles["modal-input"]}
            onChange={(value) => handleInputChange("title", value)}
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
            onChange={(value) => handleInputChange("description", value)}
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
            onChange={(value) => handleInputChange("couponCode", value)}
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
          <input
            type="date"
            name="startDate"
            value={
              deal && deal.startDate
                ? moment(deal.startDate).format("YYYY-MM-DD")
                : ""
            }
            className={styles["modal-input"]}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
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
          <input
            type="date"
            name="endDate"
            value={
              deal && deal.endDate
                ? moment(deal.endDate).format("YYYY-MM-DD")
                : ""
            }
            className={styles["modal-input"]}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
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
              <input
                type="time"
                name="startTime"
                value={
                  deal && deal.startTime
                    ? moment(deal.startTime, "HH:mm").format("HH:mm")
                    : ""
                }
                className={styles["modal-input"]}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
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
              <input
                type="time"
                name="endTime"
                value={
                  deal && deal.endTime
                    ? moment(deal.endTime, "HH:mm").format("HH:mm")
                    : ""
                }
                className={styles["modal-input"]}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className={styles["modal-button-container"]}>
          <button onClick={submit} className={styles["modal-button"]}>
            Create
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default NewDealOverlay;
