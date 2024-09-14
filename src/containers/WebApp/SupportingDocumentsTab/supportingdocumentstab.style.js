import styled from "styled-components";


export const BannerArea = styled.section`
.supporting-container {
  // display: flex;
  position: relative;
  z-index: 10;
  width: 1300px;
  padding: 2em 20px 0em 20px;
  // border-radius: 20px;
  background-color: var(--whiteColor);
  // filter: drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2));
  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0px;
    margin-right: 10px;
  }
  @media (max-width: 767px) {
    width: 90%;
    margin-left: 20px;
    margin-right: 10px;
  }
  @media (max-width: 568px) {
    margin-left: 10px;
    margin-right: 0px;
    padding:10px 0px 0px;
    width: calc( 100vw - 40px );
  }
}
`;

const StyledCollapsibleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  @media (max-width: 568px){
    padding: 20px 0px;
    padding-bottom: 0px;
  }

  .form-section,
  .upload-section {
    flex: 1;
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: var(--textColor);
    font-weight:600;
  }
  .iconStyle {
    width: 30px;
    font-size:24px;
    margin-right:0px;
  }

  input,
  select,
  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .input {
    margin-bottom: 15px; /* Adjust this value to what suits you best */
    width:100%;
    @media (max-width:768px) {
      width:100%;
    }
  }
  .input-file {
    background-color: #f7f7f7;
    cursor: pointer;
    text-align: center;
  }

  .file-display {
    margin-bottom: 16px;
  }

  .file-display p {
    background-color: #e9e9e9;
    padding: 8px;
    border-radius: 4px;
  }

  .ButtonWrap {
    text-align: right;
  }

  // .Button {
  //   padding: 10px 20px;
  //   background-color: #0062cc;
  //   color: #fff;
  //   border: none;
  //   border-radius: 4px;
  //   cursor: pointer;
  //   transition: background-color 0.3s ease;

  //   &:hover {
  //     background-color: #004daa;
  //     color: #fff;
  //   }
  // }

  .success-message {
    color: #28a745;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .errorColor {
    color: #ff0000;
  }
`;

export default StyledCollapsibleRow;
