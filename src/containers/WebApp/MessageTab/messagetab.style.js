import styled, { css } from "styled-components";

export const ChatLayout = styled.div`
  display: flex;
  height: 100vh; // Full viewport height
  background-color: #f0f0f0;
`;

export const ContactList = styled.div`
  width: 300px; // Adjust width as needed
  overflow-y: auto; // Scrollable if the list is long
  background-color: #333;
  color: white;
  padding: 20px;
`;

export const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // This will spread out the items
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#555" : "transparent")};
  &:hover {
    background-color: #555;
  }

  .section-image {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-right: 10px;
  }

  .contact-content {
    flex: 1; // Takes up the remaining space
    display: flex;
    align-items: center;
  }
`;

export const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto; // Add scrolling for overflow

  .message {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 10px;
    word-break: break-word; // Break long words

    &.sender {
      align-self: flex-end;
      background-color: #e0f7fa;
    }

    &.receiver {
      align-self: flex-start;
      background-color: #fae3d9;
    }
  }
`;

export const ChatMessage = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: ${({ type }) =>
    type === "user" ? "flex-end" : "flex-start"};
`;

export const MessageContent = styled.div`
  padding: 10px 15px;
  background-color: ${({ type }) => (type === "user" ? "#dbf5b4" : "#efefef")};
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: #333;
  flex-grow: 1;
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin: 10px;
  border: 1px solid #36454f;
  border-radius: 20px;
`;

export const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px;
`;

export const IconsContainer = styled.div``;

export const SendButton = styled.button`
  color: #36454f;
  border: none;
  // Additional styles for send button
`;

export const AttachmentIcon = styled.div`
  cursor: pointer;
  margin-right: 10px;
  color: #36454f;
  border: none;
  // Additional styling for attachment icon
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;

  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%; /* Makes the image round */
    overflow: hidden; /* Handles overflow */
    display: flex; /* Ensures flex alignment */
    align-items: center; /* Vertical alignment */
    justify-content: center; /* Horizontal alignment */
    margin-right: 10px;
  }

  .username {
    font-size: 20px;
    font-weight: bold;
    display: flex; /* Ensures flex alignment */
    align-items: center; /* Aligns text with the image */
  }
`;
