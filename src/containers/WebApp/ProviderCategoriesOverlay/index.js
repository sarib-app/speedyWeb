import React, { useState, useEffect } from "react";
import styles from "./providercategoriesoverlay.module.css";
import { fetchCategories } from "common/api/api";

const ProviderCategoriesOverlay = ({ business }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoriesData() {
      try {
        const data = await fetchCategories(business.id);
        setCategoriesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading categories data: ", error);
        setLoading(false);
      }
    }

    loadCategoriesData();
  }, [business.id]);

  const handleCategoryChange = (index, fieldName, value) => {
    const updatedCategoriesData = [...categoriesData];
    updatedCategoriesData[index][fieldName] = value;
    setCategoriesData(updatedCategoriesData);
  };

  const fieldLabels = {
    category_id: "Category ID",
    alias: "Alias",
    business_id: "Business ID",
    title: "Category Title",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["overlay"]}>
      <h2 className={styles["overlay-title"]}>Provider Categories</h2>
      {Array.isArray(categoriesData) && categoriesData.length === 0 ? (
        <div>No categories available for this business.</div>
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
              {categoriesData.map((category, index) => (
                <tr key={index}>
                  {Object.keys(category).map((fieldName, fieldIndex) => (
                    <td key={fieldIndex}>
                      <input
                        className={styles.input}
                        type="text"
                        value={category[fieldName]}
                        onChange={(e) =>
                          handleCategoryChange(index, fieldName, e.target.value)
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

export default ProviderCategoriesOverlay;
