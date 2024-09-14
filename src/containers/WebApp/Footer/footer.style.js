import themeGet from '@styled-system/theme-get';
import styled from 'styled-components';

const FooterArea = styled.footer`
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid #dfe4ed;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
    @media (max-width: 1600px) {
      padding-bottom: 10px;
    }
    @media (max-width: 991px) {
      flex-direction: column;
    }
    @media (max-width: 767px) {
      flex-direction: row;
    }
  }
  .logoBox {
    display: flex;
    align-items: center;
    @media (max-width: 425px) {
      flex-wrap: wrap;
      justify-content: center;
    }
    .logo {
      @media (max-width: 425px) {
        flex: 0 0 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
      }
    }
    p {
      margin: 0;
      color: #084887;
      margin-left: 0px;
      margin-right: 5px;
      @media (max-width: 1600px) {
        font-size: 15px;
      }
    }
  }
  .footerLink {
    line-height: 1;
    color: ${themeGet('colors.primary')};
    font-size: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid currentColor;
  }
  .menu {
    display: flex;
    align-items: center;
    @media (max-width: 991px) {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    @media (max-width: 767px) {
      flex-direction: column;
      align-items:flex-start;
    }
    a {
      font-size: 15px;
      line-height: 1.4;
      color: var(--footerLinkColor);
      transition: all 500ms ease;
      &:hover {
        // font-weight:600;
        border-bottom: 1px solid var(--footerLinkColor);
        transition: all 0.5s ease-in-out;
      }
      + a {
        margin-left: 35px;
        @media (max-width: 767px) {
          margin-left: 0px;
        }
        
      }
    }
  }
  .socialContainer {
    display:flex;
    width:35%;
    column-gap:10%;
    justify-content:center;
    @media (max-width: 767px) {
      flex-flow:column;
      row-gap:15px;
      width:50%;
    }
  }
  .social {
    display: flex;
    align-items: center;
    span {
      color: #084887;
      line-height: 1;
      margin-bottom: 0;
      font-size: 15px;
      display: block;
    }
    a {
      margin-left: 15px;
      transition: opacity 0.4s ease;
      &:hover {
        opacity: .8;
      }
    }
  }
`;
export default FooterArea;
