import themeGet from "@styled-system/theme-get";
import BannerBg from "common/assets/image/webApp/banner-bg.png";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
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

  .section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .section-image {
    align-items: center;
    width: 40%;
    height: 30%;
    border-radius: 20px;
    /* Adjust as needed */
  }

  .section-text {
    width: 45%;
    /* Adjust as needed */
  }

  .section-reverse {
    display: flex;
    justify-content: space-between;
  }

  /* Add further styling as needed */

  .Container {
    display: block;
    width: 100%;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 20px;
    @media (max-width: 568px) {
      padding: 20px 10px;
    }
  }
  h1 {
    font-size: 62px;
    margin-bottom: 20px;
    color: #084887;
    border-bottom: 2px solid #e0e0e0;
    margin-bottom: 20px;
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
  .reusecore__switch {
    margin-left: 10px;
    margin-right: 10px;
    input[type="checkbox"] + div {
      width: 66px;
      height: calc(66px / 2);
      background-color: #f9ab55;
      border-color: rgba(255, 255, 255, 0.5);
      > div {
        width: calc(66px / 2 - 8px);
        height: calc(66px / 2 - 8px);
      }
    }
    input[type="checkbox"].switch:checked + div {
      width: 66px;
      background-color: #f9ab55;
      border-color: rgba(255, 255, 255, 1);
    }
    input[type="checkbox"].switch:checked + div > div {
      left: calc(66px / 2 + 3px);
    }
  }
  .priceFilter {
    margin-bottom: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 575px) {
      margin-bottom: 40px;
    }
    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 1;
      text-align: center;
      color: #084887;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Small devices (phones) */
  @media (max-width: 767px) {
    padding-top: 150px;
    padding-bottom: 50px;
    padding-right: 10px;
    padding-left: 10px;
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 22px;
    }
    p {
      font-size: 16px;
    }
  }

  /* Medium devices (tablets) */
  @media (min-width: 768px) and (max-width: 991px) {
    padding-top: 180px;
    padding-bottom: 250px;
    padding-right: 20px;
    padding-left: 20px;
    h1 {
      font-size: 50px;
    }
    h2 {
      font-size: 24px;
    }
  }

  /* Large devices (desktops/laptops) */
  @media (min-width: 992px) and (max-width: 1199px) {
    /* Adjust styles if necessary */
  }

  /* Extra large devices (large desktops) */
  @media (min-width: 1200px) {
    /* Adjust styles if necessary */
  }
`;
const PageLayout = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  background: unset;
  margin-top: 10px;
  background: unset;
  margin-top: 10px;
  @media (max-width: 767px) {
    flex-flow: column;
  }
  .account-h3 {
    width: 23%;
    @media (max-width: 1024px) {
      width: 75%;
    }
  }
  .button-holder {
    display: flex;
    gap: 10px;
    @media (max-width: 568px) {
      flex-flow: column;
      justify-content: center;
    }
  }
`;
const Col = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const MainContent = styled.main`
  padding: 20px 0px 0px 20px;
  background: var(--whiteColor);
  flex-grow: 1;
  @media (max-width: 568px) {
    padding: 20px 0px 0px 0px;
  }
`;

const Sidebar = styled.aside`
  width: 223px;
  min-width: 223px;
  background: var(--panelbgColor);
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px 0px;
  bottom: 0;
  ul {
    margin-left: 0px;
    margin-right: 0px;
  }
  @media (max-width: 568px) {
    width: 100%;
    padding: 0px 20px 0px 130px;
    overflow-x: scroll;

    ul {
      display: flex;
      flex-flow: row;
      justify-content: center;
      padding: 0px;
      column-gap: 10px;
    }
  }

  li {
    justify-content: space-between;
    padding: 12px 10px;
    display: flex;
    align-items: center;
    color: var(--whiteColor);
    cursor: pointer;
    margin-bottom: 0px;
    font-size: 1.1em;
  }
  li:hover {
    background-color: var(--buttonOverColor);
  }
  .active {
    background-color: var(--buttonOverColor);
  }
`;

const PlanBox = styled.div`
  display: flex;
  flex-grow: 1;
  background: #f9ab55;
  padding: 20px 0px;
  border-radius: 10px;
`;

const Section = styled.section`
  background: #f9ab55;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 0px;
  @media (max-width: 568px) {
    padding: 20px 10px;
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
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
  background-color: var(--buttonbgColor);
  border: 1px solid var(--buttonbgColor);
  transition: all 500ms ease;
  cursor: pointer;
  &:hover {
    background-color: var(--buttonOverColor);
    border: 1px solid var(--buttonOverColor);
    color: var(--textColor);
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
    width: auto;
  }
  // padding: 10px 20px;
  // border-radius: 5px;
  // border: none;
  // background-color: #e07a5f;
  // color: white;
  // cursor: pointer;
`;
const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0px;
`;

const PlanCard = styled.div`
  border-radius: 8px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: var(--whiteColor);
