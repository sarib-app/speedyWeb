import themeGet from "@styled-system/theme-get";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import styled from "styled-components";
const BannerArea = styled.section`
  padding-top: 12em;
  padding-bottom: 3em;
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

  .Container {
    display: flex;
    position: relative;
    z-index: 10;
    width: 1300px;
    padding: 2em 20px;
    border-radius: 20px;
    background-color: var(--whiteColor);
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    @media (max-width: 1200px) {
      width: 95%;
      margin-left: 20px;
      margin-right: 10px;
    }
    @media (max-width: 767px) {
      width: 95%;
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 5px;
      padding-right: 10px;
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
  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: ${(props) => props.backgroundColor};
    transition: background-color 0.3s ease;
    @media (max-width:568px){
      width: calc(100vw - 30px);
    }
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

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
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

  .jobs-container {
    background-color: #f9ab55;
    margin-left: 20px;
    border-radius:10px;
    padding:10px;
    max-width: 880px;
    width:100vw;
    height: 100vh;
    max-height:350px;
    overflow-y:auto;
    @media (min-width:1700px){
      max-width: 955px;
    }
    @media (max-width:1200px){
      max-width: 955px;
    }
    @media (max-width: 568px) {
      width: calc(100vw - 30px) !important;
    }
  }

  .react-tabs__tab-list {
    display: flex;
    width: 100%;
    min-width:340px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    @media (max-width: 767px) {
      min-width:340px;
      overflow-x:scroll;
    }
  }

  .react-tabs__tab {
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: var(--buttonbgColor);
    // border: 1px solid #ccc;
    margin-right: 2px;
    color: var(--whiteColor);
    margin-bottom: 0px;

    &:first-child {
      border-top-left-radius: 20px;
    }
    &:last-child {
      margin-right: 0;
      border-top-right-radius: 20px;
    }

    &:hover {
      background-color: var(--buttonOverColor);
      color: var(--textColor);
    }

    &--selected {
      background-color: var(--buttonOverColor);
      border-bottom: 2px solid blue;
      color: var(--textColor);
    }
  }

  .react-tabs__tab-panel {
    display: none; // Initially hide all tab panels
    width: 100%; // Ensure full width
    max-width: 100%; // Prevent exceeding the width of the container
    box-sizing: border-box; // Include padding and border in the element's width
    padding: 10px 0px;
    border: 1px solid #ddd;
    background-color: #fff;

    &.react-tabs__tab-panel--selected {
      display: block; // Display the selected tab panel
    }
  }
`;

// const Container = styled.div`
//   width: 100%; // or a fixed width like 800px
//   max-width: 1300px; // optional, set a maximum width
//   margin: 0 auto; // centers the container
//   // ... other styles ...
// `;
