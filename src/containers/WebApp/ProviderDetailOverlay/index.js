// BusinessDetailOverlay.js

import React, { useState } from "react";
import styles from "./providerdetailoverlay.module.css"; // Import the CSS module

const ProviderDetailOverlay = ({ business, onRequestClose }) => {
  const [editedBusiness, setEditedBusiness] = useState(business);

  // Function to handle form submission
  const handleSubmit = () => {
    // You can perform an API request to update the business data here
    // Example: updateBusiness(editedBusiness);
    onRequestClose(); // Close the modal after submission
  };

  // Function to handle field changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedBusiness({
      ...editedBusiness,
      [name]: value,
    });
  };

  return (
    <div className={styles["overlay"]}>
      <h2 className={styles["overlay-title"]}>Business Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>ID:</label>
              <input
                className={styles.input}
                type="text"
                name="id"
                value={editedBusiness.id}
                onChange={handleFieldChange}
                readOnly
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Name:</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={editedBusiness.name}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Alias:</label>
              <input
                className={styles.input}
                type="text"
                name="alias"
                value={editedBusiness.alias}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Created At:</label>
              <input
                className={styles.input}
                type="text"
                name="created_at"
                value={editedBusiness.created_at}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Details:</label>
              <input
                className={styles.input}
                type="text"
                name="details"
                value={editedBusiness.details}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Display Phone:</label>
              <input
                className={styles.input}
                type="text"
                name="display_phone"
                value={editedBusiness.display_phone}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Distance:</label>
              <input
                className={styles.input}
                type="text"
                name="distance"
                value={editedBusiness.distance}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Image URL:</label>
              <input
                className={styles.input}
                type="text"
                name="image_url"
                value={editedBusiness.image_url}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Is Closed:</label>
              <input
                className={styles.input}
                type="text"
                name="is_closed"
                value={editedBusiness.is_closed}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Is Registered:</label>
              <input
                className={styles.input}
                type="text"
                name="is_registered"
                value={editedBusiness.is_registered}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Phone:</label>
              <input
                className={styles.input}
                type="text"
                name="phone"
                value={editedBusiness.phone}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Rating:</label>
              <input
                className={styles.input}
                type="text"
                name="rating"
                value={editedBusiness.rating}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Review Count:</label>
              <input
                className={styles.input}
                type="text"
                name="review_count"
                value={editedBusiness.review_count}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Status:</label>
              <input
                className={styles.input}
                type="text"
                name="status"
                value={editedBusiness.status}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>URL:</label>
              <input
                className={styles.input}
                type="text"
                name="url"
                value={editedBusiness.url}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        <div>
          <button className={styles["save-button"]} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProviderDetailOverlay;
