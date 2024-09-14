import themeGet from "@styled-system/theme-get";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import styled from "styled-components";

const BannerArea = styled.section`
  padding-top: 12em;
  padding-bottom: 5em;
  position: relative;
  background-color: #f9ab55;
  @media (max-width: 1600px) {
    padding-top: 10em;
    padding-bottom: 3em;
  }
  @media (max-width: 1024px) {
    padding-top: 10em;
    padding-bottom: 3em;
    background-position: center center;
  }
  @media (max-width: 768px) {
    padding-top: 150px;
    padding-bottom: 3em;
  }
  @media (min-width: 768px) {
    background-color: #f9ab55;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom left;
  }
  @media (max-width: 767px) {
    padding-bottom: 2em;
    background: linear-gradient(
      131.39deg,
      ${themeGet("colors.gradientSecondary")} -9.09%,
      ${themeGet("colors.gradientPrimary")} 129.67%
    );
  }

  .tab-Container {
    display: flex;
    position: relative;
    z-index: 10;
    width: 1300px;
    padding: 2em 20px 2em 0em;
    border-radius: 20px;
    background-color: var(--whiteColor);
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    @media (max-width: 1024px) {
      width: 95%;
      margin-left: 20px;
      margin-right: 10px;
    }
    @media (max-width: 767px) {
      width: 90%;
      margin-left: 20px;
      margin-right: 10px;
    }
  }

  .tabh2 {
    margin-left: 20px;
  }
  h2 {
    font-weight: 500;
    font-size: 50px;
    line-height: 1.21;
    letter-spacing: -2px;
    color: var(--titleColor);
    margin-bottom: 10px;
    @media (max-width: 1600px) {
      font-size: 40px;
      max-width: 414px;
    }
    @media (max-width: 768px) {
      font-size: 35px;
      margin-left: 0;
      margin-right: auto;
      text-align: left;
      max-width: 421px;
    }
    @media (max-width: 574px) {
      font-size: 30px;
      max-width: 100%;
      line-height: 40px;
      letter-spacing: normal;
    }
  }
  p {
    font-weight: normal;
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: var(--titleColor);
    margin-bottom: 0;
    margin-top: 0;
    max-width: 515px;
    width: 100%;
    opacity: 1;
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

  .profileButton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100% !important;
  }
  .ButtonWrap {
    display: flex;
    margin-top: 35px;
    align-items: center;
    @media (max-width: 1600px) {
      margin-top: 20px;
    }
    @media (max-width: 768px) {
      justify-content: center;
    }
    @media (max-width: 575px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    span {
      font-weight: 500;
      font-size: 15px;
      color: #084887;
      opacity: 0.6;
      line-height: 1;
      margin-bottom: 0;
      margin-left: 25px;
      @media (max-width: 1600px) {
        font-size: 14px;
      }
      @media (max-width: 768px) {
        margin-left: 15px;
      }
      @media (max-width: 575px) {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }
  .HeroSection {
    margin-bottom: 20px;
  }
  .twoFields {
    display: flex;
    flex-direction: row; /* Use flex-direction to specify the row layout */
    width: 100%;
    justify-content: space-between; /* Space between badge and reviews */
    align-items: center; /* Center vertically */
    gap: 2%;
    @media (max-width: 1600px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 50.5%;
    }
    @media (max-width: 574px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    line-height: 1;
    color: var(--whiteColor);
    padding: 21px 29px;
    background-color: #084887;
    border: 1px solid var(--buttonbgColor);
    transition: all 500ms ease;
    &:hover {
      background-color: var(--buttonOverColor);
      color: #23374d;
      i {
        transform: translateX(2px);
      }
    }
    i {
      margin-left: 10px;
      position: relative;
      top: 1px;
      transition: transform 0.4s ease;
    }
    @media (max-width: 1600px) {
      font-size: 14px;
      padding: 16px 23px;
    }
    @media (max-width: 575px) {
      width: 100%;
    }
  }
  .bannerImage {
    // position: absolute;
    // top: 10px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e6e7e8;
    background: url("/assets/images/profilebg.svg") no-repeat;
    flex: 0 0 50%;
    max-width: 50%;
    border-radius: 15px;
    // background: url("/assets/images/login-bg.svg") no-repeat;
    background-size: cover;

    background-position: top left;
    img {
      max-width: 70%;
      width: auto;
      // border-radius:20px;
      height: auto;
      transform-origin: right center;
    }
    @media (max-width: 1600px) {
      // top: 50px;
      img {
        max-width: 70%;
        width: auto;
        height: auto;
        transform: scale(0.85);
        transform-origin: right center;
      }
    }
    @media (max-width: 1300px) {
      // top: 100px;
      max-width: 60%;
    }
    @media (max-width: 1024px) {
      top: 0;
      max-width: 100%;
      img {
        transform: scale(1);
        transform-origin: right center;
      }
    }
    @media (max-width: 768px) {
      max-width: 100%;
      position: relative;
      top: auto;
      right: auto;
      margin-top: 40px;
      display: none;
      img {
        transform: scale(1);
        transform-origin: center center;
      }
    }
  }
  .input {
    margin-bottom: 15px; /* Adjust this value to what suits you best */
    width: 100%;
  }
  .profileImageContainer {
    width: 100%; /* Set to 100% to match the width of the textbox */
    height: 200px; /* Adjust the height to your liking for a rectangular appearance */
    overflow: hidden;
    margin-bottom: 20px;
  }
  .profileImageContainer img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .labelStyle {
    color: #084887;
    font-weight: 600;
    font-size: 1.1rem;
  }
  /* Add styles for the Carousel component */
  .carousel-container {
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  /* Add styles for the Carousel component */
  .carousel {
    max-width: 100%;
    margin: 0 auto;
  }

  /* Add styles for the main image selection checkbox */
  .carousel-checkbox {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }

  /* Constrain the image size within the container */
  .carousel img {
    max-width: 100%;
    height: auto;
  }
  /* carousel.css */
  /* Style the previous and next buttons as arrows */
  .carousel-button {
    background: transparent;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    font-size: 24px; /* Adjust the arrow size as needed */
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    z-index: 1;
  }

  .carousel-button:hover {
    background-color: rgba(0, 0, 255, 0.7); /* Blue color on hover */
    color: #fff; /* Text color on hover */
  }

  /* Add a blue border around the main image */
  .carousel .slide .control-main {
    border: 2px solid #007bff; /* Blue border */
    border-radius: 8px; /* Rounded border corners */
  }
  /* Add this CSS to your stylesheet or component's CSS-in-JS */

  /* Style for the main image */
  .main-image {
    max-width: 100%;
    height: auto;
    border: 2px solid #3498db; /* Blue border */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Box shadow for a subtle effect */
    border-radius: 5px; /* Rounded corners */
  }

  /* Style for the carousel images */
  .carousel-image {
    max-width: 100%;
    height: auto;
    border: 2px solid #ddd; /* Light gray border */
    margin: 0 5px; /* Add spacing between images */
    transition: transform 0.3s ease; /* Smooth image transition */
    cursor: pointer; /* Show pointer cursor on hover */
  }

  /* Add hover effect to carousel images */
  .carousel-image:hover {
    transform: scale(1.05); /* Increase size on hover */
    border: 2px solid #3498db; /* Blue border on hover */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Box shadow on hover */
    border-radius: 5px; /* Rounded corners on hover */
  }

  /* HeroContentProfile.css */

  /* Style for the radio buttons and labels */
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
  }

  .image-label-container {
    position: absolute;
    top: 10px; /* Adjust the top position as needed */
    left: 10px; /* Adjust the right position as needed */
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 20px);
  }
  .image-label {
    background-color: rgba(255, 255, 255, 0.7); /* Optional background color */
    padding: 5px 10px; /* Optional padding */
    border-radius: 5px; /* Optional border-radius */
  }

  .carousel-radio {
    margin: 0;
  }
  .carousel-slider {
    max-height: 550px !important;
  }

  .radio-label {
    margin: 0;
    font-family: "DM Sans", sans-serif; /* Apply the 'DM Sans' font family */
    color: #084887; /* Make the label blue with color #084887 */
  }

  /* Style for the image content container */
  .image-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Style for the label text */
  .image-text {
    font-size: 14px;
    color: #333; /* Text color */
    cursor: pointer; /* Add a pointer cursor on hover for clickable appearance */
    user-select: none; /* Prevent text selection when clicking */
    margin-bottom: 5px; /* Add some spacing between the text and the image */
  }

  /* Style for the images */
  .carousel-image {
    max-width: 100px; /* Adjust the image size as needed */
  }
  /* Add this to your CSS file */
  .custom-input {
    margin-bottom: 15px; /* Adjust the margin as needed */
    width: 100%;
    padding: 10px 0px; /* Adjust the padding as needed */
    // border: 1px solid #ccc; /* Add a border */
    border-radius: 5px; /* Add rounded corners */
    font-size: 16px; /* Adjust the font size as needed */
    color: #333; /* Text color */
    background-color: #fff; /* Background color */
    /* Add any other styles you want here */
  }
  /* Add this CSS to your component's stylesheet or CSS-in-JS */

  /* Add this CSS to your component's stylesheet or CSS-in-JS */

  /* Add this CSS to your component's stylesheet or CSS-in-JS */

  /* Update the CSS for the badges container */
  .badges-container {
    display: flex;
    align-items: center;
  }

  /* Update the CSS for the badges container */
  .badges {
    display: flex; /* Display badges in a row */
    align-items: center; /* Vertically center the badges */
    gap: 10px; /* Adjust the gap between badges as needed */
  }

  .badge {
    position: relative; /* Required for tooltip positioning */
    cursor: pointer; /* Change cursor to pointer on hover */
  }

  /* Tooltip styles */
  .badge::before {
    content: attr(title); /* Use the title attribute as the tooltip text */
    visibility: hidden;
    opacity: 0;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: 100%; /* Position above the badge */
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.2s;
  }

  .badge:hover::before {
    visibility: visible;
    opacity: 1;
  }

  .reviews-container {
    font-size: 16px;
    color: red; /* Change the color of reviews to red */
  }

  .stars {
    display: flex;
    align-items: center;
  }

  .star {
    font-size: 20px;
    margin-right: 2px; /* Add some spacing between stars */
  }

  .star-empty::before {
    content: "☆"; /* Unicode character for an empty star */
  }

  .star-half-filled::before {
    content: "☆"; /* Unicode character for an empty star */
    position: relative;
    display: inline-block;
    width: 1em; /* Adjust the width to control the fill level */
    overflow: hidden;
  }

  .star-half-filled::before::after {
    content: "★"; /* Unicode character for a filled star */
    position: absolute;
    left: 0;
    top: 0;
    color: red; /* Change the color of filled stars to red */
    width: 50%; /* Adjust the width to control the fill level */
  }

  .star-filled {
    color: red; /* Change the color of filled stars to red */
  }

  /* CSS styles for badges and reviews labels */
  .badges-label,
  .reviews-label {
    font-family: "DM Sans", sans-serif; /* Apply the 'DM Sans' font family */
    color: #084887; /* Make the label blue with color #084887 */
    font-size: 17px; /* Example font size */
  }
  .review-count {
    font-size: 12px; /* Example font size for the count */
    margin-left: 4px; /* Add some space between rating and count */
  }
  /* You can customize the styling further if needed */

  /* Style disabled tabs */
  .react-tabs__tab--disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

export default BannerArea;

export const Col = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const StyledTabs = styled(Tabs)`
  width: 100%;

  .react-tabs__tab-list {
    display: flex;
    list-style-type: none;
    margin: 0 20px;
    padding: 0;
  }

  .react-tabs__tab {
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: var(--buttonbgColor);
    color: var(--whiteColor);
    border: 1px solid #ccc;
    margin-right: 0px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      // background-color: #ddd;
      background-color: var(--buttonOverColor);
    }

    &--selected {
      // background-color: #fff;
      background-color: var(--buttonOverColor);
      color: var(--textColor);
      font-weight: 700;
      border-bottom: 2px solid blue;
    }

    &--disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }
  }

  .react-tabs__tab-panel {
    display: none; // Initially hide all tab panels
    width: 100%; // Ensure full width
    max-width: 100%; // Prevent exceeding the width of the container
    box-sizing: border-box; // Include padding and border in the element's width
    // padding: 5px;
    // border: 1px solid #ddd;
    background-color: #fff;

    &.react-tabs__tab-panel--selected {
      display: block; // Display the selected tab panel
    }
  }
`;

const Container = styled.div`
  width: 100%; // or a fixed width like 800px
  max-width: 1300px; // optional, set a maximum width
  margin: 0 auto; // centers the container
  // ... other styles ...
`;
