import { createGlobalStyle } from 'styled-components';

const ResetCSS = createGlobalStyle`
  ::selection {
    background: #333333;
    color: #ffffff;
  }

  html {
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *:focus {
    outline: none;
  }

  html,
  html a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  dl,
  th,
  dt,
  input,
  textarea,
  span,
  div {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  .reuseModalHolder {
    padding: 0 !important;
    &.demo_switcher_modal {
      border: 0 !important;
      background-color: rgba(16, 30, 77, 0.9) !important;
      .innerRndComponent {
        border-radius: 8px !important;
      }
    }
  }

  button.modalCloseBtn {
    position: fixed !important;
    z-index: 999991 !important;
    background-color: transparent !important;
    top: 10px !important;
    right: 10px !important;
    min-width: 34px !important;
    min-height: 34px !important;
    padding: 0 !important;
    span.btn-icon {
      font-size: 22px !important;
      transform: rotate(45deg) !important;
    }

    &.alt {
      border-radius: 50% !important;
      z-index: 999999 !important;
      padding: 0 !important;
      transition: all 0.3s ease !important;
      top: 25px !important;
      right: 30px !important;
      min-width: 40px !important;
      min-height: 40px !important;

      span.btn-icon {
        font-size: 20px !important;
      }

      &:hover {
        opacity: 0.88 !important;
      }
    }
  }

  .nextui-modal-close-icon {
    border-radius: 50% !important;
    z-index: 999999 !important;
    padding: 0px !important;
    transition: all 0.3s ease 0s !important;
    top: 25px !important;
    right: 30px !important;
    min-width: 40px !important;
    min-height: 40px !important;
    color: rgb(255, 255, 255) !important;
    background-color: rgb(16, 172, 132) !important;
    box-shadow: rgba(16, 172, 132, 0.5) 0px 8px 38px !important;

    svg {
      margin: auto;
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

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  // .message-Button {
  //   display: inline-flex;
  //   justify-content: center;
  //   align-items: center;
  //   border-radius: 30px;
  //   font-weight: bold;
  //   font-size: 16px;
  //   text-align: center;
  //   line-height: 1;
  //   color: var(--whiteColor);
  //   padding: 21px 29px;
  //   background-color: var(--buttonbgColor);
  //   border:1px solid var(--buttonbgColor);
  //   transition: all 500ms ease;
  //   &:hover {
  //     background-color: var(--buttonOverColor);
  //     border:1px solid var(--buttonOverColor);
  //     color: var(--textColor);
  //     i {
  //       transform: translateX(2px);
  //     }
  //   }
  //   i {
  //     margin-left: 10px;
  //     position: relative;
  //     top: 1px;
  //     transition: transform .4s ease;
  //   }
  //   @media (max-width: 1600px) {
  //     font-size: 14px;
  //     padding: 16px 23px;
  //   }
  //   @media (max-width: 575px) {
  //     width: auto;
  //   }
  // }
`;
export default ResetCSS;
