import styled from 'styled-components';
const FeatureArea = styled.section`
  
  @media (max-width: 768px) {
    padding-top: 80px;
  }
  .container {
    max-width: 1000px;
  }
  .featurePost {
    display: flex;
    margin-top: 20px;
    @media (max-width: 768px) {
      margin-top: 80px;
    }
    > img {
      flex-shrink: 0;
      width: 70px;
      height: 70px;
    }
    .content {
      margin-left: 20px;
      h3 {
        margin: 0;
        font-weight: bold;
        font-size: 18px;
        line-height: 1.27;
        color: #084887;
        margin-bottom: 5px;
        @media (max-width: 425px) {
          font-size: 16px;
        }
      }
      p {
        font-weight: normal;
        font-size: 15px;
        margin-top: 0px;
        line-height: 1.87;
        color: #084887;
        margin: 0;
      }
      h4 {
        margin-bottom: 0px; /* Adjust this value to reduce the gap */
        color: #084887;    /* Setting the color to #084887 */
    }
    }
    &:hover {
      .feature-icon {
        animation: var(--shakeAnim);
      }
    }
  }
  .feature-icon {
    width: var(--width);
    flex: 0 0 var(--width)
  }
  .featureContainer {
    flex-flow:row;
    @media (max-width:767px){
      flex-flow:column;
      row-gap: 50px;
    }
  }
  .blockTitle {
    text-align: center;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
    margin-top: 60px;
    @media (max-width: 1600px) {
      margin-bottom: 40px;
    }
    h2 {
      font-weight: bold;
      font-size: 36px;
      line-height: 1.31;
      letter-spacing: -0.5px;
      color: #084887; // Changes color
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); // Adds a subtle shadow
      
      margin: 0;
      margin-bottom: 5px;
      @media (max-width: 1600px) {
        font-size: 30px;
        line-height: 1.3;
        max-width: 468px;
        margin-left: auto;
        margin-right: auto;
      }
      @media (max-width: 768px) {
        font-size: 28px;
      }
      @media (max-width: 375px) {
        font-size: 22px;
      }
    }
    p {
      margin: 0;
      font-weight: normal;
      font-size: 18px;
      line-height: 2;
      color: #084887;
      @media (max-width: 768px) {
        font-size: 15px;
      }
    }
  }
  .postWrap {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
  .post {padding-bottom: 365px;
  padding-top: 50px;
  @media (max-width: 1600px) {
    padding-top: 60px;
  }
  @media (max-width: 768px) {
    padding-bottom: 275px;
  }
  @media (max-width: 375px) {
    padding-top: 40px;
    padding-bottom: 255px;
  }
  .blockTitle {
    text-align: center;
    max-width: 577px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    @media (max-width: 1600px) {
      margin-bottom: 40px;
    }
    h2 {
      font-weight: bold;
      font-size: 36px;
      line-height: 1.31;
      letter-spacing: -0.5px;
      color: #084887;
      margin: 0;
      margin-bottom: 10px;
      @media (max-width: 1600px) {
        font-size: 30px;
        line-height: 1.3;
        max-width: 468px;
        margin-left: auto;
        margin-right: auto;
      }
      @media (max-width: 768px) {
        font-size: 28px;
      }
      @media (max-width: 375px) {
        font-size: 22px;
      }
    }
    p {
      margin: 0;
      font-weight: normal;
      font-size: 16px;
      line-height: 2;
      color: #084887;
      @media (max-width: 768px) {
        font-size: 15px;
      }
    }
  }
  .postWrap {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
  .post {
    flex: 0 0 20%;
    text-align: center;
    @media (max-width: 768px) {
      flex: 0 0 28%;
      margin-bottom: 50px;
    }
    @media (max-width: 425px) {
      flex: 1 1 50%;
    }
    img {
      margin-left: auto;
      margin-right: auto;
    }
    h3 {
      font-weight: 500;
      font-size: 17px;
      line-height: 1;
      text-align: center;
      color: #084887;
      margin: 0;
      margin-top: 5px;
      @media (max-width: 1600px) {
        font-size: 16px;
      }
    }
    cursor: pointer;
    &:hover {
      .feature-image-box-inner {
        transform: translateY(-5px);
        &:before {
          opacity: 1;
          transform: translateY(5px);
        }
      }
    }
  }
`;
export default FeatureArea;

export const Row = styled.div`
overflow: visible;
display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  margin-left: -44px;
  margin-right: -44px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: start;
  @media (max-width: 1199px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media (max-width: 768px) {
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 30px;
    padding-right: 30px;
  }
  @media (max-width: 480px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const Col = styled.div`
display: flex;
    flex-direction: column; // Stack children vertically
    justify-content: space-between;  
  padding-left: 44px;
  padding-right: 44px;
  flex: 1 0 48%;
  padding-left: 44px;
  padding-right: 44px;
  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (max-width: 575px) {
    flex: 0 0 100%;
  }
`;

