import themeGet from "@styled-system/theme-get";
import BannerBg from "common/assets/image/webApp/banner-bg.png";
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
  background: linear-gradient(131.39deg, ${themeGet('colors.gradientSecondary')} -9.09%, ${themeGet('colors.gradientPrimary')} 129.67%);
}

  .Container {
    display: flex;
    position: relative;
    z-index: 10;
    width:1300px;
    padding:0px;
    border-radius: 20px;
    background-color: var(--whiteColor);
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    @media (max-width:1200px) {
      width:95%;
      margin-left:20px;
      margin-right: 10px;
    }
    @media (max-width:767px) {
      width:90%;
      margin-left:20px;
      margin-right: 10px;
    }
  }
  .formBox {
    // border-radius: 10px;
    padding: 40px;
    border-radius:20px;
    min-height:570px;
    background-color: var(--whiteColor);
    @media (max-width:767px) {
      padding: 40px 10px 40px 20px;
    }
  }
  .errorColor {
    color: var(--errorColor);
    font-size:1.1em;
    font-weight:600;
  }
  .formIconStyle {
    color: var(--iconColor);
    height:1.3em; 
    marginTop: 7px;
  }

  h2 {
    font-weight: 500;
    font-size: 50px;
    line-height: 1.21;
    letter-spacing: -2px;
    color: var(--titleColor);
    margin-bottom: 20px;
    text-align: left;
    @media (max-width: 1600px) {
      font-size: 40px;
    }
    @media (max-width: 768px) {
      font-size: 35px;
      margin-left: 0;
      margin-right: auto;
      max-width: 421px;
    }
    @media (max-width: 574px) {
      font-size: 30px;
      max-width: 100%;
      line-height: 40px;
      letter-spacing: normal;
      margin-left:0px;
    }
  }
  p {
    font-weight: normal;
    font-size: 18px;
    line-height: 2.11;
    letter-spacing: -0.3px;
    color: var(--textColor);
    margin-bottom: 0;
    max-width: 515px;
    opacity: 0.8;
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
  .ButtonWrap {
    display: flex;
    margin-top: 35px;
    align-items: center;
    @media (max-width: 1600px) {
      margin-top: 20px;
    }
    @media (max-width: 768px) {
      justify-content: left;
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
      color: var(--textColor);
      line-height: 1;
      margin-bottom: 0;
      margin-left: 10px;
      @media (max-width: 1600px) {
        font-size: 14px;
      }
      @media (max-width: 768px) {
        margin-left: 0px;
      }
      @media (max-width: 575px) {
        margin-left: 0;
        margin-top: 10px;
      }
    }
    .navbar_button_two span {
      letter-spacing:0.10em;
      @media (max-width: 768px) {
        margin-left:10px;
      }
    }
    .navbar_button_two span:hover {
      border-bottom:2px solid var(--textColor);
      transition: all 0.3s ease;
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
    margin-left:10px;
    color: var(--whiteColor);
    padding: 21px 29px;
    background-color: var(--buttonbgColor);
    border:1px solid var(--buttonbgColor);
    transition: all 500ms ease;
    &:hover {
      background-color: var(--buttonOverColor);
      border:1px solid var(--buttonOverColor);
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
  }

  .Button:hover {
    background-color: var(--buttonOverColor); // #063565;
  }
  .bannerImage {
    // position: absolute;
    // top: 10px;
    // right: -10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
    // background: url("/assets/images/registrationbackground1.svg") no-repeat;
    background-size:cover;
    background-position: top left;
    border-bottom-right-radius: 20px;
    img {
      margin-left:-2em;
      width:100%;
      height: auto;
      filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.3));
    }
    @media (max-width: 1600px) {
      top: 0px;
      
    }
    @media (max-width: 1300px) {
      top: 0px;
      max-width: 100%;
      justify-content:center;
      
    }
    @media (max-width: 1024px) {
      top: 0;
      max-width: 85%;
      
    }
    @media (max-width: 768px) {
      display:none;
      max-width: 100%;
      position: relative;
      top: auto;
      right: auto;
      margin-top: 40px;
    }
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
