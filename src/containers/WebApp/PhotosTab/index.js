import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import { Button } from "@nextui-org/react";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import {
  deleteBusinessImages,
  getRegisteredBusinessById,
  saveImagesToServer,
} from "common/api/api";
import { Carousel } from "react-responsive-carousel";
import BannerArea, { Col } from "./photostab.style";

const PhotosTab = () => {
  const [mainImageIndex, setMainImageIndex] = useState(null);
  const [selectedMainImage, setSelectedMainImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [fileError, setFileError] = useState("");
  const userData = useSelector((state) => state.user.userData);

  const businessData = useSelector((state) => state.business.businessData);

  const providerId = userData?.provider_id || businessData?.yelpBusiness?.id;
  const token = useSelector((state) => state.auth.authToken);
  const [successMessage, setSuccessMessage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await getRegisteredBusinessById(providerId, token);
        if (response.data) {
          const businessData = response.data.businesses[0];
          if (businessData && businessData.yelpBusiness) {
            const imageProfileMap = businessData.yelpBusiness.image_url || {};
            const imagesArray = Object.values(imageProfileMap);
            setImages(imagesArray);
            const mainImageKey = "Main";
            const mainImageUrl = imageProfileMap[mainImageKey];
            if (mainImageUrl) {
              const mainImageIndex = imagesArray.findIndex(
                (image) => image === mainImageUrl
              );
              if (mainImageIndex !== -1) {
                setMainImageIndex(mainImageIndex);
                setSelectedMainImage(mainImageIndex);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    if (providerId && token) {
      fetchBusinessData();
    }
  }, [providerId, token]);

  const handleAddPhotoClick = () => {
    hiddenFileInput.current.click();
  };

  const fileTypes = [
    "image/*",
    "image/gif",
    "image/png",
    "image/jpeg",
    "image/png",
  ];

  const handleImageUpload = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setSelectedImage(selectedFile);
        setFileError("");
      } else {
        setFileError("Invalid file format. Please select an image file.");
        setSelectedImage(null);
      }
    } else {
      setFileError("No file selected for upload.");
      setSelectedImage(null);
    }
  };

  const handleUploadPhotos = async (e) => {
    if (images.length === 0) {
      setFileError("Please select images to upload.");
      return;
    }

    if (selectedMainImage === null) {
      setFileError("Please select a main profile image.");
      return;
    }

    const mainImage = images[selectedMainImage];
    const mainImageName = mainImage?.name;
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image);
    });
    formData.append("main-image-index", mainImageIndex);
    formData.append("main-image-name", mainImageName);
    formData.append("providerId", providerId);

    try {
      const response = await saveImagesToServer(formData, token);

      if (response.status === 201) {
        setSuccessMessage("All documents are safely secured.");
        setFileError(""); // Clear the error message on successful upload
      } else {
        setFileError("Error occurred during upload: " + response.statusText);
      }
    } catch (error) {
      setFileError("Upload failed: " + error.message);
    }
  };

  const handleMainImageSelect = (index) => {
    if (index !== selectedMainImage) {
      setSelectedMainImage(index);
    }
  };

  const extractFilenameFromUrl = (url) => {
    const pathArray = url.split("/");
    return pathArray[pathArray.length - 1];
  };

  const handleDeleteImage = (selectedFile) => {
    const filename = extractFilenameFromUrl(selectedFile);
    deleteBusinessImages(providerId, filename, token);
    const updatedImages = images.filter((image) => image !== selectedFile);
    setImages(updatedImages);
    if (selectedFile === images[selectedMainImage]) {
      setSelectedMainImage(null);
    }
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} className="image-container">
        <div className="image-label">
          <label>
            <input
              type="radio"
              name="mainImage"
              checked={index === selectedMainImage}
              onChange={() => handleMainImageSelect(index)}
              className="carousel-radio"
            />{" "}
            <span className="radio-label">Make it Profile Image</span>
          </label>
          <button
            className="delete-button"
            onClick={() => handleDeleteImage(image)}
          >
            X
          </button>
        </div>
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt={`Image ${index}`}
          className="carousel-image"
        />
      </div>
    ));
  };

  return (
    <BannerArea id="banner_section">
      <Container className="photo-container">
        {successMessage && <p className="success-message">{successMessage}</p>}
        {fileError && <p className="error-message">{fileError}</p>}
        <Box className="carousel-container">
          <div className="carousel-container">
            <Carousel
              selectedItem={selectedMainImage}
              className="carousel"
              showArrows={false}
              showStatus={true}
              showThumbs={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="carousel-button prev-button"
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      zIndex: 101,
                    }}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="carousel-button next-button"
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      zIndex: 102,
                    }}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                )
              }
            >
              {renderImages()}
            </Carousel>
          </div>
          <p>
            Make sure you name the image "Main" to set it as your profile
            picture.
          </p>
          <Col>
            <Button
              onClick={handleAddPhotoClick}
              component="label"
              aria-label="input"
              className="add-photo-button"
            >
              Add Photo
            </Button>
            <Button onClick={handleUploadPhotos} className="add-photo-button">
              Upload Photos
            </Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={(e) => handleImageUpload(e.target.files)}
              accept="image/*"
              multiple
              style={{ display: "none" }}
            />
          </Col>
        </Box>
      </Container>
    </BannerArea>
  );
};

export default PhotosTab;
