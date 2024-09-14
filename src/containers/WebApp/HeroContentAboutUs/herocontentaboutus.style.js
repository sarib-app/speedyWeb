import themeGet from "@styled-system/theme-get";
import BannerBg from "common/assets/image/webApp/banner-bg.png";
import styled from "styled-components";

const BannerArea = styled.section`
  padding-top: 210px;
  padding-bottom: 100px;
  position: relative;
  background-color: #f9ab55;

  .section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    @media (max-width:767px){
      flex-flow: column;
    }
  }

  .section-image {
    align-items: center;
    width: 90%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.5);
    border: 1px solid #333;
    /* Adjust as needed */
  }

  .section-text {
    width: 100%;
    /* Adjust as needed */
  }

  .section-reverse {
    display: flex;
    justify-content: space-between;
    @media (max-width: 767px){
      flex-flow: column-reverse;
    }
  }

  /* Add further styling as needed */

  .Container {
    display: block;
    width: 100%;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 20px;
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
    font-size: 28px;

    letter-spacing: -2px;
    color: #084887;
    margin-bottom: -20px;
  }
  p {
    font-weight: normal;
    font-size: 18px;

    letter-spacing: -0.3px;
    color: #084887;
    opacity: 0.8;
    margin-bottom: 10px;
  }

  /* Small devices (phones) */
  @media (max-width: 767px) {
    padding-top: 150px;
    padding-bottom: 50px;
    padding-right: 20px;
    padding-left: 20px;
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
export const Col = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  display:flex;
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export default BannerArea;
