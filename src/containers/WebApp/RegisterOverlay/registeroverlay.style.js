import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Explicitly set to full viewport width */
  height: 100vh; /* Explicitly set to full viewport height */
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center; /* This will center the ModalContent vertically */
  z-index: 1050;
  opacity: ${(props) => (props.show ? "1" : "1")};
  visibility: ${(props) => (props.show ? "visible" : "visible")};
  transition: translateY 0.5s ease-in-out;
  transform: translateY(${(props) => (props.show ? "0px":"-1000px" )});
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  width: 80%; /* Adjust width as needed */
  max-width: 900px; /* Maximum width */
  border-radius: 8px;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: to add some depth */
  overflow-y: auto; /* Allows scrolling if content is larger than the screen */
  text-align: center;
  /* Optional: if you want to ensure that the modal is always smaller than the screen */
  max-height: 80vh;
  margin: auto; /* This can help with centering in some cases /
  display: flex; / Using flex within the modal content for internal alignment /
  flex-direction: column; / Stack children vertically /
  justify-content: center; / Center children vertically /
  align-items: center; / Center children horizontally */
  @media (max-width:767px){
    width:100%;
    margin-left: 20px;
    margin-right: 20px;
    padding: 0px;
  }

  h2 {
    font-weight: 500;
    font-size: 50px;
    line-height: 1.21;
    letter-spacing: -2px;
    color: var(--titleColor);
    margin-bottom: 20px;
    text-align: center;
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
    line-height: 1;
    letter-spacing: -0.3px;
    color: var(--textColor);
    margin-bottom: 1em !important;
    // max-width: 515px;
    opacity: 0.8;
    @media (max-width: 1600px) {
      font-size: 20px;
      // max-width: 466px;
    }
    @media (max-width: 1024px) {
      // max-width: 400px;
    }
    @media (max-width: 768px) {
      // max-width: 440px;
      margin-left: auto;
      text-align: center;
      margin-right: auto;
    }
  }
  .formIconStyle {
    color: var(--iconColor);
    height:180px;
    width:180px; 
    margin-top: 0px;
  }
`;

const ModalOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width:767px){
    display:flex;
    flex-flow:column-reverse;
  }

  .option {
    padding: 5em 20px;
    border: 2px solid #dee2e6; /* Slightly thicker and lighter border for subtlety */
    border-radius: 8px; /* Rounded corners for a modern look */
    cursor: pointer;
    transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff; /* Ensure background is white for contrast */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */

    @media (max-width:1400px){
      padding: 3em 20px;
    }

    &:hover {
      background-color: #f8f8f8; /* Lighter background on hover */
      border-color: #adb5bd; /* Darker border on hover for contrast */
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover for a "lifting" effect */
    }

    p {
      font-size: 1.5em;
      color: var(-textColor);
      line-height:1.4;
    }

    .socialLink {
      margin-top: 10px;
      transition: all 0.3s ease-in-out;
      &:hover {
        transform:scale(1.2);
      }
    }
  }
`;

export { ModalBackdrop, ModalContent, ModalOptions };
