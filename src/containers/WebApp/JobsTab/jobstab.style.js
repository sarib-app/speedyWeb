import themeGet from "@styled-system/theme-get";
import styled from "styled-components";

const AccentColor = "#f9ab55";
const LightGrey = "#f5f5f5";

export const BannerArea = styled.section`
  padding-top: 0em;
  padding-bottom: 3em;
  position: relative;
  display: flex;
  gap: 20px;
  // background-color: #f9ab55;
  // background-color: var(--panelbgColor);
  border-radius: 10px;
  @media (max-width: 1600px) {
    padding-top: 0em;
    padding-bottom: 0em;
  }
  @media (max-width: 1024px) {
    padding-top: 0em;
    padding-bottom: 0em;
    background-position: center center;
  }
  @media (min-width: 768px) {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom left;
  }
  @media (max-width: 767px) {
    padding-top: 0px;
    padding-bottom: 0em;
    background: linear-gradient(
      131.39deg,
      ${themeGet("colors.gradientSecondary")} -9.09%,
      ${themeGet("colors.gradientPrimary")} 129.67%
    );
  }
  @media (max-width: 568px) {
    flex-flow: column;
    gap: 5px;
  }
  .jobs-side-container {
    background-color: var(--panelbgColor);
    border-radius: 10px;
    padding: 35px 0px;
    width: 20%;
    min-width: 223px;
    // padding-left:15px;
    // padding-right:15xpx;
    @media (max-width: 568px) {
      width: 100%;
      padding: 15px 0px;
    }
  }
  .jobs-container {
    border-radius: 10px;
    padding: 10px;
    margin-left: 0px;
    max-width: 885px;
    width: 100vw;
    height: 100vh;
    max-height: 350px;
    overflow-y: auto;
    @media (min-width: 1700px) {
      max-width: 1015px;
    }
    @media (max-width: 1200px) {
      max-width: 744px;
    }
    @media (max-width: 1024px) {
      width: calc(100vw - 30px) !important;
    }
    @media (max-width: 568px) {
      width: calc(100vw - 30px) !important;
      padding: 5px 0px;
    }
  }

  .job-container {
    display: flex;
    position: relative;
    z-index: 10;
    width: 1300px;
    padding: 2em 20px;
    height: 100vh;
    max-height: 320px;
    overflow-y: auto;
    border-radius: 15px;
    background-color: var(--whiteColor);
    filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
    @media (max-width: 1024px) {
      width: 95%;
      margin-left: 20px;
      margin-right: 10px;
    }
    @media (max-width: 767px) {
      width: 90%;
      margin-left: 20px;
      margin-right: 10px;
    }
  }
  .jobs-list {
    width: 225px;
    padding: 20px 10px;
    @media (max-width: 1200px) {
    }
  }
  .job-item {
    // width: 100%;
    height: 40px;
    padding: 7px 10px;
    @media (max-width: 1024px) {
      height: 60px;
    }
    &:nth-child(odd) {
      background-color: var(--whiteColor);
      color: var(--textColor);
    }
    &:nth-child(even) {
      background-color: ${LightGrey};
      color: var(--whiteColor);
    }
    &:hover {
      background-color: ${AccentColor};
      color: var(--textColor);
    }

    &:last-child {
      border-bottom: none;
    }
    .formIconStyle {
      width: 15px;
      margin-top: 4px;
    }
  }
  .accept-job-btn,
  .chat-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--whiteColor);
    max-width: 155px;
    width: 100%;
    height: 50px;
    border-radius: 30px;
    background-color: var(--buttonbgColor);
    border: 1px solid var(--buttonbgColor);
    transition: all 500ms ease;
    &:hover {
      background-color: var(--buttonOverColor);
      border: 1px solid var(--buttonOverColor);
      color: var(--textColor);
      i {
        transform: translateX(2px);
      }
    }
  }
`;

export const StyledRow = styled.div`
  width: 100%;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
  .row-header {
    display: flex;
    background-color: unset;
    color: var(--whiteColor);
    transition: all 0.3s ease-in-out;
    justify-content: flex-start;
    font-size: 1.1em;
  }
  .category-name {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .count-style {
    padding: 0px 7px;
    background-color: #f9ab55;
    border-radius: 5px;
    filter: drop-shadow(2px 3px 3px black);
  }
  .row-header:hover,
  .active {
    background-color: var(--buttonOverColor);
    color: var(--whiteColor);
    .count-style {
      background-color: var(--panelbgColor);
    }
  }

  .title-text {
    font-weight: bold;
    color: var(--whiteColor);
    flex-grow: 1;
  }

  .CollapsibleRowIcon {
    margin-left: 10px;
    color: #333;
    width: 20px;
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
    justify-content: flex-start;
    gap: 10px;
  }
`;

const StyledCollapsibleRow = styled.div`
  width: 100%;
  cursor: pointer;
  // border-bottom: 0.5px solid;
  border-radius: 3px;
  &:nth-child(odd) {
    background-color: var(--whiteColor);
    color: var(--textColor);
  }
  &:nth-child(even) {
    background-color: #e6f0ff;
    color: var(--textColor);
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &:hover {
    background-color: ${AccentColor};
    color: var(--textColor);
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: unset !important;
    border: unset;
    color: var(--whiteColor);
  }
  .category-content {
    font-weight: 400;
    font-size: 1em;
    color: inherit;
  }
  .row-header:hover,
  .active {
    background-color: var(--buttonOverColor);
  }

  .title-text {
    font-weight: bold;
    color: #333;
    flex-grow: 1;
  }
  .date-time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #333;
    margin-left: auto;
    margin-right: 10px;
  }
  .CollapsibleRowIcon {
    margin-left: 10px;
    color: #333;
    width: 20px;
  }

  .row-details {
    padding: 20px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .detail-row {
    display: flex;
    align-items: center;
  }

  .detail-row-container {
    display: flex;
    gap: 20px;
  }

  .full-width {
    width: 100%;
  }

  .half-width {
    width: 50%;
  }

  .detail-label {
    font-weight: bold;
    margin-right: 10px;
    flex-shrink: 0;
    width: 150px;
    display: flex;
    align-items: center;
  }

  .detail-icon {
    margin-right: 8px;
  }

  .detail-label-text {
    white-space: nowrap;
  }

  .detail-value {
    flex-grow: 1;
  }

  .thumbnail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    cursor: pointer;
  }

  action-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .accept-job-btn,
  .reject-job-btn,
  .profile-btn,
  .chat-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--whiteColor);
    max-width: 155px;
    width: 100%;
    height: 50px;
    border-radius: 30px;
    background-color: var(--buttonbgColor);
    border: 1px solid var(--buttonbgColor);
    transition: all 500ms ease;

    &:hover {
      background-color: var(--buttonOverColor);
      border: 1px solid var(--buttonOverColor);
      color: var(--textColor);
    }
  }
  .date {
    font-size: 1em;
    font-weight: bold;
  }

  .time {
    font-size: 0.8em;
  }
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    position: relative;
  }

  .modal-image,
  .modal-video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }
  .video-thumbnail {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .thumbnail-image {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  .video-thumbnail:hover .play-icon {
    opacity: 1;
  }
`;

export default StyledCollapsibleRow;