`;

const PlanTitle = styled.h2`
  font-size: 24px;
  color: #333;
`;

const PlanPrice = styled.p`
  font-size: 18px !important;
  color: var(--textColor) !important;
  font-weight: 600 !important;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 20px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 5px;
  color: var(--textColor);
  list-style-type: disclosure-closed;
`;

const PlanButton = styled(Button)`
  margin-top: 20px;
`;
const PriceCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 3px 4px rgba(100, 135, 167, 0.08);
  @media (max-width: 575px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  h3 {
    font-weight: bold;
    font-size: 40px;
    text-transform: capitalize;
    color: #084887;
    margin-bottom: 0;
    line-height: 1;
    margin-top: -10px;
  }
  h4 {
    font-weight: 500;
    font-size: 30px;
    letter-spacing: -0.55px;
    line-height: 1;
    margin-bottom: 0;
    color: #084887;
  }
  .priceBtn {
    width: 100%;
    color: #084887;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    min-height: 60px;
    margin-top: 50px;
    transition: all 500ms ease;
    i {
      margin-left: 10px;
      transition: transform 500ms ease;
    }
    &:hover {
      color: #fff;
      &:before {
        opacity: 0;
      }
      span {
        i {
          transform: translateX(5px);
        }
      }
    }
    span {
      z-index: 1;
    }
    position: relative;
    z-index: 1;
    &:after,
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      transition: opacity 0.4s ease;
    }
    &:before {
      background-image: linear-gradient(
        173.72deg,
        ${themeGet("colors.gradientPrimary")} -338.12%,
        ${themeGet("colors.gradientSecondary")} 190.2%
      );
    }
    &:after {
      background-image: linear-gradient(
        135.72deg,
        ${themeGet("colors.gradientSecondary")} 0%,
        ${themeGet("colors.gradientPrimary")} 130.2%
      );
      z-index: -1;
    }
  }
  .priceList {
    li {
      color: #084887;
      font-size: 16px;
      line-height: 1.75;
      position: relative;
      animation: fadeIn 0.8s linear;
      padding-left: 35px;
      + li {
        margin-top: 10px;
      }
      i {
        position: absolute;
        left: 0;
        top: 0;
        color: #3fdbb1;
      }
    }
  }
  &.recommended {
    background-image: linear-gradient(
      145.76deg,
      ${themeGet("colors.gradientPrimary")} -94.95%,
      ${themeGet("colors.gradientSecondary")} 132.3%
    );
    @media (max-width: 667px) {
      margin-top: 30px;
    }
    h3,
    h4,
    p,
    span.pricingLabel {
      color: #084887;
    }
    ul li,
    ul li i {
      color: #084887;
    }
    .priceBtn {
      color: #084887;
      &:before {
        background-image: none;
        background-color: #fff;
      }
      &:after {
        display: none;
      }
      &:hover {
        &:before {
          opacity: 1;
        }
        color: #f9ab55;
      }
    }
  }
`;
export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn2 0.8s linear;
  padding-top: 50px;
  margin-bottom: 70px;
`;
export const CardBody = styled.div`
  > span.pricingLabel {
    display: block;
    font-weight: bold;
    font-size: 16px;
    line-height: 1;
    color: #084887;
    margin-bottom: 30px;
    animation: fadeIn2 0.8s linear;
  }
`;
export const CardFooter = styled.div`
  animation: fadeIn2 0.8s linear;
  padding-bottom: 50px;
`;
export const PricingAmount = styled.div`
  text-align: right;
  p {
    margin-top: 5px;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.5px;
    color: #084887;
    line-height: 1;
  }
`;

const logoSize = {
  width: 50, // Set the width as required
  height: 50, // Set the height as required
};

const OrderHistorySection = styled(Section)`
  /* Add your styles for Order History section here */
  padding: 0px 0px 20px;
  overflow-x: auto;
`;

const OrderTable = styled.div`
  display: table;
  width: 100%;
  margin-top: 20px;
`;

const OrderRow = styled.div`
  display: table-row;
  background: #fff;
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const OrderCell = styled.div`
  display: table-cell;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const StatusIndicator = styled(Icon)`
  /* Add your styles for status indicator here */
`;

const OrderTableHeader = styled.div`
  display: table-row;
  background: #ddd; // You can change the background color as needed
  font-weight: bold; // Make the text bold
`;

const OrderHeaderCell = styled.div`
  display: table-cell;
  padding: 10px;
  text-align: left;
`;

export {
  BannerArea,
  PageLayout,
  Row,
  Col,
  MainContent,
  Sidebar,
  PlanBox,
  Section,
  FormField,
  Label,
  Input,
  Button,
  PlansContainer,
  PlanCard,
  PlanTitle,
  PlanPrice,
  FeaturesList,
  FeatureItem,
  PlanButton,
  PriceCard,
  OrderCell,
  OrderHeaderCell,
  OrderHistorySection,
  OrderRow,
  OrderTable,
  OrderTableHeader,
  StatusIndicator,
  logoSize,
};
