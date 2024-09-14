import styled from "styled-components";
import themeGet from "@styled-system/theme-get";

const BannerArea = styled.section`
  padding-top: 12em;
  padding-bottom: 5em;
  position: relative;
  font-family: "DM Sans", sans-serif;
  background-color: #f9ab55;
  color: #084887;
  @media (max-width: 1600px) {
    padding-top: 10em;
    padding-bottom: 3em;
  }
  @media (max-width: 1200px) {
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
    background: linear-gradient(
      131.39deg,
      ${themeGet("colors.gradientSecondary")} -9.09%,
      ${themeGet("colors.gradientPrimary")} 129.67%
    );
  }
  .Container {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    background-color: #fefdfb;
    border-radius: 15px;
    padding: 20px;
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    @media (max-width: 1200px) {
      width: 95%;
      margin-left: 20px;
      margin-right: 10px;
    }
    @media (max-width: 574px) {
      width: 93%;
      margin-left: 15px;
      margin-right: 10px;
      padding: 10px;
    }
  }
  .chartContainer {
    display: flex;
    padding: 10px 5px 10px 5px;
    column-gap: 15px;
    margin-right: 5px;
    @media (max-width: 1200px) {
      margin-right: 20px;
    }
    @media (max-width: 574px) {
      padding-bottom: 0px;
    }
    @media (max-width: 900px) {
      flex-flow: column;
      padding-right: 0px;
      padding-left: 0px;
      margin-right: 0px;
    }
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
    @media (max-width: 1300px) {
      font-size: 40px;
      max-width: 414px;
    }
    @media (max-width: 768px) {
      font-size: 35px;
      margin-left: 0px;
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
    line-height: 2.11;
    letter-spacing: -0.3px;
    color: var(--whiteColor);
    margin-bottom: 0;
    max-width: 515px;
    opacity: 0.8;
    @media (max-width: 1600px) {
      font-size: 16px;
      max-width: 466px;
    }
    @media (max-width: 1200px) {
      max-width: 400px;
    }
    @media (max-width: 768px) {
      max-width: 440px;
      margin-left: auto;
      text-align: center;
      margin-right: auto;
    }
  }
  .Container > div:first-child {
    padding: 20px;
    box-sizing: border-box;
  }

  .CollapsibleRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden; /* Ensures that inner content doesn't spill over the border */
  }

  .CollapsibleRowIcon {
    cursor: pointer;
  }

  .chart-row {
    display: flex; /* Enables flex layout */
    justify-content: space-between; /* Spaces out the charts evenly */
    margin-bottom: 20px; /* Adds some spacing below each row, can adjust as needed */
    width: 100%;
    @media (max-width: 768px) {
      flex-flow: column;
      .chart-container:last-child {
        margin-top: 20px;
      }
    }
    @media (max-width: 574px) {
      .chart-container:last-child {
        margin-bottom: 0px;
      }
    }
  }

  /* Individual chart container */
  .chart-container {
    flex: 1; /* Each chart takes up equal width */
    margin-left: 10px; /* Add some spacing between charts; can adjust */
    margin-right: 10px;
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    max-height: 350px; /* Adjust this value as per your needs */
    overflow: hidden;

    @media (max-width: 574px) {
      flex-flow: column;
    }
  }

  /* The actual chart styles */
  .chart {
    width: 400px; /* The chart fills its container's width */
    height: 150px; /* Set a fixed height or whatever you prefer */
    max-height: 230px;
  }

  .rightPanel {
    width: 100%;
    // margin-left: 20px;
    border-radius: 15px;
    padding: 15px 5px;
    background-color: #e98e1d;

    @media (max-width: 900px) {
      width: 100%;
      margin-left: 0px;
      margin-top: 20px;
      padding: 15px 5px;
    }
    @media (max-width: 574px) {
      padding: 15px 0px 10px;
    }
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
  }

  .CollapsibleRowIcon {
    margin-left: 10px;
    vertical-align: middle;
  }

  .data {
    padding: 10px 15px;
    display: none; /* Initially hide details */
  }

  .collapsed {
    display: none;
  }

  .expanded {
    display: block;
  }
  .expanded:last-child {
    margin-bottom: 6px;
  }

  .clients-section,
  .appointments-section {
    width: 100%;
    max-width: 350px;
    border-radius: 15px;
    background-color: #084887;
    overflow-x: auto;
    max-height: 330px;
    padding: 15px;
    overflow-y: auto; /* Ensure there's no vertical scroll if not desired */
    @media (min-width: 768px) and (max-width: 900px) {
      max-width: 50%;
    }
    @media (max-width: 574px) {
      max-width: 100%;
      padding: 10px;
    }
  }

  .clients-section {
    margin-top: 0.5em;
    @media (min-width: 575px) and (max-width: 900px) {
      margin-top: 0px;
    }
  }
  h3 {
    font-size: 1.3em;
    color: var(--whiteColor);
    @media (max-width: 1200px) {
      font-size: 1.1em;
    }
  }

  .chartContainer > div:last-child > h3 {
    margin-left: 10px;
    color: var(--whiteColor);
    column-gap: 15px;
  }

  .CollapsibleRow {
    display: flex;
    flex-direction: column;
    width: 100%; /* Take full width of the parent container */
  }

  .row-header,
  .data {
    width: 100%; /* Ensure headers and data sections take up the full width */
  }
`;

export default BannerArea;
