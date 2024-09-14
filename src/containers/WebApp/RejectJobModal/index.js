import React, { useState } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./rejectjobmodal.module.css";

const RejectJobModal = ({
  isOpen,
  onClose,
  onReject,
  rejectionReason,
  setRejectionReason,
  rejectionError,
  setRejectionError,
  successMessage,
}) => {
  const handleRejectJob = () => {
    if (rejectionReason.length < 100) {
      setRejectionError(
        "Rejection reason must be at least 100 characters long."
      );
      return;
    }
    onReject();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Reject Job"
      overlayClassName={styles.overlay}
      className={styles.modalContent}
      ariaHideApp={false}
    >
      <div style={{ position: "relative" }}>
        <div className={styles.closeIcon} onClick={onClose}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
        <h2 className={styles.modalTitle}>Reject Job</h2>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          rows="5"
          placeholder="Please provide the reason for rejection (at least 100 characters)"
          className={styles.rejectionReasonInput}
        ></textarea>
        {rejectionError && (
          <div className={styles.errorMessage}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={styles.errorIcon}
            />
            <span className={styles.errorText}>{rejectionError}</span>
          </div>
        )}
        <button
          className={styles.rejectJobConfirmBtn}
          onClick={handleRejectJob}
        >
          Confirm Rejection
        </button>
        <button className={styles.rejectJobCancelBtn} onClick={onClose}>
          Cancel
        </button>
        {successMessage && (
          <div className={styles.successMessage}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={styles.successIcon}
            />
            <span className={styles.successText}>{successMessage}</span>
          </div>
        )}
      </div>
    </ReactModal>
  );
};

export default RejectJobModal;
