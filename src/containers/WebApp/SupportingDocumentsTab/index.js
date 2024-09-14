import React, { useState, useRef } from "react";
import StyledCollapsibleRow, {
  BannerArea,
} from "./supportingdocumentstab.style";
import { useDispatch, useSelector } from "react-redux";
import { saveFileToServer } from "common/api/api";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import Box from "common/components/Box";
import Link from "common/components/Link";

const SupportingDocumentsTab = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const hiddenFileInput = useRef(null);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const businessData = useSelector((state) => state.business.businessData);

  const providerId = userData?.provider_id || businessData?.yelpBusiness?.id;

  const token = useSelector((state) => state.auth.authToken);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    setFileError("");
    setUploadSuccess("");
    setSelectedFiles([...event.target.files]);
  };

  const handleSubmit = async (e) => {
    ("Inside Upload Documents");

    if (!selectedFiles || selectedFiles.length === 0) {
      console.error("No file selected for upload.");
      return;
    }

    // Create a FormData object
    const uploadData = new FormData();
    // Append each file to the formData object
    for (const file of selectedFiles) {
      uploadData.append("files", file);
    }
    // Append the businessId
    uploadData.append("providerId", providerId);

    // Append additional document information
    uploadData.append("documentType", formData.documentType);
    uploadData.append("documentName", formData.documentName);
    uploadData.append("documentNumber", formData.documentNumber);
    uploadData.append("issuer", formData.issuer);
    uploadData.append("expiration", formData.expiration);

    try {
      // Replace saveFileToServer with the function that sends the formData
      // Ensure that this function sets the correct headers for a multipart/form-data request
      const response = await saveFileToServer(uploadData, token);
      if (response?.status === 201) {
        setSelectedFiles([]); // Clear the selected files
        setFormData({
          documentType: "",
          documentName: "",
          documentNumber: "",
          issuer: "",
          expiration: "",
        });
        setUploadSuccess("Documents uploaded successfully!");
      }
    } catch (error) {
      console.error("Uploading documents failed:", error.message);
    }
  };

  const fileTypes = [".pdf"]; // Example file types
  // State to hold form values
  const [formData, setFormData] = useState({
    documentType: "",
    documentName: "",
    documentNumber: "",
    issuer: "",
    expiration: "",
  });

  // Handle form data change
  const handleChange = (pName, value) => {
    // const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [pName]: value,
    }));
  };

  return (
    <BannerArea>
      <Container className="supporting-container">
        <Heading as="h2" content="Add Document" />
        <StyledCollapsibleRow>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            {fileError && <div className="errorColor">{fileError}</div>}
            {uploadSuccess && (
              <div className="success-message">{uploadSuccess}</div>
            )}
            <label>
              {" "}
              <i class="fas fa-file-alt iconStyle"></i>Select Document Type
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              className="input"
              onChange={(e) => handleChange("documentType", e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="license">License</option>
              <option value="insurance">Insurance</option>
              <option value="certification">Certification</option>
              <option value="companyDocument">Company Document</option>
            </select>

            <label>
              {" "}
              <i class="fas fa-file-alt iconStyle"></i> Document Name
            </label>
            <Input
              type="text"
              name="documentName"
              value={formData.documentName}
              className="input"
              onChange={(value) => handleChange("documentName", value)}
            />

            <label>
              {" "}
              <i class="fas fa-file-alt iconStyle"></i>Document Number
            </label>
            <Input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              className="input"
              onChange={(value) => handleChange("documentNumber", value)}
            />

            <label>
              {" "}
              <i class="fas fa-id-card-alt iconStyle"></i>Issuer or Authority
            </label>
            <Input
              type="text"
              name="issuer"
              value={formData.issuer}
              className="input"
              onChange={(value) => handleChange("issuer", value)}
            />

            <label>
              <i class="far fa-calendar-alt iconStyle"></i>Expiration Date
            </label>
            <input
              type="date"
              name="expiration"
              value={formData.expiration}
              className="input"
              onChange={(e) => handleChange("expiration", e.target.value)}
            />
            <button
              name="uploadfile"
              id="uploadfile"
              component="label"
              aria-label="input"
              className="input-file"
              onClick={handleClick}
            >
              Select Supporting Documents
            </button>

            <input
              type="file"
              onChange={handleFileChange}
              required={true}
              aria-label="input"
              ref={hiddenFileInput}
              accept={fileTypes.toString()}
              multiple
              style={{ display: "none" }} // Make the file input element invisible
            />
            <div className="file-display">
              {selectedFiles &&
                selectedFiles.map((file, index) => (
                  <p key={index}>
                    <span style={{ fontWeight: 500 }}>File: </span> {file.name}
                  </p>
                ))}
            </div>

            <label className="label-file">
              Please upload documents proving your business, insurance, or
              license.
            </label>

            <div className="upload-additional-info">
              <p>
                ** By providing these documents, you can earn badges that will
                be displayed to your clients when they search, enhancing your
                credibility and trustworthiness.
              </p>
            </div>

            <Box className="ButtonWrap">
              <Link href="#" className="Button" onClick={handleSubmit}>
                Submit
              </Link>
            </Box>
            {/* <Button className="Button" 
                title="Submit"
                onClick={handleSubmit}>
              </Button> */}
          </form>
        </StyledCollapsibleRow>
      </Container>
    </BannerArea>
  );
};

export default SupportingDocumentsTab;
