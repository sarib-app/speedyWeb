import React, { useState } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./profileoverlay.module.css";

const ProfileOverlay = ({
  isOpen,
  onClose,
  profiles,
  sectionsToRender,
  slot,
}) => {
  const [expandedSections, setExpandedSections] = useState([]);

  if (!profiles) {
    return null;
  }

  const profileTitles = {
    userProfile: "User Profile",
    userAddress: "User Address",
    userPreferredPharmacy: "Preferred Pharmacy",
    userMedicalHistory: "Medical History",
    userDentalInformation: "Dental Information",
    userPersonalInsurance: "Medical Insurance",
    userDentalInsurance: "Dental Insurance",
    userHomeInformation: "Home Information",
    userPetInformation: "Pet Information",
    userPetInsurance: "Pet Insurance",
  };

  const toggleSection = (section) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };

  const renderSection = (title, key) => {
    const data = profiles[key];

    if (!sectionsToRender.includes(key)) {
      return null;
    }

    return (
      <div className={styles.section}>
        <h3 className={styles.sectionTitle} onClick={() => toggleSection(key)}>
          {title}
          <FontAwesomeIcon
            icon={expandedSections.includes(key) ? faMinusCircle : faPlusCircle}
            className={styles.expandIcon}
          />
        </h3>
        {expandedSections.includes(key) && (
          <div className={styles.sectionGrid}>
            {data
              ? Object.entries(data).map(([fieldKey, value]) => (
                  <div key={fieldKey} className={styles.sectionItem}>
                    <strong className={styles.sectionStrong}>
                      {fieldKey.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>
                    {value ?? "Not provided"}
                  </div>
                ))
              : "Data not available."}
          </div>
        )}
      </div>
    );
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Profile"
      overlayClassName={styles.overlay}
      className={styles.modalContent}
      ariaHideApp={false}
    >
      <div style={{ position: "relative" }}>
        <div className={styles.closeIcon}>
          <FontAwesomeIcon icon={faTimes} onClick={onClose} />
        </div>
        <h2 className={styles.modalTitle}>User Profile</h2>
        <div className={styles.modalBody}>
          {slot && slot.profilesAttached
            ? slot.profilesAttached.map((section) =>
                renderSection(profileTitles[section], section)
              )
            : "No profiles attached."}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </ReactModal>
  );
};

export default ProfileOverlay;
