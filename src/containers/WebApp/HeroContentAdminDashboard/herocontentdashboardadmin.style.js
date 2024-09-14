import styled from "styled-components";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

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

  .search-container {
    margin-bottom: 20px;
  }

  .table-container {
    overflow-x: auto;
  }

  .business-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .business-table th,
  .business-table td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 10px;
  }

  .business-table th {
    background-color: #084887;
    color: #ffffff;
    font-weight: bold;
  }

  .business-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .edit-button {
    background-color: #084887;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0a5ca8;
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  width: 100%;

  .react-tabs__tab-list {
    display: flex;
    width: 100%;
    min-width: 340px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    @media (max-width: 767px) {
      min-width: 340px;
      overflow-x: scroll;
    }
  }

  .react-tabs__tab {
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: var(--buttonbgColor);
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
    display: none;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 0px;
    border: 1px solid #ddd;
    background-color: #fff;

    &--selected {
      display: block;
    }
  }
`;

export default BannerArea;
