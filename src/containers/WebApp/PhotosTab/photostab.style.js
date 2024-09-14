import styled from "styled-components";

const StyledCollapsibleRow = styled.div`
  width: 100%;
  // cursor: pointer;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }

  .photo-container {
    // display: flex;
    position: relative;
    z-index: 10;
    width: 1300px;
    padding: 2em 20px 0em 20px;
    // border-radius: 20px;
    background-color: var(--whiteColor);
    // filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
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
    @media (max-width: 568px) {
      margin-left: 0px;
      margin-right: 0px;
      padding-left: 10px;
      padding-top: 1em;
      width: calc(100vw - 30px);
      padding-right: 0px;
    }
  }
  .carousel .thumbs-wrapper {
    @media (max-width: 568px){
      margin: 20px 0px;
    }
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: ${(props) => props.backgroundColor};
    transition: background-color 0.3s ease;
  }

  .title-text {
    font-weight: bold;
    color: #333;
    flex-grow: 1;
  }

  .CollapsibleRowIcon {
    margin-left: 10px;
    color: #333;
  }

  .row-details {
    padding: 15px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  p {
    max-width:100%;
    margin-bottom: 0.5em;
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
    max-width: 1300px;
    height: auto;
    width: 100%;
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

  .delete-button {
    border-radius: 10px;
    background-color: var(--buttonbgColor);
    padding:0px 10px;
    border:unset;
    cursor: pointer;
    color: var(--whiteColor);
  }
  .delete-button:hover {
    background-color: var(--buttonOverColor);
    color: var(--textColor);
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

  .image-label {
    position: absolute;
    display:flex;
    gap:10px;
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
`;

export default StyledCollapsibleRow;

export const Col = styled.div`
  display:flex;
  gap:10px;
  @media (max-width: 568px) {
    flex-flow:column;
  }
`;