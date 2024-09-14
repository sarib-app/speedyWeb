import styled from "styled-components";
import themeGet from "@styled-system/theme-get";
const PrimaryColor = "#084887";
const AccentColor = "#f9ab55";
const LightGrey = "#f5f5f5";
const DarkGrey = "#2c3e50";
const LighterGrey = "#bdc3c7";
const White = "#ffffff";

export const Section = styled.section`
  background: #f9ab55;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 0px;
  @media (max-width: 568px) {
    padding: 20px 10px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
export const EditButton = styled.button`
  // position: absolute;
  // top: 0;
  // right: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none; // Hide the default input
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;

export const InitialsAvatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 32px;
  font-family: Arial, sans-serif;
`;
export const FormField = styled.div`
  margin-bottom: 15px;
`;

export const Button = styled.button`
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

export const Message = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  &.success {
    color: green;
    background-color: #e7f6e7;
  }
  &.error {
    color: red;
    background-color: #f6e7e7;
  }
`;
