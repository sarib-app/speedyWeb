import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState, useEffect } from "react";
import EventOverlay from "../EventOverlay";
const localizer = momentLocalizer(moment);

function CalendarSection(props) {
  // Destructure props
  const {
    events,
    handleSlotSelection,
    slotDuration,
    earliestStartTime,
    latestEndTime,
    //... other required props
  } = props;

  const [currentView, setCurrentView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [timeLimits, setTimeLimits] = useState({
    Sunday: { start: "08:00", end: "18:00" },
    Monday: { start: "08:00", end: "18:00" },
    Tuesday: { start: "08:00", end: "18:00" },
    Wednesday: { start: "08:00", end: "18:00" },
    Thursday: { start: "08:00", end: "18:00" },
    Friday: { start: "08:00", end: "18:00" },
    Saturday: { start: "08:00", end: "18:00" },
  });

  const [availableDays, setAvailableDays] = useState({
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
  });
  const closeModal = () => {
    setModalOpen(false);
    setSelectedSlotDetails(null);
  };

  const saveEvent = () => {
    // Call backend to save the event
    // For now, we're adding it to the local state
    setEvents([...events, selectedEvent]);

    // Close the modal
    setModalOpen(false);
  };
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="calendar-section">
      <div className="day-time-settings">
        {Object.keys(availableDays).map((day) => (
          <div key={day}>
            <label>
              <input
                type="checkbox"
                checked={availableDays[day]}
                style={{ marginRight: "15px" }}
                onChange={() =>
                  setAvailableDays((prev) => ({
                    ...prev,
                    [day]: !prev[day],
                  }))
                }
              />
              {day}
            </label>
            <div className="time-wrapper">
              <input
                type="time"
                value={timeLimits[day].start}
                onChange={(e) => {
                  const newStart = e.target.value;
                  if (validateTimeLimits(newStart, timeLimits[day].end)) {
                    setTimeLimits((prev) => ({
                      ...prev,
                      [day]: { ...prev[day], start: newStart },
                    }));
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
                value={timeLimits[day].end}
                onChange={(e) => {
                  const newEnd = e.target.value;
                  if (validateTimeLimits(timeLimits[day].start, newEnd)) {
                    setTimeLimits((prev) => ({
                      ...prev,
                      [day]: { ...prev[day], end: newEnd },
                    }));
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
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSlotSelection}
        defaultView="week"
        views={["week"]}
        toolbar={true}
        onView={handleViewChange}
        selectable
        timeslots={1}
        step={parseInt(slotDuration, 10)}
        min={moment(earliestStartTime, "HH:mm").toDate()}
        max={moment(latestEndTime, "HH:mm").toDate()}
        slotPropGetter={(date) => {
          const dayName = moment(date).format("dddd");

          if (!availableDays[dayName]) {
            return {
              style: { backgroundColor: "#ADAEB3", pointerEvents: "none" },
            };
          }

          // Convert the string times to date objects.
          const dayStart = moment(
            `${moment(date).format("YYYY-MM-DD")} ${timeLimits[dayName].start}`
          );
          const dayEnd = moment(
            `${moment(date).format("YYYY-MM-DD")} ${timeLimits[dayName].end}`
          );

          // If the current slot is outside the start and end times, then gray out the slot.
          if (moment(date).isBefore(dayStart) || moment(date).isAfter(dayEnd)) {
            return {
              style: { backgroundColor: "#ADAEB3", pointerEvents: "none" },
            };
          }
        }}
      />
      <EventOverlay
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedEvent={selectedEvent}
        saveEvent={saveEvent}
      />
    </div>
  );
}

export default CalendarSection;
