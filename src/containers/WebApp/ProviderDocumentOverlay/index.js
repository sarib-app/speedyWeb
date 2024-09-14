import React, { useState, useEffect } from "react";
import styles from "./providerdocumentoverlay.module.css";
import { fetchSupportingDocs, approveBusinessById } from "common/api/api";
import { useSelector } from "react-redux";

const ProviderDocumentsOverlay = ({ business }) => {
  const [documentsData, setDocumentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.auth.authToken);
  const [approvalSuccess, setApprovalSuccess] = useState(false); // New state variable

  useEffect(() => {
    async function loadDocumentsData() {
      try {
        const data = await fetchSupportingDocs(business.id, authToken);
        setDocumentsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading documents data: ", error);
        setLoading(false);
      }
    }

    loadDocumentsData();
  }, [business.id, authToken]);

  const downloadFile = (filePath, fileData) => {
    const fileName = filePath.split("/").pop();
    const decodedData = atob(fileData);
    const byteNumbers = new Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteNumbers[i] = decodedData.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  const handleDocumentChange = (index, fieldName, value) => {
    const updatedDocumentsData = { ...documentsData };
    updatedDocumentsData.documents[index][fieldName] = value;
    setDocumentsData(updatedDocumentsData);
  };

  const handleApprove = async () => {
    try {
      business.id;
      authToken;
      await approveBusinessById(business.id, authToken);
      setApprovalSuccess(true); // Set the success state to true
    } catch (error) {
      console.error("Error approving documents: ", error);
      setApprovalSuccess(false); // Optionally handle failed approval case
    }
  };
  // Define field labels for better readability
  const fieldLabels = {
    file_id: "FileID",
    contentType: "ContentType",
    fileName: "FileName",
    providerId: "ProviderID",
    status: "Status",
    uploadTimestamp: "Timestamp",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["overlay"]}>
      <h2 className={styles["overlay-title"]}>Supporting Documents</h2>
      {/* Success Message */}
      {approvalSuccess && (
        <div className={styles["success-message"]}>
          File approved successfully.
        </div>
      )}

      {/* Document Details Table */}
      <div className={styles["table-container"]}>
        {!Array.isArray(documentsData.documents) ||
        documentsData.documents.length === 0 ? (
          <div>No supporting documents available for this business.</div>
        ) : (
          <table className={styles["document-table"]}>
            <thead>
              <tr>
                {Object.keys(fieldLabels).map((fieldName) => (
                  <th key={fieldName}>{fieldLabels[fieldName]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documentsData.documents.map((document, index) => (
                <tr key={index}>
                  {Object.keys(fieldLabels).map((fieldName, fieldIndex) => (
                    <td key={fieldIndex}>
                      <input
                        className={styles.input}
                        type="text"
                        value={document[fieldName]}
                        onChange={(e) =>
                          handleDocumentChange(index, fieldName, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* File Attachments Section */}
      <div className={styles["attachments-section"]}>
        <h3>Attachments:</h3>
        <div className={styles["table-container"]}>
          {Object.entries(documentsData.fileData || {}).map(
            ([filePath, fileData], index) => (
              <div key={index}>
                <a href="#" onClick={() => downloadFile(filePath, fileData)}>
                  {filePath.split("/").pop()}
                </a>
              </div>
            )
          )}
        </div>
      </div>
      {/* Approve Button */}
      <button className={styles["approve-button"]} onClick={handleApprove}>
        Approve
      </button>
    </div>
  );
};

export default ProviderDocumentsOverlay;
