import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import BannerArea from "./dealstab.style.js";
import React, { useState, useEffect } from "react";
import { faGift, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DealOverlay from "../DealOverlay/index.js";
import NewDealOverlay from "../NewDealOverlay/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchDeals, updateBusinessDeals } from "common/api/api.js";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { setBusinessData } from "store/businessSlice";

const DealsTab = () => {
  const [deals, setDeals] = useState([]); // State for deals
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isDealOverlayOpen, setDealOverlayOpen] = useState(false);
  const [isNewDealOverlayOpen, setNewDealOverlayOpen] = useState(false);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [dealsErrorMessage, setDealsErrorMessage] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const businessData = useSelector((state) => state.business.businessData);
  const businessId = userData?.provider_id || businessData?.yelpBusiness?.id;
  const dispatch = useDispatch();
  const [modalResetKey, setModalResetKey] = useState(0); // Initial reset key

  const updateDeals = async () => {
    await getDeals(); // Ensure it waits for the deals to be fetched
    setDealOverlayOpen(false);
    setNewDealOverlayOpen(false);
  };

  const getDeals = async () => {
    setDealsLoading(true);
    try {
      const response = await fetchDeals(businessId, authToken);
      if (response.success && response.payload) {
        setDeals(response.payload);

        // Update yelpBusinessDeal in businessData
        const updatedBusinessData = {
          ...businessData,
          yelpBusinessDeal: response.payload,
        };
        dispatch(setBusinessData(updatedBusinessData));
      } else {
        setDealsErrorMessage(
          "You don't have any deals. Please add exciting deals to enhance your business!"
        );
      }
    } catch (error) {
      console.error("Failed to fetch deals", error);
      setDealsErrorMessage("Failed to fetch deals. Please try again later.");
    } finally {
      setDealsLoading(false);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  const openNewDealOverlay = () => {
    setNewDealOverlayOpen(true);
    setModalResetKey((prevKey) => prevKey + 1); // Reset the modal state
  };

  return (
    <BannerArea>
      <Container className="deal-container">
        <div className="deal-label">
          <Heading as="h2" content="Deal" />
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="deal-icon"
            onClick={openNewDealOverlay}
          />
        </div>
        <div className="deal-table">
          <div className="deal-table-header">
            <div className="deal-header-cell">Deal</div>
            <div className="deal-header-cell">Title</div>
            <div className="deal-header-cell">Description</div>
            <div className="deal-header-cell">Coupon Code</div>
            <div className="deal-header-cell">Start Date</div>
            <div className="deal-header-cell">End Date</div>
            <div className="deal-header-cell">Start Time</div>
            <div className="deal-header-cell">End Time</div>
          </div>
          <div className="deal-list">
            {dealsLoading ? (
              <label>Loading deals...</label>
            ) : dealsErrorMessage ? (
              <label>{dealsErrorMessage}</label>
            ) : deals.length > 0 ? (
              deals.map((deal) => (
                <div
                  key={deal.deal_id}
                  className="deal-row"
                  onClick={() => {
                    setSelectedDeal(deal);
                    setDealOverlayOpen(true);
                  }}
                >
                  <div className="deal-cell">
                    <FontAwesomeIcon icon={faGift} />
                  </div>
                  <div className="deal-cell">{deal.title}</div>
                  <div className="deal-cell">{deal.description}</div>
                  <div className="deal-cell">{deal.couponCode}</div>
                  <div className="deal-cell">{deal.startDate}</div>
                  <div className="deal-cell">{deal.endDate}</div>
                  <div className="deal-cell">{deal.startTime}</div>
                  <div className="deal-cell">{deal.endTime}</div>
                </div>
              ))
            ) : (
              <label>No deals available. Please add some!</label>
            )}
          </div>
        </div>
        <DealOverlay
          isOpen={isDealOverlayOpen}
          closeModal={() => setDealOverlayOpen(false)}
          selectedDeal={selectedDeal}
          updateDeals={updateDeals}
          businessId={businessId}
          token={authToken}
          resetKey={modalResetKey} // Pass the key here
        />
        <NewDealOverlay
          isOpen={isNewDealOverlayOpen}
          closeModal={() => setNewDealOverlayOpen(false)}
          updateDeals={updateDeals}
          businessId={businessId}
          token={authToken}
          resetKey={modalResetKey} // Pass the key here
        />
      </Container>
    </BannerArea>
  );
};

export default DealsTab;
