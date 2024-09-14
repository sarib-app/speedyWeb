import React, { useState, useEffect } from "react";
import styles from "./providerslotsoverlay.module.css";
import { useSelector } from "react-redux";
import { fetchSlots } from "common/api/api";

const ProviderSlotsOverlay = ({ business }) => {
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    async function loadSlotsData() {
      try {
        const response = await fetchSlots(business.id, authToken);
        if (response && Array.isArray(response.data)) {
          setSlotsData(response.data);
        } else {
          console.error(
            "Received data is not in the expected format",
            response
          );
          setSlotsData([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading slots data: ", error);
        setLoading(false);
      }
    }

    loadSlotsData();
  }, [business.id, authToken]);

  // Function to handle changes in slot data
  const handleSlotChange = (index, fieldName, value) => {
    const updatedSlotsData = [...slotsData];
    updatedSlotsData[index][fieldName] = value;
    setSlotsData(updatedSlotsData);
  };

  // Define field labels for better readability
  const fieldLabels = {
    date: "Date",
    startTime: "StartTime",
    endTime: "EndTime",
    serviceTypes: "Service",
    selectedServiceTypes: "Selected",
    username: "Username",
    booked: "Booked",
    noshow: "NoShow",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    rescheduled: "Rescheduled",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["overlay"]}>
      <h2 className={styles["overlay-title"]}>Provider Slots</h2>
      {slotsData.length === 0 ? (
        <div>No slots found for this business.</div>
      ) : (
        <div className={styles["table-container"]}>
          <table className={styles["document-table"]}>
            <thead>
              <tr>
                {Object.keys(fieldLabels).map((fieldName) => (
                  <th key={fieldName}>{fieldLabels[fieldName]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slotsData.map((slot, index) => (
                <tr key={index}>
                  {Object.keys(fieldLabels).map((fieldName, fieldIndex) => (
                    <td key={fieldIndex}>
                      <input
                        className={styles.input}
                        type="text"
                        name={`slot-${index}-${fieldName}`}
                        value={
                          Array.isArray(slot[fieldName])
                            ? slot[fieldName].join(", ")
                            : slot[fieldName]
                        }
                        onChange={(e) =>
                          handleSlotChange(index, fieldName, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderSlotsOverlay;
