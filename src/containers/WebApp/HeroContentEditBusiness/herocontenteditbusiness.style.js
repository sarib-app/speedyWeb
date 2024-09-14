import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BannerArea = styled.section`
  padding-top: 2em;
  padding-bottom: 3em;
  background-color: #f9ab55;
  font-family: "DM Sans", sans-serif;

  .tab-Container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1200px;
    padding: 2em 20px;
    border-radius: 20px;
    background-color: var(--whiteColor);
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    margin: 0 auto; /* Center the container */
    @media (max-width: 1024px) {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: 767px) {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      padding-left: 5px;
      padding-right: 10px;
    }
  }

  h2 {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 50px;
    line-height: 1.21;
    letter-spacing: -2px;
    color: var(--titleColor);
    margin-bottom: 20px;
    @media (max-width: 1600px) {
      font-size: 40px;
      max-width: 100%;
    }
    @media (max-width: 768px) {
      font-size: 35px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    @media (max-width: 574px) {
      font-size: 30px;
      max-width: 100%;
      line-height: 40px;
      letter-spacing: normal;
    }
  }

  .fields-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    margin-top: 20px;

    .field-item {
      flex: 0 0 48%; /* Two fields in one row */
      @media (max-width: 768px) {
        flex: 0 0 100%; /* Single field in one row on smaller screens */
      }
    }
  }

  .ButtonWrap {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
  }

  .Button {
    background-color: #084887;
    color: #ffffff;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    &:hover {
      background-color: #0a5ca8;
    }
  }

  .custom-input {
    width: 100%;
    background-color: #fff;
    font-size: 16px;
  }

  .formIconStyle {
    color: var(--iconColor);
    height: 1.3em;
    margin-top: 7px;
  }

  .section-container {
    background-color: #fefdfb;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%; /* Ensure full width for the section */
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #f9ab55;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    color: #084887;
    margin-bottom: 15px;
  }

  .CollapsibleRowIcon {
    font-size: 1.5rem;
    color: #084887;
  }

  .data {
    padding: 10px 0;
  }

  .collapsed {
    display: none;
  }

  .expanded {
    display: block;
  }

  .image-carousel-container {
    margin: 15px 0;
  }

  .carousel-image-container {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .carousel .slide img {
    border-radius: 10px;
    max-height: 300px;
    object-fit: cover;
    width: 100%;
  }

  .legend {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.9rem;
  }

  .document-item {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fefdfb;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);

    h5 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: #084887;
    }

    p {
      font-size: 0.9rem;
      color: #333;
      margin-bottom: 5px;
    }

    .document-link {
      display: inline-flex;
      align-items: center;
      color: #084887;
      font-weight: 500;
      margin-top: 10px;
      text-decoration: none;

      &:hover {
        color: #0a5ca8;
        text-decoration: underline;
      }

      svg {
        margin-left: 5px;
      }
    }
  }

  .update-button {
    margin-top: 15px;
    background-color: #084887;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0a5ca8;
    }
  }

  .back-button {
    display: block;
    width: 100%;
    text-align: center;
    background-color: #084887;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 30px;

    &:hover {
      background-color: #0a5ca8;
    }
  }
`;

export default BannerArea;
