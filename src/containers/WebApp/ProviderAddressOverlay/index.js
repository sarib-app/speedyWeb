import React, { useState } from "react";
import styles from "./provideraddressoverlay.module.css";

const ProviderAddressOverlay = ({ address, onRequestClose }) => {
  // Dummy address data
  const dummyAddress = {
    business_id: "12345",
    address1: "123 Main Street",
    address2: "Apt 4B",
    address3: "",
    city: "Cityville",
    country: "Countryland",
    display_address: "123 Main Street, Apt 4B, Cityville",
    state: "Stateland",
    zip_code: "12345",
  };

  const [editedAddress, setEditedAddress] = useState(address || dummyAddress);

  // Function to handle form submission
  const handleSubmit = () => {
    // You can perform an API request to update the address data here
    // Example: updateAddress(editedAddress);
    onRequestClose(); // Close the modal after submission
  };

  // Function to handle field changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedAddress({
      ...editedAddress,
      [name]: value,
    });
  };

  return (
    <div className={styles["overlay"]}>
      <h2 className={styles["overlay-title"]}>Address Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Business ID:</label>
              <input
                className={styles.input}
                type="text"
                name="business_id"
                value={editedAddress.business_id}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Address 1:</label>
              <input
                className={styles.input}
                type="text"
                name="address1"
                value={editedAddress.address1}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Address 2:</label>
              <input
                className={styles.input}
                type="text"
                name="address2"
                value={editedAddress.address2}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Address 3:</label>
              <input
                className={styles.input}
                type="text"
                name="address3"
                value={editedAddress.address3}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>City:</label>
              <input
                className={styles.input}
                type="text"
                name="city"
                value={editedAddress.city}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>Country:</label>
              <input
                className={styles.input}
                type="text"
                name="country"
                value={editedAddress.country}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Display Address:</label>
              <input
                className={styles.input}
                type="text"
                name="display_address"
                value={editedAddress.display_address}
                onChange={handleFieldChange}
              />
            </div>
          </div>

          <div className={styles["field-pair"]}>
            <div className={styles.field}>
              <label className={styles.label}>State:</label>
              <input
                className={styles.input}
                type="text"
                name="state"
                value={editedAddress.state}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Zip Code:</label>
              <input
                className={styles.input}
                type="text"
                name="zip_code"
                value={editedAddress.zip_code}
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

export default ProviderAddressOverlay;
