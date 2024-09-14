import React, { useState } from "react";
import ReactModal from "react-modal";
import styles from "./tabcontaineroverlay.module.css";
import Tab1Content from "../ProviderDetailOverlay/index";
import Tab2Content from "../ProviderDocumentOverlay/index";
import Tab3Content from "../ProviderSlotsOverlay/index";
import Tab4Content from "../ProviderDealsOverlay/index";
import Tab5Content from "../ProviderCategoriesOverlay/index";
import Tab6Content from "../ProviderAddressOverlay/index";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabContainerOverlay = ({ isOpen, onRequestClose, business }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Business Modal"
      overlayClassName={styles.overlay} // Use the same overlay class name as CategoryOverlay
      className={styles["modal-content"]} // Use the same modal content class name as CategoryOverlay
      ariaHideApp={false}
    >
      <div style={{ position: "relative" }}>
        <div>
          {/* Render tabs */}
          <div className={styles["tab-container"]}>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === 1 ? styles["active-tab-button"] : ""
              }`}
              onClick={() => handleTabChange(1)}
            >
              Details
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === 2 ? styles["active-tab-button"] : ""
              }`}
              onClick={() => handleTabChange(2)}
            >
              Document
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === 3 ? styles["active-tab-button"] : ""
              }`}
              onClick={() => handleTabChange(3)}
            >
              Slots
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === 4 ? styles["active-tab-button"] : ""
              }`}
              onClick={() => handleTabChange(4)}
            >
              Deals
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === 5 ? styles["active-tab-button"] : ""
              }`}
              onClick={() => handleTabChange(5)}
            >
              Categories
            </button>
            <button
              className={`${styles["tab-button"]} ${
                activeTab === 6 ? styles["active-tab-button"] : ""
              }`}
              onClick={() => handleTabChange(6)}
            >
              Address
            </button>
          </div>

          {/* Render the content of the active tab */}
          <div>
            {activeTab === 1 && <Tab1Content business={business} />}
            {activeTab === 2 && <Tab2Content business={business} />}
            {activeTab === 3 && <Tab3Content business={business} />}
            {activeTab === 4 && <Tab4Content business={business} />}
            {activeTab === 5 && <Tab5Content business={business} />}
            {activeTab === 6 && <Tab6Content business={business} />}
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default TabContainerOverlay;
