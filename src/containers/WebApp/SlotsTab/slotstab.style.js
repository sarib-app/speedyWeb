import styled from "styled-components";
import themeGet from "@styled-system/theme-get";
const PrimaryColor = "#084887";
const AccentColor = "#f9ab55";
const LightGrey = "#f5f5f5";
const DarkGrey = "#2c3e50";
const LighterGrey = "#bdc3c7";
const White = "#ffffff";

const BannerArea = styled.section`
  box-sizing: border-box;
  font-family: "DM Sans", sans-serif;
  // background-color: ${LightGrey};

  p {
    font-weight: normal;
    font-size: 18px;
    line-height: 1.2;
    // letter-spacing: -0.3px;
    color: var(--whiteColor);
    margin-bottom: 0;
    max-width: 515px;
    opacity: 0.8;
    @media (max-width: 1600px) {
      font-size: 16px;
      max-width: 466px;
    }
    @media (max-width: 1024px) {
      max-width: 400px;
    }
    @media (max-width: 768px) {
      max-width: 440px;
      margin-left: auto;
      text-align: center;
      margin-right: auto;
    }
  }
  .shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .rbc-toolbar {
    background: ${PrimaryColor};
    border-bottom: 1px solid ${DarkGrey};
    padding: 10px 0;
    row-gap: 7px;
    color: var(--whiteColor);
    transition: background 0.3s ease-in-out;
    @media (max-width: 568px) {
      flex-flow: column;
    }
  }

  .rbc-btn-group {
    margin-left: 8px;
    margin-right: 8px;
  }

  .rbc-btn-group button {
    background: ${AccentColor};
    border: none;
    border-radius: 4px;
    margin: 0px;
    padding: 5px 10px;
    color: var(--whiteColor);
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .rbc-btn-group button:hover {
    background-color: ${AccentColor};
    transform: translateY(-3px);
  }

  .rbc-calendar .rbc-row .rbc-header {
    color: var(--textColor) !important;
  }

  .rbc-calendar .rbc-row .rbc-header.rbc-today {
    background-color: ${PrimaryColor};
    color: var(--whiteColor) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .day-checkboxes {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }

  .day-checkboxes > div {
    flex: 0 0 calc(14.28% - 10px);
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-weight: bold;
  }

  .day-checkboxes > div:hover {
    background-color: ${LightGrey};
    transform: translateY(-2px);
  }

  .day-checkboxes input[type="checkbox"] {
    margin-right: 15px; /* Increased margin here */
    border-radius: 4px;
    transition: transform 0.3s ease;
  }
  .rbc-day-slot .rbc-event-content {
    width: 100%;
  }

  div.rbc-event {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  div.rbc-event div.rbc-event-label {
    font-weight: bold !important;
    text-align: center !important;
    margin-right: 10px !important;
  }

  div.rbc-event div.rbc-event-content {
    flex-grow: 1 !important;
    width: 100% !important;
  }
  .time-wrapper {
    display: inline-block;

    overflow: hidden;
    border-radius: 6px;
    input[type="text"] {
      padding-left: 5px;
      width: 80px;
      border: 0.5px solid ${PrimaryColor}; /* Reduced from 1px to 0.5px */
    }
    input[type="time"] {
      width: 100%;
      min-width: 90px;
      max-width: 100px;
      @media (max-width: 568px) {
        min-width: 120px;
        max-width: 140px;
      }
    }
  }

  .day-checkboxes input[type="time"] {
    border: none;
    appearance: none;
    margin: -1px; /* Adjust for the parent border */
  }

  .day-checkboxes input[type="time"]:focus {
    border-color: ${PrimaryColor};
  }
  .errorColor {
    color: var(--whiteColor);
    font-size: 1.1em;
    font-weight: 600;
  }

  .calendar-container {
    display: flex !important;
    flex-direction: row !important;
    max-width: 1285px;
    width: 100vw;
    box-sizing: border-box;
    row-gap: 10px;
    padding-left: 20px;
    column-gap: 15px;
    @media (min-width: 1400px) {
      width: calc(100vw - 367px);
    }
    @media (min-width: 1300px) and (max-width: 1400px) {
      width: calc(100vw - 215px);
    }
    @media (min-width: 1100px) and (max-width: 1300px) {
      width: calc(100vw - 90px);
    }
    @media (max-width: 1024px) {
      width: 95%;
    }
    @media (max-width: 900px) {
      flex-direction: column !important;
      width: calc(100vw - 55px);
      padding-right: 0px;
      padding-left: 20px;
      margin-right: 0px;
    }
    @media (max-width: 767px) {
      width: calc(100vw - 30px);
      padding-left: 10px;
    }
  }

  .settings-panel {
    background-color: #084887;
    border-radius: 15px;
    color: var(--whiteColor);
    flex: 0 0 250px;
    padding: 15px;
    // border-right: 2px solid ${LighterGrey};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    height: 100%;

    > * {
      width: 100%;
      box-sizing: border-box;
    }

    input,
    select,
    textarea {
      margin-bottom: 10px;
      width: 100%;
      padding: 5px;
      color: var(--textColor);
      border: 1px solid ${LighterGrey};
      border-radius: 4px;
      transition: border-color 0.3s ease;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: ${AccentColor};
      outline: none;
    }

    h3 {
      // margin-top: 20px;
      margin-bottom: 0px;
    }

    .checkbox-wrapper {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }

    .checkbox-wrapper-emergency {
      margin-top: 10px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
    }

    input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"] + label {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid var(--whiteColor);
      cursor: pointer;
      margin-right: 10px;
    }

    input[type="checkbox"]:checked + label {
      background-color: var(--whiteColor);
    }

    .events-list {
      max-height: 250px;
      overflow-y: auto;
      border: 1px solid ${LighterGrey};
      border-radius: 4px;
      padding: 5px;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
    }

    .deals-list {
      max-height: 150px;
      overflow-y: auto;
      border: 1px solid ${LighterGrey};
      border-radius: 4px;
      padding: 5px;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
    }

    .settings-panel label {
      margin-top: 10px;
      margin-left: 8px;
    }

    .event {
      padding: 8px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-bottom: 1px solid ${LightGrey};
      transition: background-color 0.3s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: ${LightGrey};
        color: var(--textColor);
      }
    }
  }

  .settings-panel:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .calendar-section {
    height: 925px; /* You can adjust this value based on your requirement */
    overflow-y: auto;
    max-width: 995px;
    width: 100%;
    color: #084887;
    flex-grow: 1 !important;
    // width: calc(100% - 260px);
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${LighterGrey};
    background-color: #e98e1d;
    border-radius: 15px;
    padding: 0 15px 15px;
  }

  .day-time-settings {
    display: flex;
    padding-top: 10px;
    flex-wrap: wrap;
    border-bottom: 1px solid ${LighterGrey};
    label {
      color: var(--whiteColor);
    }
  }

  .day-time-settings > div {
    flex: 1;
    padding: 5px 3px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    &:last-child {
      padding-right: 0px;
    }
  }

  .calendar-wrapper {
    flex-grow: 1;
  }
  .rbc-time-view {
    background-color: var(--whiteColor);
    border-radius: 5px;
  }
  .rbc-label {
    color: var(--textColor) !important;
    font-weight: 500;
  }
  .rbc-button-link {
    color: inherit;
    font-weight: 500;
  }

  .category-label {
    display: flex;
    align-items: center;
  }

  .category-icon {
    color: ${AccentColor};
    margin-left: auto; /* Adjust margin as needed */
    cursor: pointer;
    width: 25px;
    height: 25px;
    // margin-top: 10px;
  }

  .deal-label {
    display: flex;
    align-items: center;
  }

  .deal-icon {
    color: ${AccentColor};
    margin-left: auto; /* Adjust margin as needed */
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
  .slot-Button {
    background-color: var(--whiteColor);
    color: var(--textColor);
  }

  .settingSaveButton {
    position: relative;
    height: auto;
  }

  .custom-swal-close-button {
    color: #084887 !important;
  }

  .custom-swal-close-button:hover,
  .custom-swal-close-button:focus {
    color: #084887 !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .my-toast-class {
    /* your custom styles here */
    background-color: #f9ab55;
    color: #084887;
  }
`;

export default BannerArea;