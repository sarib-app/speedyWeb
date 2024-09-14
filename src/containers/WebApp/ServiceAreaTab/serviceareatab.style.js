import themeGet from "@styled-system/theme-get";
import styled from "styled-components";

export const BannerArea = styled.section`
  padding-top: 0em;
  padding-bottom: 0em;
  position: relative;

  @media (max-width: 1600px) {
    padding-top: 0em;
    padding-bottom: 0em;
  }
  @media (max-width: 1024px) {
    padding-top: 0em;
    padding-bottom: 0em;
    margin-left: 0px;
    background-position: center center;
  }

  @media (min-width: 768px) {
    background-color: #f9ab55;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom left;
  }
  @media (max-width: 767px) {
    padding-top: 0px;
    padding-bottom: 2em;
    background: linear-gradient(
      131.39deg,
      ${themeGet("colors.gradientSecondary")} -9.09%,
      ${themeGet("colors.gradientPrimary")} 129.67%
    );
  }
  @media (max-width: 568px) {
    padding-bottom: 0px;
    width: calc(100vw - 30px);
  }

  .service-container {
    display: flex;
    position: relative;
    z-index: 10;
    width: 1300px;
    padding: 10px 20px 20px;
    background-color: var(--whiteColor);

    @media (max-width: 1024px) {
      width: 100%;
      margin-left: 0px;
      margin-right: 0px;
    }
    @media (max-width: 767px) {
      width: 90%;
      margin-left: 20px;
      margin-right: 10px;
    }
    @media (max-width: 568px) {
      width: 100%;
      padding-left: 10px;
      padding-right: 0px;
      margin-left: 0px;
      margin-right: 0px;
    }
  }
  .formBox {
    padding: 0px 20px 0px;
    border-radius: 20px;
    background-color: var(--whiteColor);
    @media (max-width: 767px) {
      padding: 0px 10px 0px 20px;
    }
  }
  .formIconStyle {
    color: var(--iconColor);
    height: 1.3em;
    margin-top: 7px;
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
    white-space: nowrap; // Prevent wrapping

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
  .note {
    font-weight: bold;
    font-size: 20px;
    color: #084887; /* Blue color */
    margin-bottom: 15px;
    white-space: nowrap; /* Prevent wrapping */
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
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e6e7e8;
    background: url("/assets/images/profilebg.svg") no-repeat;
    flex: 0 0 50%;
    max-width: 50%;
    border-radius: 15px;
    background-size: cover;
    background-position: top left;
    img {
      max-width: 70%;
      width: auto;
      height: auto;
      transform-origin: right center;
    }
    @media (max-width: 1600px) {
      img {
        max-width: 70%;
        width: auto;
        height: auto;
        transform: scale(0.85);
        transform-origin: right center;
      }
    }
    @media (max-width: 1300px) {
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
  .carousel-container {
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .carousel {
    max-width: 100%;
    margin: 0 auto;
  }
  .carousel-checkbox {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  .carousel img {
    max-width: 100%;
    height: auto;
  }
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
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    z-index: 1;
  }
  .carousel-button:hover {
    background-color: rgba(0, 0, 255, 0.7); /* Blue color on hover */
    color: #fff; /* Text color on hover */
  }
  .carousel .slide .control-main {
    border: 2px solid #007bff; /* Blue border */
    border-radius: 8px; /* Rounded border corners */
  }
  .main-image {
    max-width: 100%;
    height: auto;
    border: 2px solid #3498db; /* Blue border */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Box shadow for a subtle effect */
    border-radius: 5px; /* Rounded corners */
  }
  .carousel-image {
    max-width: 100%;
    height: auto;
    border: 2px solid #ddd; /* Light gray border */
    margin: 0 5px; /* Add spacing between images */
    transition: transform 0.3s ease; /* Smooth image transition */
    cursor: pointer; /* Show pointer cursor on hover */
  }
  .carousel-image:hover {
    transform: scale(1.05); /* Increase size on hover */
    border: 2px solid #3498db; /* Blue border on hover */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Box shadow on hover */
    border-radius: 5px; /* Rounded corners on hover */
  }
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
  }
  .image-label {
    position: absolute;
    top: 10px; /* Adjust the top position as needed */
    right: 10px; /* Adjust the right position as needed */
    background-color: rgba(255, 255, 255, 0.7); /* Optional background color */
    padding: 5px 10px; /* Optional padding */
    border-radius: 5px; /* Optional border-radius */
  }
  .carousel-radio {
    margin: 0;
  }
  .radio-label {
    margin: 0;
    font-family: "DM Sans", sans-serif; /* Apply the 'DM Sans' font family */
    color: #084887; /* Make the label blue with color #084887 */
  }
  .image-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .image-text {
    font-size: 14px;
    color: #333; /* Text color */
    cursor: pointer; /* Add a pointer cursor on hover for clickable appearance */
    user-select: none; /* Prevent text selection when clicking */
    margin-bottom: 5px; /* Add some spacing between the text and the image */
  }
  .carousel-image {
    max-width: 100px; /* Adjust the image size as needed */
  }
  .custom-input {
    margin-bottom: 15px; /* Adjust the margin as needed */
    width: 100%;
    padding: 10px; /* Adjust the padding as needed */
    border: 1px solid #ccc; /* Add a border */
    border-radius: 5px; /* Add rounded corners */
    font-size: 16px; /* Adjust the font size as needed */
    color: #333; /* Text color */
    background-color: #fff; /* Background color */
  }
  .badges-container {
    display: flex;
    align-items: center;
  }
  .badges {
    display: flex; /* Display badges in a row */
    align-items: center; /* Vertically center the badges */
    gap: 10px; /* Adjust the gap between badges as needed */
  }
  .badge {
    position: relative; /* Required for tooltip positioning */
    cursor: pointer; /* Change cursor to pointer on hover */
  }
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
  .badges-section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Adjust the gap as needed */
    align-items: center;
    justify-content: flex-start; /* This will align items to the start of the container */
  }
  .badge-container {
    display: flex;
    align-items: center;
    margin: 10px; /* Adjust as needed */
    padding: 10px; /* Adjust as needed */
    border: 1px solid #ccc; /* Example styling */
    border-radius: 5px; /* Example styling */
  }
  .badge-active {
    background-color: #e0ffe0; /* Light green background for active badges */
  }
  .badge-inactive {
    background-color: #ffe0e0; /* Light red background for inactive badges */
    opacity: 0.5; /* Make inactive badges more transparent */
  }
  .badge-icon {
    margin-right: 10px; /* Space between icon and text */
  }
  .badge-info {
    display: flex;
    flex-direction: column;
  }
  .badge-name {
    font-weight: bold;
  }
  .badge-description {
    font-size: 0.8rem; /* Smaller text for the description */
  }
  .badges-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* Align to the start of the container */
    gap: 10px; /* Space between badges */
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

export const StyledCollapsibleRow = styled.div`
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }

  .zipcode-value {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 5px;
  }

  .zipcode-value button {
    padding: 2px 6px;
    font-size: 0.8rem;
    cursor: pointer;
  }
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .zipcode-display {
    margin-top: 20px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      background-color: #f1f1f1;
    }
  }

  .zipcode-value {
    display: inline-flex;
    align-items: center;
    margin: 5px;
    padding: 5px 10px;
    background-color: #e8e8e8;
    border-radius: 15px;
    font-weight: 500;
    color: #333;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d8d8d8;
    }
  }

  .delete-btn {
    width: 24px; /* Increased width for a larger button */
    height: 24px; /* Increased height for a larger button */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    font-size: 1.2rem; /* Larger font size for the icon */
    background-color: #ff6b6b;
    border-radius: 50%;
    padding: 0;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

    &:hover {
      background-color: #ff4b4b;
      transform: scale(1.1); /* Slight increase in size on hover */
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ff6b6b;
    }
  }
`;
