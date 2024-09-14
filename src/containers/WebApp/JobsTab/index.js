import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faBookReader,
  faFolder,
  faEnvelope,
  faCheckCircle,
  faTimesCircle,
  faUser,
  faMinusCircle,
  faPlusCircle,
  faAlignLeft,
  faPhone,
  faFlag,
  faRedo,
  faImage,
  faVideo,
  faClock,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import StyledCollapsibleRow, { BannerArea, StyledRow } from "./jobstab.style";
import Modal from "react-modal";
import Image from "next/image";
import Input from "common/components/Input";
import {
  fetchSlots,
  fetchUserProfiles,
  confirmSlot,
  fetchCategoryByCategoryId,
  rejectSlot,
} from "common/api/api";
import Container from "common/components/UI/Container";
import ProfileOverlay from "containers/WebApp/ProfileOverlay";
import RejectJobModal from "containers/WebApp/RejectJobModal"; // Import the new RejectJobModal component

const JobsTab = ({ onChatClick, setJobsData }) => {
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const businessId = userData.provider_id;
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [sectionsToRender, setSectionsToRender] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [amountDueError, setAmountDueError] = useState("");
  const priorityMapping = {
    0: "Routine",
    1: "Flexible",
    2: "Urgent",
    3: "Emergency",
  };
  const videoThumbnail = require("common/assets/image/webApp/video.png");

  const closeImage = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  const openImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const openVideo = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  const getVideoThumbnail = (videoUrl) => {
    const videoId = videoUrl.split("/").pop();
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  const handleProfileClick = async (slot, event) => {
    event.stopPropagation();
    const userId = slot.user_id;

    try {
      const response = await fetchUserProfiles(userId, authToken);

      if (response.success && response.payload) {
        setSelectedUserProfile(response.payload);
        const profilesToRender = Array.from(slot.profilesAttached);
        setSectionsToRender(profilesToRender);
        setIsModalOpen(true);
      } else {
        console.error("Failed to fetch user profile data", response);
      }
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  const handleAcceptJob = async (slot, event) => {
    event.stopPropagation();

    const updatedSlot = data.find(
      (item) => item.key.slotId === slot.key.slotId
    );

    if (!updatedSlot.amountDue) {
      setAmountDueError("Amount Due is required.");
      return;
    }

    updatedSlot.accepted = true;

    try {
      const response = await confirmSlot(updatedSlot, authToken);

      if (response.success) {
        const updatedData = data.map((item) =>
          item.key.slotId === slot.key.slotId
            ? { ...item, accepted: true, booked: false } // Update both accepted and booked status
            : item
        );
        setData(updatedData);

        // Update the grouped slots
        const newGroupedSlots = groupSlotsByStatus();
        setResultData(
          newGroupedSlots.Accepted.map((slot) => (
            <CollapsibleRow key={slot.key.slotId} slot={slot} />
          ))
        );

        setSuccessMessage("Job accepted successfully.");
      } else {
        console.error("Failed to accept job", response);
        setSuccessMessage("Failed to accept job. Please try again.");
      }
    } catch (error) {
      console.error("Error accepting job:", error);
      setSuccessMessage(
        "An error occurred while accepting the job. Please try again."
      );
    }
  };

  const handleRejectJob = async () => {
    if (rejectionReason.length < 200) {
      setRejectionError(
        "Rejection reason must be at least 200 characters long."
      );
      return;
    }

    const slot = selectedSlot;
    slot.rejected = true;
    slot.rejection_reason = rejectionReason;

    try {
      const response = await rejectSlot(slot, authToken);

      if (response.success) {
        const updatedData = data.map((item) =>
          item.key.slotId === slot.key.slotId
            ? { ...item, rejected: true, rejection_reason: rejectionReason }
            : item
        );
        setData(updatedData);
        setSuccessMessage("Job rejected successfully.");
        setIsRejectModalOpen(false);
      } else {
        console.error("Failed to reject job", response);
      }
    } catch (error) {
      console.error("Error rejecting job:", error);
    }
  };

  const openRejectModal = (slot, event) => {
    event.stopPropagation();
    setSelectedSlot(slot);
    setRejectionReason("");
    setRejectionError("");
    setSuccessMessage("");
    setIsRejectModalOpen(true);
  };

  const handleChatClick = (slot, event) => {
    event.stopPropagation();
    onChatClick(slot);
  };

  const handleAmountDueChange = (slotId, e) => {
    const value = e; // Use the provided value directly

    const updatedData = data.map((item) => {
      if (item.key?.slotId === slotId) {
        item.amountDue = value; // Update the amountDue directly on the matched item
        return item;
      }
      return item;
    });

    setData([...updatedData]); // Ensure state is updated with a new array reference
    setAmountDueError("");
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSlots(businessId, authToken);

        if (response && Array.isArray(response.data)) {
          const sortedData = response.data
            .sort((a, b) => {
              const dateTimeA = new Date(`${a.date}T${a.startTime}`);
              const dateTimeB = new Date(`${b.date}T${b.startTime}`);
              return dateTimeB - dateTimeA;
            })
            .map((slot) => ({
              ...slot,
              amountDue: slot.amountDue || "", // Initialize amountDue if not present
            }));
          setData(sortedData);
          setLoading(false);
        } else {
          console.error(
            "Received data is not in the expected format",
            response
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading slots data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [businessId, authToken]);

  const groupSlotsByStatus = () => {
    const groupedSlots = {
      Past: [],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    data.forEach((slot) => {
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);

      const status = getCategoryStatus(slot);

      if (slotDate < today && status !== "Open") {
        groupedSlots.Past.push(slot);
      } else {
        if (!groupedSlots[status]) {
          groupedSlots[status] = [];
        }
        groupedSlots[status].push(slot);
      }
    });

    // Remove the "Open" category if it exists
    delete groupedSlots["Open"];

    return groupedSlots;
  };

  const getCategoryStatus = (slot) => {
    if (slot.rejected === true) {
      return "Rejected";
    } else if (slot.completed === true) {
      return "Completed";
    } else if (slot.noshow === true) {
      return "No Show";
    } else if (slot.cancelled === true) {
      return "Cancelled";
    } else if (slot.rescheduled === true) {
      return "Rescheduled";
    } else if (slot.booked === true && !slot.confirmed && !slot.accepted) {
      return "Booked";
    } else if (slot.accepted === true && !slot.confirmed) {
      return "Accepted";
    } else if (slot.confirmed === true) {
      return "Confirmed";
    } else {
      return "Open";
    }
  };

  const handleCategoryContent = (slots) => {
    const resultCategory = slots.map((slot) => (
      <CollapsibleRow key={slot.key.slotId} slot={slot} />
    ));
    setResultData(resultCategory);
    setJobsData(resultCategory);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const utcOffset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const localDate = new Date(date.getTime() + utcOffset); // Apply the offset to get the correct local date

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return localDate.toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(`1970-01-01T${timeString}`).toLocaleString(
      undefined,
      options
    );
  };

  const CategoryRow = ({ category, categoryIndex, slots }) => {
    return (
      <StyledRow onClick={() => handleCategoryContent(slots)}>
        <div className="row-header">
          {category.toLowerCase() === "past" ? (
            <FontAwesomeIcon
              icon={faHistory}
              style={{
                width: "15",
                flexGrow: 0,
                marginRight: 8,
                filter: "drop-shadow(2px 4px 5px black)",
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faFolder}
              style={{
                width: "15",
                flexGrow: 0,
                marginRight: 8,
                filter: "drop-shadow(2px 4px 5px black)",
              }}
            />
          )}
          <div className="category-name">
            <span className="category-content">{category}</span>
            <span className="count-style">{slots.length}</span>
          </div>
        </div>
      </StyledRow>
    );
  };

  const CollapsibleRow = ({ slot }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [categoryData, setCategoryData] = useState(null);

    const handleToggle = async () => {
      setIsExpanded((prevState) => !prevState);
      if (!isExpanded && !categoryData) {
        try {
          const response = await fetchCategoryByCategoryId(
            slot.categoryId,
            authToken
          );
          if (response.success) {
            setCategoryData(response.payload[0]);
          }
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }
    };

    return (
      <StyledCollapsibleRow>
        <div className="row-header" onClick={handleToggle}>
          <span className="title-text">
            <FontAwesomeIcon
              icon={faTag}
              style={{ width: "15", flexGrow: 0, marginRight: 5 }}
            />{" "}
            {slot.selectedServiceTypes
              ? Array.from(slot.selectedServiceTypes).join(", ")
              : "No Service Types"}
          </span>
          <span className="date-time">
            <span className="date">{formatDate(slot.date)}</span>
            <span className="time">
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </span>
          </span>
          <FontAwesomeIcon
            icon={isExpanded ? faMinusCircle : faPlusCircle}
            style={{ marginLeft: "auto", color: "#333", fontSize: "24px" }}
          />
        </div>
        {isExpanded && (
          <div className="row-details">
            <div className="detail-row-container">
              <div className="detail-row half-width">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faUser} className="detail-icon" />
                  <span className="detail-label-text">Client Name:</span>
                </span>
                <span className="detail-value">{slot.username}</span>
              </div>
              <div className="detail-row half-width">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                  <span className="detail-label-text">Client Contact:</span>
                </span>
                <span className="detail-value">
                  {formatPhoneNumber(slot.user_phone)}
                </span>
              </div>
            </div>
            <div className="detail-row-container">
              <div className="detail-row half-width">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faFlag} className="detail-icon" />
                  <span className="detail-label-text">Priority:</span>
                </span>
                <span className="detail-value">
                  {priorityMapping[slot.priorityStatus] || "N/A"}
                </span>
              </div>
              <div className="detail-row half-width">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faRedo} className="detail-icon" />
                  <span className="detail-label-text">Status:</span>
                </span>
                <span className="detail-value">{getCategoryStatus(slot)}</span>
              </div>
            </div>

            <div className="detail-row full-width">
              <span className="detail-label">
                <FontAwesomeIcon icon={faAlignLeft} className="detail-icon" />
                <span className="detail-label-text">Job Details:</span>
              </span>
              <span className="detail-value">{slot.job_description}</span>
            </div>

            {categoryData && (
              <>
                <div className="detail-row-container">
                  <div className="detail-row half-width">
                    <span className="detail-label">
                      <FontAwesomeIcon
                        icon={faFolder}
                        className="detail-icon"
                      />
                      <span className="detail-label-text">Categories:</span>
                    </span>
                    <span className="detail-value">
                      {categoryData.categories.join(", ")}
                    </span>
                  </div>
                  <div className="detail-row half-width">
                    <span className="detail-label">
                      <FontAwesomeIcon
                        icon={faFolder}
                        className="detail-icon"
                      />
                      <span className="detail-label-text">Subcategories:</span>
                    </span>
                    <span className="detail-value">
                      {categoryData.subcategories.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="detail-row-container">
                  <div className="detail-row half-width">
                    <span className="detail-label">
                      <FontAwesomeIcon icon={faTag} className="detail-icon" />
                      <span className="detail-label-text">Service Types:</span>
                    </span>
                    <span className="detail-value">
                      {categoryData.serviceTypes.join(", ")}
                    </span>
                  </div>
                  <div className="detail-row half-width">
                    <span className="detail-label">
                      <FontAwesomeIcon icon={faRedo} className="detail-icon" />
                      <span className="detail-label-text">
                        Onsite Estimate:
                      </span>
                    </span>
                    <span className="detail-value">
                      {categoryData.onsiteEstimate ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="detail-row-container">
                  <div className="detail-row half-width">
                    <span className="detail-label">
                      <FontAwesomeIcon icon={faRedo} className="detail-icon" />
                      <span className="detail-label-text">Waived Hired:</span>
                    </span>
                    <span className="detail-value">
                      {categoryData.waivedHired ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="detail-row half-width">
                    <span className="detail-label">
                      <FontAwesomeIcon icon={faTag} className="detail-icon" />
                      <span className="detail-label-text">Price Range:</span>
                    </span>
                    <span className="detail-value">
                      ${categoryData.min_price} - ${categoryData.max_price}
                    </span>
                  </div>
                </div>
                <div className="detail-row half-width">
                  <span className="detail-label">
                    <FontAwesomeIcon icon={faClock} className="detail-icon" />
                    <span className="detail-label-text">Duration:</span>
                  </span>
                  <span className="detail-value">
                    {categoryData.duration} minutes
                  </span>
                </div>
                <div className="detail-row full-width">
                  <span className="detail-label">
                    <FontAwesomeIcon
                      icon={faAlignLeft}
                      className="detail-icon"
                    />
                    <span className="detail-label-text">Disclaimer:</span>
                  </span>
                  <span className="detail-value">
                    {categoryData.disclaimer}
                  </span>
                </div>
                <div className="detail-row full-width">
                  <span className="detail-label">
                    <FontAwesomeIcon
                      icon={faAlignLeft}
                      className="detail-icon"
                    />
                    <span className="detail-label-text">Details:</span>
                  </span>
                  <span className="detail-value">{categoryData.details}</span>
                </div>
              </>
            )}
            {slot.rejected && (
              <div className="detail-row full-width">
                <span className="detail-label">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="detail-icon"
                  />
                  <span className="detail-label-text">Rejection:</span>
                </span>
                <span className="detail-value">{slot.rejection_reason}</span>
              </div>
            )}
            <div className="detail-row full-width">
              <span className="detail-label">
                <FontAwesomeIcon icon={faImage} className="detail-icon" />
                <span className="detail-label-text">Job Images:</span>
              </span>
              <div className="detail-value">
                {slot?.imagesAttached?.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="thumbnail"
                    onClick={() => openImage(imageUrl)}
                  />
                ))}
              </div>
            </div>
            <div className="detail-row full-width">
              <span className="detail-label">
                <FontAwesomeIcon icon={faVideo} className="detail-icon" />
                <span className="detail-label-text">Job Videos:</span>
              </span>
              <div className="detail-value">
                {slot?.videosAttached?.map((videoUrl, index) => (
                  <Image
                    key={index}
                    src={videoThumbnail}
                    alt={`Video ${index + 1}`}
                    className="thumbnail"
                    onClick={() => openVideo(videoUrl)}
                    width={540}
                    height={540}
                  />
                ))}
              </div>
            </div>
            <div className="detail-row-container">
              <div className="detail-row half-width">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faTag} className="detail-icon" />
                  <span className="detail-label-text">Amount Due:</span>
                </span>
                {getCategoryStatus(slot) === "Booked" ||
                (getCategoryStatus(slot) === "Rescheduled" &&
                  !slot.confirmed &&
                  !slot.accepted &&
                  !slot.rejected &&
                  !slot.completed &&
                  !slot.cancelled) ? (
                  <Input
                    name="amountDue"
                    value={slot.amountDue || ""}
                    onChange={(e) => handleAmountDueChange(slot.key.slotId, e)}
                    required={true}
                    ariaLabel="Amount Due input"
                    className="amount-due-input"
                  />
                ) : (
                  <span className="detail-value">{slot.amountDue}</span>
                )}
              </div>
              {amountDueError && (
                <div className="error-message">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="error-icon"
                  />
                  <span className="error-text">{amountDueError}</span>
                </div>
              )}

              <div className="info-message" style={{ color: "#333" }}>
                Note: Once you accept the job, you are required to service it.
                Failing to do so will negatively impact your profile.
              </div>
            </div>
            {!slot.rejected && (
              <div className="action-buttons">
                {(getCategoryStatus(slot) === "Booked" ||
                  getCategoryStatus(slot) === "Rescheduled") && (
                  <button
                    className="accept-job-btn"
                    onClick={(event) => handleAcceptJob(slot, event)}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{ width: 20, marginRight: 5 }}
                    />{" "}
                    Accept Job
                  </button>
                )}
                {!["Confirmed", "Completed", "Cancelled", "Rejected"].includes(
                  getCategoryStatus(slot)
                ) && (
                  <button
                    className="reject-job-btn"
                    onClick={(event) => openRejectModal(slot, event)}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ width: 20, marginRight: 5 }}
                    />{" "}
                    Reject Job
                  </button>
                )}
                <button
                  className="chat-btn"
                  onClick={(event) => handleProfileClick(slot, event)}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ width: 20, marginRight: 5 }}
                  />{" "}
                  Profile
                </button>
                <button
                  className="chat-btn"
                  onClick={(event) => handleChatClick(slot, event)}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ width: 20, marginRight: 5 }}
                  />{" "}
                  Chat
                </button>
              </div>
            )}
          </div>
        )}
        <Modal
          isOpen={isImageModalOpen}
          onRequestClose={closeImage}
          contentLabel="Image Modal"
          className="modal"
        >
          <div className="modal-content">
            <img src={selectedImage} alt="Full-size" className="modal-image" />
            <span className="modal-close" onClick={closeImage}>
              &times;
            </span>
          </div>
        </Modal>
        <Modal
          isOpen={isVideoModalOpen}
          onRequestClose={closeVideo}
          contentLabel="Video Modal"
          className="modal"
        >
          <div className="modal-content">
            <video controls className="modal-video">
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span className="modal-close" onClick={closeVideo}>
              &times;
            </span>
          </div>
        </Modal>
      </StyledCollapsibleRow>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const groupedSlots = groupSlotsByStatus();

  return (
    <BannerArea>
      <Container className="jobs-side-container">
        {Object.keys(groupedSlots).map((category, index) => (
          <CategoryRow
            key={category}
            categoryIndex={index}
            category={category}
            slots={groupedSlots[category]}
          />
        ))}
      </Container>
      <Container className="jobs-container">{resultData}</Container>
      <ProfileOverlay
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profiles={selectedUserProfile}
        sectionsToRender={sectionsToRender}
        slot={selectedSlot} // Ensure the selected slot is passed here
      />
      <RejectJobModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onReject={handleRejectJob}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        rejectionError={rejectionError}
        setRejectionError={setRejectionError} // Pass setRejectionError
        successMessage={successMessage}
      />
    </BannerArea>
  );
};

export default JobsTab;
