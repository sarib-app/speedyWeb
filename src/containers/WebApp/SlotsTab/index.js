import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import BannerArea from "./slotstab.style.js";
import React, { useState, useEffect } from "react";
import EventOverlay from "../EventOverlay/index.js";
const localizer = momentLocalizer(moment);

import { fetchSettings, fetchSlots, saveSettings } from "common/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import Box from "common/components/Box/index.js";
import Link from "next/link.js";
import Swal from "sweetalert2";
import SlotOverlay from "../SlotOverlay/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecurringSlotOverlay from "../RecurringSlotOverlay/index.js";
import { setBusinessData } from "store/businessSlice.js";

const cityTimezones = [
  { value: "America/New_York", label: "New York" },
  { value: "America/Chicago", label: "Chicago" },
  { value: "America/Denver", label: "Denver" },
  { value: "America/Los_Angeles", label: "Los Angeles" },
  { value: "America/Anchorage", label: "Anchorage" },
  { value: "Pacific/Honolulu", label: "Honolulu" },
  { value: "America/Phoenix", label: "Phoenix" },
  { value: "America/Indiana/Indianapolis", label: "Indiana/Indianapolis" },
  // Add more U.S. city timezones as needed
];

const SlotsTab = ({ onSaveSettings }) => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsErrorMessage, setEventsErrorMessage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSlotModalOpen, setSlotModalOpen] = useState(false);
  const [isRecurringSlotModalOpen, setRecurringSlotModalOpen] = useState(false);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState(null);
  const [currentView, setCurrentView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [earliestStartTime, setEarliestStartTime] = useState("05:00");
  const [latestEndTime, setLatestEndTime] = useState("21:00");
  const [recurringSchedule, setRecurringSchedule] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [slotDuration, setSlotDuration] = useState(60);
  const [timezone, setTimezone] = useState("");
  const dispatch = useDispatch();
  const [serviceCategories, setServiceCategories] = useState([]);

  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsErrorMessage, setSettingsErrorMessage] = useState(null);

  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const businessData = useSelector((state) => state.business.businessData);

  const businessId = userData?.provider_id || businessData?.yelpBusiness?.id;

  const [modalResetKey, setModalResetKey] = useState(0); // Initial reset key
  const [defaultSettingsMessage, setDefaultSettingsMessage] = useState("");

  const savedSettings = businessData?.yelpBusinessSettings;
  const [settings, setSettings] = useState({
    business_id: businessId,
    mondayStartTime: "08:00",
    mondayEndTime: "18:00",
    tuesdayStartTime: "08:00",
    tuesdayEndTime: "18:00",
    wednesdayStartTime: "08:00",
    wednesdayEndTime: "18:00",
    thursdayStartTime: "08:00",
    thursdayEndTime: "18:00",
    fridayStartTime: "08:00",
    fridayEndTime: "18:00",
    saturdayStartTime: "08:00",
    saturdayEndTime: "18:00",
    sundayStartTime: "08:00",
    sundayEndTime: "18:00",
    earliestStartTime: "08:00",
    latestEndTime: "18:00",
    slotDuration: "60",
    cancellationWindow: "240",
    rescheduleWindow: "1440",
    timezone: "America/Chicago",
    recurringSchedule: recurringSchedule,
    allowEmergencyRequest: false, // New field for emergency requests
    emergencyStartTime: "00:00", // New field for emergency start time
    emergencyEndTime: "23:59", // New field for emergency end time
  });

  const getDayAvailability = (start, end) => {
    if (
      (start === "00:00" || start === "00:00:00") &&
      (end === "00:00" || end === "00:00:00")
    ) {
      return false;
    }
    return true;
  };

  const generateTimeLimitsAndAvailability = (settings) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let timeLimits = {};
    let availableDays = {};

    days.forEach((day) => {
      const startKey = `${day.toLowerCase()}StartTime`;
      const endKey = `${day.toLowerCase()}EndTime`;

      timeLimits[day] = {
        start: settings[startKey],
        end: settings[endKey],
      };

      availableDays[day] = getDayAvailability(
        settings[startKey],
        settings[endKey]
      );
    });

    return { timeLimits, availableDays };
  };

  const { timeLimits, availableDays } =
    generateTimeLimitsAndAvailability(settings);

  const [timeLimitsState, setTimeLimits] = useState(timeLimits);
  const [availableDaysState, setAvailableDays] = useState(availableDays);

  const updateSettings = (key, value) => {
    if (key === "slotDuration") {
      setSlotDuration(value);
    }

    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateCalendarSettings = (
    day,
    newStart = null,
    newEnd = null,
    newAvailable = null
  ) => {
    const startKey = `${day.toLowerCase()}StartTime`;
    const endKey = `${day.toLowerCase()}EndTime`;

    setSettings((prev) => ({
      ...prev,
      [startKey]: newStart !== null ? newStart : prev[startKey],
      [endKey]: newEnd !== null ? newEnd : prev[endKey],
    }));

    if (newAvailable !== null) {
      const newStartTime = newAvailable ? "08:00" : "00:00";
      const newEndTime = newAvailable ? "18:00" : "00:00";
      setSettings((prev) => ({
        ...prev,
        [startKey]: newStartTime,
        [endKey]: newEndTime,
      }));
    }
  };

  const updateEvents = () => {
    getEvents();
    setModalOpen(false);
  };

  const submitSettings = async () => {
    try {
      const response = await saveSettings(settings, authToken);
      if (response) {
        setSuccessMessage("Settings are saved successfully");
        setSettingsErrorMessage("");
        const updatedBusinessData = {
          ...businessData,
          yelpBusinessSettings: settings, // Use the settings state instead of response.payload
        };
        dispatch(setBusinessData(updatedBusinessData));
      }
    } catch (error) {
      console.error("Failed to save the settings", error);
      setSuccessMessage("");
      setSettingsErrorMessage(
        "Failed to save the data. Please try again later."
      );
    }
  };

  const transformDataToEvent = (dataItem) => {
    const startDate = moment(
      `${dataItem.date} ${dataItem.startTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ); // If your time format differs, adjust it here.
    const endDate = moment(
      `${dataItem.date} ${dataItem.endTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ); // If your time format differs, adjust it here.

    let title = "Open";
    let eventColor = "#007bff"; // Blue for open slots

    // Handle blocked state first
    if (dataItem.blocked) {
      title = "Blocked";
      eventColor = "#343a40"; // Bootstrap's dark gray, assuming blocked slots should be very distinct
    }
    // Then handle final states like cancelled and no show
    else if (dataItem.cancelled) {
      title = "Cancelled";
      eventColor = "#dc3545"; // Red
    } else if (dataItem.noshow) {
      title = "No Show";
      eventColor = "#6f42c1"; // Purple
    }
    // Then confirmed state
    else if (dataItem.confirmed) {
      title = "Confirmed";
      eventColor = "#28a745"; // Green
    }
    // Then booked state, considering it might also be rescheduled
    else if (dataItem.booked) {
      if (dataItem.rescheduled) {
        title = "Booked & Rescheduled";
        eventColor = "#fd7e14"; // A shade of orange different from booked to indicate rescheduling
      } else {
        title = "Booked";
        eventColor = "#ff851b"; // Orange
      }
    }
    // Handle open, which might also be rescheduled
    else if (dataItem.open) {
      if (dataItem.rescheduled) {
        title = "Open & Rescheduled";
        eventColor = "#17a2b8"; // Light blue to indicate rescheduled but still open
      } else {
        title = "Open";
        eventColor = "#007bff"; // Blue
      }
    }
    // Additional check for only rescheduled (if it can exist without 'open' or 'booked')
    else if (dataItem.rescheduled) {
      title = "Rescheduled";
      eventColor = "#f0ad4e"; // Bootstrap's "warning" color, a different kind of orange/yellow
    }

    // Example colors are chosen for clear visibility and differentiation.
    // Adjust hex codes to fit your application's design palette.

    return {
      start: startDate.toDate(),
      end: endDate.toDate(),
      date: moment(dataItem.date, "YYYY-MM-DD").toDate(),
      key: dataItem.key,
      booked: dataItem.booked,
      confirmed: dataItem.confirmed,
      cancelled: dataItem.cancelled,
      noshow: dataItem.noshow,
      serviceTypes: dataItem.serviceTypes,
      selectedServiceTypes: dataItem.selectedServiceTypes,
      username: dataItem.username,
      business_id: dataItem.business_id,
      title: title,
      color: eventColor,
    };
  };
  const getEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await fetchSlots(businessId, authToken);

      if (response && response.data && response.data.length >= 0) {
        const eventsFromData = response.data.map(transformDataToEvent);

        setEvents([...eventsFromData]);
      } else {
        setEventsErrorMessage(
          "You don't have any open events for your customers."
        );
      }
    } catch (error) {
      console.error("Failed to fetch deals", error);
      setEventsErrorMessage("Failed to fetch events. Please try again later.");
    } finally {
      setEventsLoading(false);
    }
  };

  const getSettings = async () => {
    setSettingsLoading(true);
    try {
      const response = await fetchSettings(businessId, authToken);
      "Settings", response;
      if (response && response.success) {
        setSettings((prev) => ({
          ...prev,
          ...response.payload,
          allowEmergencyRequest: response.payload.allowEmergencyRequest,
          emergencyStartTime: response.payload.emergencyStartTime,
          emergencyEndTime: response.payload.emergencyEndTime,
        }));
        const settingsToSave = {
          ...businessData,
          yelpBusinessSettings: response.payload,
        };
        dispatch(setBusinessData(settingsToSave));
      } else {
        toast.info(
          "Please note: The application is using default settings. Customize and hit 'Save Settings' to retain changes.",
          {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "my-toast-class",
          }
        );
      }
    } catch (error) {
      console.error("Failed to fetch the settings", error);
      setSettingsErrorMessage(
        "Failed to fetch the data. Please try again later."
      );
    } finally {
      setSettingsLoading(false);
    }
  };

  useEffect(() => {
    const { timeLimits, availableDays } =
      generateTimeLimitsAndAvailability(settings);
    setTimeLimits(timeLimits);
    setAvailableDays(availableDays);
  }, [settings]);

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    getSettings();
    getEvents();
  }, []);

  const formats = {
    eventTimeRangeFormat: () => {
      return "";
    },
  };
  const handleEventSelection = (slotInfo) => {
    if (!savedSettings || Object.keys(savedSettings).length === 0) {
      // Prevent the default action
      toast.info(
        "Event interaction is disabled until settings are configured.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      const { start } = slotInfo;
      const dayName = moment(start).format("dddd");

      // Convert the string times to date objects for the selected day.
      const dayStart = moment(
        `${moment(start).format("YYYY-MM-DD")} ${timeLimits[dayName].start}`
      );
      const dayEnd = moment(
        `${moment(start).format("YYYY-MM-DD")} ${timeLimits[dayName].end}`
      );

      // Check if the selected slot is outside the available times or on an unavailable day.
      if (
        !availableDays[dayName] ||
        moment(start).isBefore(dayStart) ||
        moment(start).isAfter(dayEnd)
      ) {
        // Use sweetAlert2 to show a beautiful alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This slot is outside of the available window!",
          customClass: {
            content: "custom-swal-content",
            confirmButton: "custom-swal-confirm-button",
          },
          confirmButtonText: "Close",
          showCloseButton: true, // Ensure the close button is shown
          onOpen: (el) => {
            const btn = el.querySelector(".swal2-confirm");
            if (btn) {
              btn.style.backgroundColor = "#f9ab55";
              btn.style.color = "#fff";
              btn.style.fontFamily = '"DM Sans", sans-serif';
            }
          },
        });
        return; // Exit the function early since the slot is not valid.
      }
      const eventInSlot = events.find(
        (event) =>
          moment(event.start).isSame(slotInfo.start) &&
          moment(event.end).isSame(slotInfo.end)
      );

      setSelectedEvent({
        start: slotInfo.start,
        end: slotInfo.end,
        date: moment(slotInfo.date, "YYYY-MM-DD").toDate(),
        key: slotInfo.key,
        booked: slotInfo.booked,
        confirmed: slotInfo.confirmed,
        cancelled: slotInfo.cancelled,
        noshow: slotInfo.noshow,
        selectedServiceTypes: slotInfo.selectedServiceTypes,
        serviceTypes: slotInfo.serviceTypes,
        username: slotInfo.username,
        business_id: slotInfo.business_id,
        title: slotInfo.title,
        color: slotInfo.color,
      });
      setModalOpen(true);
    }
  };

  const handleSlotSelection = (slotInfo) => {
    if (!savedSettings || Object.keys(savedSettings).length === 0) {
      // Prevent the default action
      toast.info("Slots selection is disabled until settings are configured.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { start } = slotInfo;
      const dayName = moment(start).format("dddd");

      // Convert the string times to date objects for the selected day.
      const dayStart = moment(
        `${moment(start).format("YYYY-MM-DD")} ${timeLimits[dayName].start}`
      );
      const dayEnd = moment(
        `${moment(start).format("YYYY-MM-DD")} ${timeLimits[dayName].end}`
      );

      // Check if the selected slot is outside the available times or on an unavailable day.
      if (
        !availableDays[dayName] ||
        moment(start).isBefore(dayStart) ||
        moment(start).isAfter(dayEnd)
      ) {
        // Use sweetAlert2 to show a beautiful alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This slot is outside of the available window!",
          customClass: {
            content: "custom-swal-content",
            confirmButton: "custom-swal-confirm-button",
          },
          confirmButtonText: "Close",
          showCloseButton: true, // Ensure the close button is shown
          onOpen: (el) => {
            const btn = el.querySelector(".swal2-confirm");
            if (btn) {
              btn.style.backgroundColor = "#f9ab55";
              btn.style.color = "#fff";
              btn.style.fontFamily = '"DM Sans", sans-serif';
            }
          },
        });
        return; // Exit the function early since the slot is not valid.
      }
      const eventInSlot = events.find(
        (event) =>
          moment(event.start).isSame(slotInfo.start) &&
          moment(event.end).isSame(slotInfo.end)
      );

      setSelectedEvent({
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setSlotModalOpen(true);
    }
  };

  const handleReccuringSlotSelection = () => {
    setRecurringSlotModalOpen(true);
  };

  const saveEvent = () => {
    setEvents([...events, selectedEvent]);

    // Close the modal
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSlotDetails(null);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const validateTimeLimits = (dayStart, dayEnd) => {
    if (
      moment(dayStart, "HH:mm").isBefore(moment(earliestStartTime, "HH:mm")) ||
      moment(dayEnd, "HH:mm").isAfter(moment(latestEndTime, "HH:mm"))
    ) {
      return false;
    }
    return true;
  };

  return (
    <BannerArea>
      <ToastContainer />
      <div className="calendar-container">
        <div className="settings-panel">
          {successMessage && <p className="errorColor">{successMessage}</p>}
          {errorMessage && <p className="errorColor">{errorMessage}</p>}
          {settingsErrorMessage && (
            <p className="errorColor">{settingsErrorMessage}</p>
          )}
          <div>
            <h3>Settings</h3>
            <div>
              <div>
                <label>Select Timezone:</label>
                <select
                  value={settings.timezone || ""}
                  onChange={(e) => updateSettings("timezone", e.target.value)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#084887",
                  }}
                >
                  {cityTimezones.map((timeZone) => (
                    <option key={timeZone.value} value={timeZone.value}>
                      {timeZone.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label>Slot Duration (mins):</label>
              <input
                type="number"
                value={settings.slotDuration || ""}
                onChange={(e) => updateSettings("slotDuration", e.target.value)}
              />
            </div>
            <div>
              <label>Cancellation Window (mins):</label>
              <input
                type="number"
                value={settings.cancellationWindow || ""}
                onChange={(e) =>
                  updateSettings("cancellationWindow", e.target.value)
                }
              />
            </div>
            <div>
              <label>Reschedule Window (mins):</label>
              <input
                type="number"
                value={settings.rescheduleWindow || ""}
                onChange={(e) =>
                  updateSettings("rescheduleWindow", e.target.value)
                }
              />
            </div>
            <div>
              <label>Earliest Start Time:</label>
              <input
                type="time"
                value={settings.earliestStartTime || ""}
                onChange={(e) =>
                  updateSettings("earliestStartTime", e.target.value)
                }
              />
            </div>
            <div>
              <label>Latest End Time:</label>
              <input
                type="time"
                value={settings.latestEndTime || ""}
                onChange={(e) =>
                  updateSettings("latestEndTime", e.target.value)
                }
              />
            </div>
            <div className="checkbox-wrapper-emergency">
              <input
                type="checkbox"
                id="customCheckboxEmergency"
                checked={settings.allowEmergencyRequest || false}
                onChange={(e) =>
                  updateSettings("allowEmergencyRequest", e.target.checked)
                }
              />
              <label htmlFor="customCheckboxEmergency"></label>
              <span>Allow Emergency Calls</span>
            </div>

            <div>
              <label>Emergency Start Time:</label>
              <input
                type="time"
                value={settings.emergencyStartTime || ""}
                onChange={(e) =>
                  updateSettings("emergencyStartTime", e.target.value)
                }
                disabled={!settings.allowEmergencyRequest}
              />
            </div>
            <div>
              <label>Emergency End Time:</label>
              <input
                type="time"
                value={settings.emergencyEndTime || ""}
                onChange={(e) =>
                  updateSettings("emergencyEndTime", e.target.value)
                }
                disabled={!settings.allowEmergencyRequest}
              />
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="customCheckbox"
                checked={settings.recurringSchedule || false}
                onChange={(e) =>
                  updateSettings("recurringSchedule", e.target.checked)
                }
              />
              <label htmlFor="customCheckbox"></label>
              <span>Copy Slots to Next Week</span>
            </div>

            {/* Deals Section */}
            <div>
              <div className="settingSaveButton">
                <Box
                  className="ButtonWrap"
                  style={{ justifyContent: "center" }}
                >
                  <Link
                    href="#"
                    className="Button slot-Button"
                    onClick={submitSettings}
                  >
                    Save Settings
                  </Link>
                </Box>
              </div>
            </div>

            <div>
              <div className="settingSaveButton">
                <Box
                  className="ButtonWrap"
                  style={{ justifyContent: "center" }}
                >
                  <Link
                    href="#"
                    className={`Button slot-Button ${
                      !savedSettings || Object.keys(savedSettings).length === 0
                        ? "disabledButton"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (
                        savedSettings &&
                        Object.keys(savedSettings).length > 0
                      ) {
                        handleReccuringSlotSelection(e);
                      } else {
                        e.preventDefault();
                        // Optionally show a message to the user why the button is disabled
                        toast.info(
                          "Recurring Scheduler is disabled until settings are configured.",
                          {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                      }
                    }}
                  >
                    Slot Scheduler
                  </Link>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="calendar-section">
          <div className="day-time-settings">
            {Object.keys(availableDaysState).map((day) => (
              <div key={day}>
                <label>
                  <input
                    type="checkbox"
                    checked={availableDaysState[day]}
                    style={{ marginRight: "5px" }}
                    onChange={() => {
                      setAvailableDays((prev) => ({
                        ...prev,
                        [day]: !prev[day],
                      }));
                      updateCalendarSettings(
                        day,
                        null,
                        null,
                        !availableDaysState[day]
                      );
                    }}
                  />
                  {day}
                </label>
                <div className="time-wrapper">
                  <input
                    type="time"
                    value={timeLimitsState[day].start}
                    onChange={(e) => {
                      const newStart = e.target.value;
                      if (
                        validateTimeLimits(newStart, timeLimitsState[day].end)
                      ) {
                        setTimeLimits((prev) => ({
                          ...prev,
                          [day]: { ...prev[day], start: newStart },
                        }));
                        updateCalendarSettings(day, newStart);
                        setErrorMessage(null);
                      } else {
                        setErrorMessage("You cannot select this start time.");
                      }
                    }}
                  />
                </div>
                <div className="time-wrapper">
                  <input
                    type="time"
                    value={timeLimitsState[day].end}
                    onChange={(e) => {
                      const newEnd = e.target.value;
                      if (
                        validateTimeLimits(timeLimitsState[day].start, newEnd)
                      ) {
                        setTimeLimits((prev) => ({
                          ...prev,
                          [day]: { ...prev[day], end: newEnd },
                        }));
                        updateCalendarSettings(day, null, newEnd);
                        setErrorMessage(null);
                      } else {
                        setErrorMessage("You cannot select this end time.");
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="calendar-wrapper"></div>
          <Calendar
            formats={formats}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSlotSelection}
            onSelectEvent={handleEventSelection}
            defaultView="week"
            views={["week", "day"]}
            toolbar={true}
            onView={handleViewChange}
            selectable
            timeslots={1}
            step={parseInt(settings.slotDuration || "60", 10)}
            min={moment(settings.earliestStartTime, "HH:mm").toDate()}
            max={moment(settings.latestEndTime, "HH:mm").toDate()}
            slotPropGetter={(date) => {
              const dayName = moment(date).format("dddd");

              if (!availableDays[dayName]) {
                return {
                  style: { backgroundColor: "#ADAEB3", pointerEvents: "none" },
                };
              }

              const dayStart = moment(
                `${moment(date).format("YYYY-MM-DD")} ${
                  timeLimits[dayName].start
                }`
              );
              const dayEnd = moment(
                `${moment(date).format("YYYY-MM-DD")} ${
                  timeLimits[dayName].end
                }`
              );

              if (
                moment(date).isBefore(dayStart) ||
                moment(date).isAfter(dayEnd)
              ) {
                return {
                  style: { backgroundColor: "#ADAEB3", pointerEvents: "none" },
                };
              }
            }}
            eventPropGetter={(event, start, end, isSelected) => {
              return {
                style: {
                  backgroundColor: event.color,
                  display: "flex", // Making event a flex container
                  alignItems: "center", // Vertically center the content
                  justifyContent: "center", // Horizontally center the content
                  fontWeight: "bold", // Make the content bold
                  width: "100%", // Ensure it covers the entire slot width
                  height: "100%", // Ensure it covers the entire slot height
                  border: "none", // Remove any borders
                },
              };
            }}
          />
        </div>
      </div>
      <EventOverlay
        isOpen={isModalOpen}
        closeModal={closeModal}
        businessCategories={businessData?.yelpBusinessCategory}
        selectedEvent={selectedEvent}
        saveEvent={saveEvent}
        updateEvents={updateEvents}
        token={authToken}
        resetKey={modalResetKey} // Pass the key here
      />
      <SlotOverlay
        isOpen={isSlotModalOpen}
        closeModal={() => setSlotModalOpen(false)}
        businessCategories={businessData?.yelpBusinessCategory}
        selectedEvent={selectedEvent}
        saveEvent={saveEvent}
        updateEvents={updateEvents}
        serviceCategories={serviceCategories}
        businessId={businessId}
        token={authToken}
        resetKey={modalResetKey} // Pass the key here
      />
      <RecurringSlotOverlay
        isOpen={isRecurringSlotModalOpen}
        closeModal={() => setRecurringSlotModalOpen(false)}
        businessCategories={businessData?.yelpBusinessCategory}
        saveEvent={saveEvent}
        updateEvents={updateEvents}
        serviceCategories={serviceCategories}
        businessId={businessId}
        token={authToken}
        resetKey={modalResetKey} // Pass the key here
      />
    </BannerArea>
  );
};
export default SlotsTab;
