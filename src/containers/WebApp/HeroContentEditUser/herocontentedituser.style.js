import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BannerArea = styled.section`
  padding-top: 12em;
  padding-bottom: 3em;
  background-color: #f9ab55;
  font-family: "DM Sans", sans-serif;

  .tab-Container {
    display: flex;
    position: relative;
    z-index: 10;
    width: 1000px;
    padding: 2em 20px;
    border-radius: 20px;
    background-color: var(--whiteColor);
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    @media (max-width: 1024px) {
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

  .fields-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .field-item {
      flex: 0 0 48%;
      @media (max-width: 768px) {
        flex: 0 0 100%;
      }
    }
  }

  .labelStyle {
    color: #084887;
    font-weight: 600;
    font-size: 1.1rem;
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
`;

export default BannerArea;
