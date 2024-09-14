import styled from "styled-components";

export const ChatLayout = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  background-color: #f0f0f0;
  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

export const ContactList = styled.div`
  width: 25%;
  min-width: 250px;
  overflow-y: auto;
  border-radius: 10px;
  background-color: #333;
  color: white;
  padding: 20px;
  @media (max-width: 568px) {
    width: 100%;
  }
`;

export const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    flex: 1;
    display: flex;
    align-items: center;
  }
`;

export const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: hidden; // Hide overflow to manage scroll within chat-messages
  position: relative;

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 160px);
  }

  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    word-break: break-word;
    max-width: 70%;
    position: relative;
    &.sender {
      align-self: flex-end;
      background-color: #084887;
      color: white;
      border-top-right-radius: 0;
    }
    &.receiver {
      align-self: flex-start;
      background-color: #f9ab55;
      color: white;
      border-top-left-radius: 0;
    }
    .message-time {
      font-size: 12px;
      align-self: flex-end;
      margin-top: 5px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

export const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: 10px;
  border-top: 1px solid #ddd;
  width: 100%;
`;

export const SendButton = styled.button`
  color: #36454f;
  border: none;
  background: transparent;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const AttachmentIcon = styled.div`
  cursor: pointer;
  margin-right: 10px;
  color: #36454f;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0f0ff;
  &:hover {
    background-color: #d0e0ff;
  }
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
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .username {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
`;
