import React, { useState, useEffect } from "react";
import styles from "./providerdealsoverlay.module.css";
import { fetchDeals } from "common/api/api";
import { useSelector } from "react-redux";

const ProviderDealsOverlay = ({ business }) => {
  const [dealsData, setDealsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    async function loadDealsData() {
      try {
        const data = await fetchDeals(business.id, authToken);
        setDealsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading deals data: ", error);
        setLoading(false);
      }
    }

    loadDealsData();
  }, [business.id, authToken]);

  const handleDealChange = (index, fieldName, value) => {
    const updatedDealsData = [...dealsData];
    updatedDealsData[index][fieldName] = value;
    setDealsData(updatedDealsData);
  };

  const fieldLabels = {
    deal_id: "DealID",
    business_id: "BusinessID",
    coupon_code: "CouponCode",
    description: "Description",
    end_date: "EndDate",
    end_time: "EndTime",
    start_date: "StartDate",
    start_time: "StartTime",
    title: "Title",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["overlay"]}>
      <h2 className={styles["overlay-title"]}>Provider Deals</h2>
      {!Array.isArray(dealsData) || dealsData.length === 0 ? (
        <div>No deals available for this business.</div>
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
              {dealsData.map((deal, index) => (
                <tr key={index}>
                  {Object.keys(deal).map((fieldName, fieldIndex) => (
                    <td key={fieldIndex}>
                      <input
                        className={styles.input}
                        type="text"
                        name={`deal-${index}-${fieldName}`}
                        value={deal[fieldName]}
                        onChange={(e) =>
                          handleDealChange(index, fieldName, e.target.value)
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

export default ProviderDealsOverlay;
